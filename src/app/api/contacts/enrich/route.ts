import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

const DEEPSEEK_API = "https://api.deepseek.com/chat/completions";

export type EnrichResult = {
  email: string | null;
  phone: string | null;
  website: string | null;
  facebook: string | null;
  contactName: string | null;
  confidence: "high" | "medium" | "low";
  source: string;
};

// ─── DuckDuckGo search ────────────────────────────────────────────────────────

async function searchDuckDuckGo(query: string): Promise<{ url: string; title: string; snippet: string }[]> {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return [];

  const html = await res.text();
  const $ = cheerio.load(html);
  const results: { url: string; title: string; snippet: string }[] = [];

  $(".result").each((_, el) => {
    const titleEl = $(el).find(".result__a");
    const title = titleEl.text().trim();
    const snippet = $(el).find(".result__snippet").text().trim();
    const href = titleEl.attr("href") ?? "";
    const match = href.match(/uddg=([^&]+)/);
    if (!match) return;
    try {
      const decoded = decodeURIComponent(match[1]);
      if (decoded.startsWith("http") && !decoded.includes("duckduckgo.com")) {
        results.push({ url: decoded, title, snippet });
      }
    } catch { /* ignore */ }
  });

  return results.slice(0, 5);
}

// ─── Page fetch ───────────────────────────────────────────────────────────────

async function fetchPageText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const $ = cheerio.load(html);
    $("script, style, noscript, nav, header, footer").remove();
    return $("body").text().replace(/\s+/g, " ").trim().slice(0, 3000);
  } catch {
    return "";
  }
}

// ─── DeepSeek extraction ──────────────────────────────────────────────────────

async function askDeepSeek(companyName: string, context: string, sourceUrl: string): Promise<EnrichResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-your")) {
    throw new Error("DEEPSEEK_API_KEY ยังไม่ได้ตั้งค่า");
  }

  const prompt = `คุณเป็นผู้ช่วย extract ข้อมูลติดต่อของบริษัท

ชื่อบริษัทที่ต้องการหา: "${companyName}"

ข้อความจากผลการค้นหาและเว็บไซต์:
---
${context}
---

ให้ดึงข้อมูลติดต่อออกมา ตอบเป็น JSON เท่านั้น ไม่ต้องมีคำอธิบาย:
{
  "email": "อีเมลติดต่อหลัก หรือ null ถ้าไม่พบ",
  "phone": "เบอร์โทรศัพท์ หรือ null ถ้าไม่พบ",
  "website": "URL เว็บไซต์หลัก หรือ null ถ้าไม่พบ",
  "facebook": "Facebook URL หรือ null ถ้าไม่พบ",
  "contactName": "ชื่อผู้ติดต่อ หรือ null ถ้าไม่พบ",
  "confidence": "high ถ้ามั่นใจ, medium ถ้าพอใช้ได้, low ถ้าไม่แน่ใจ"
}`;

  const res = await fetch(DEEPSEEK_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 300,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error: ${res.status} — ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("DeepSeek ตอบกลับในรูปแบบที่ไม่ถูกต้อง");

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    email:       parsed.email       ?? null,
    phone:       parsed.phone       ?? null,
    website:     parsed.website     ?? null,
    facebook:    parsed.facebook    ?? null,
    contactName: parsed.contactName ?? null,
    confidence:  parsed.confidence  ?? "low",
    source: sourceUrl,
  };
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { companyName } = await req.json() as { companyName: string };
    if (!companyName?.trim()) {
      return NextResponse.json({ error: "companyName required" }, { status: 400 });
    }

    const name = companyName.trim();

    // 1. DuckDuckGo search
    const queries = [
      `"${name}" อีเมล ติดต่อ`,
      `"${name}" email contact`,
      `${name} ติดต่อ`,
    ];

    let results: { url: string; title: string; snippet: string }[] = [];
    for (const q of queries) {
      results = await searchDuckDuckGo(q);
      if (results.length > 0) break;
    }

    if (results.length === 0) {
      return NextResponse.json({ error: "DuckDuckGo ไม่พบข้อมูลของบริษัทนี้", result: null });
    }

    // 2. Build context: snippets + page content
    const snippetContext = results
      .map((r) => `[${r.title}]\n${r.snippet}`)
      .join("\n\n");

    const pages = await Promise.all(
      results.slice(0, 3).map(async (r) => ({ url: r.url, text: await fetchPageText(r.url) }))
    );

    const pageContext = pages
      .filter((p) => p.text.length > 100)
      .map((p) => p.text)
      .join("\n\n");

    const combinedContext = `=== ผลการค้นหา ===\n${snippetContext}\n\n=== เนื้อหาเว็บไซต์ ===\n${pageContext}`
      .slice(0, 5000);

    const bestPage = pages.find((p) => p.text.length > 200) ?? { url: results[0].url };

    // 3. DeepSeek extracts contact info
    const result = await askDeepSeek(name, combinedContext, bestPage.url);

    return NextResponse.json({ result, urls: results.map((r) => r.url) });
  } catch (err) {
    console.error("[enrich POST]", err);
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Enrich ล้มเหลว",
      result: null,
    }, { status: 500 });
  }
}
