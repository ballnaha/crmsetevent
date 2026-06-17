import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { upsertEventsWithMysql, type DbEventWithVenue } from "@/lib/mysqlEvents";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "src/generated/scraped_events.json");

type OrganizerContact = {
  organizerName?: string | null;
  organizerContactName?: string | null;
  organizerPhone?: string | null;
  organizerEmail?: string | null;
  organizerWebsite?: string | null;
};

type ScrapedEvent = {
  title: string;
  source: "BITEC" | "IMPACT";
  startsAt: string;
  endsAt: string | null;
  category: string;
  hall: string;
  venueSlug: "bitec" | "impact";
  sourceUrl: string;
  imageUrl?: string | null;
} & OrganizerContact;

// Static fallback seed data in case external servers are down or offline
const fallbackEventsList: ScrapedEvent[] = [
  {
    title: "Manufacturing Expo 2026",
    source: "BITEC",
    startsAt: "2026-06-17T00:00:00.000Z",
    endsAt: "2026-06-20T00:00:00.000Z",
    category: "Industrial / Manufacturing",
    hall: "Halls 98-104",
    venueSlug: "bitec",
    sourceUrl: "https://www.bitec.co.th/event/manufacturing-expo-2026",
  },
  {
    title: "Thailand Wellness & Healthcare Expo 2026",
    source: "BITEC",
    startsAt: "2026-06-25T00:00:00.000Z",
    endsAt: "2026-06-27T00:00:00.000Z",
    category: "Healthcare",
    hall: "Hall 99",
    venueSlug: "bitec",
    sourceUrl: "https://www.bitec.co.th/event/thailand-wellness-healthcare-expo-2026",
  },
  {
    title: "ProPak Asia 2026",
    source: "IMPACT",
    startsAt: "2026-06-10T00:00:00.000Z",
    endsAt: "2026-06-13T00:00:00.000Z",
    category: "Trade Exhibition",
    hall: "IMPACT Challenger 1-3",
    venueSlug: "impact",
    sourceUrl: "https://www.impact.co.th/en/visitors/event-calendar/exhibition-trade/propak-asia-2026",
  },
  {
    title: "Franchise Expo Thailand by Smart SME",
    source: "IMPACT",
    startsAt: "2026-08-06T00:00:00.000Z",
    endsAt: "2026-08-09T00:00:00.000Z",
    category: "Franchise / SME",
    hall: "Exhibition Hall 7-8",
    venueSlug: "impact",
    sourceUrl: "https://www.impact.co.th/en/visitors/event-calendar",
  },
  {
    title: "FAST Auto Show Thailand 2026",
    source: "IMPACT",
    startsAt: "2026-07-01T00:00:00.000Z",
    endsAt: "2026-07-05T00:00:00.000Z",
    category: "Automotive Exhibition",
    hall: "Exhibition Hall 5-6",
    venueSlug: "impact",
    sourceUrl: "https://www.impact.co.th/en/visitors/event-calendar",
  },
  {
    title: "COMMART ULTRAFORCE 2026",
    source: "BITEC",
    startsAt: "2026-07-02T00:00:00.000Z",
    endsAt: "2026-07-05T00:00:00.000Z",
    category: "Electronics / IT",
    hall: "Halls 98-99",
    venueSlug: "bitec",
    sourceUrl: "https://www.bitec.co.th/visitor/coming-events",
  },
];

// Helper to parse dates from scraped text format
function parseDateRange(dateStr: string): { startsAt: Date; endsAt: Date | null } {
  const cleaned = dateStr.replace(/\s+/g, " ").trim();
  const parts = cleaned.split(/\s*(?:-|\u2013|\u2014|~)\s*/);
  
  let startsAt = new Date();
  let endsAt: Date | null = null;
  
  if (parts.length === 1) {
    const d = new Date(parts[0]);
    if (!isNaN(d.getTime())) {
      startsAt = d;
    }
  } else if (parts.length === 2) {
    const p2 = parts[1];
    const p2Parts = p2.split(" ");
    const year = p2Parts[p2Parts.length - 1];
    const month = p2Parts[p2Parts.length - 2];
    
    const p1 = parts[0];
    const p1Parts = p1.split(" ");
    
    let startDay = p1Parts[0];
    let startMonth = p1Parts[1] || month;
    let startYear = year;
    
    let endDay = p2Parts[0];
    let endMonth = month;
    let endYear = year;
    
    const dStart = new Date(`${startDay} ${startMonth} ${startYear}`);
    const dEnd = new Date(`${endDay} ${endMonth} ${endYear}`);
    
    if (!isNaN(dStart.getTime())) startsAt = dStart;
    if (!isNaN(dEnd.getTime())) endsAt = dEnd;
  }
  return { startsAt, endsAt };
}

function cleanContactValue(value: string | null | undefined) {
  if (!value) return null;
  const cleaned = value
    .replace(/\s+/g, " ")
    .replace(/^[\s:.-]+|[\s:.-]+$/g, "")
    .trim();

  if (/^(event|contact|organizer|organiser|us|back)$/i.test(cleaned)) {
    return null;
  }

  return cleaned.length > 0 ? cleaned.slice(0, 191) : null;
}

function isLikelyNavigationValue(value: string | null) {
  if (!value) return false;
  return /Upcoming Events|Getting Here|Visitors|Exhibitors|Organisers Toolkit|Subscribe array|Venue Spaces|News & Activities|Contact Us|Privacy Policy|Corporate Reward|Gallery Corporate Identity|Function Rooms Services|Leisure & Entertainment/i.test(value);
}

function isLikelyPhoneValue(value: string | null) {
  if (!value) return false;
  return /^[+()\d\s.-]{7,}$/.test(value);
}

function cleanEmailValue(value: string | null | undefined) {
  const cleaned = cleanContactValue(value?.replace(/(Line|Website|Facebook|FB|Tweet|Save).*$/i, ""));
  return cleaned && /@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(cleaned) ? cleaned : null;
}

function cleanWebsiteValue(value: string | null | undefined) {
  const cleaned = cleanContactValue(value?.replace(/(\s+#.*|Line.*|Facebook.*|FB.*|Tweet.*|Save.*)$/i, ""));
  return cleaned && /^(https?:\/\/|www\.)/i.test(cleaned) ? cleaned : null;
}

function pickLabeledValue(text: string, label: string) {
  const nextLabels = [
    "Organizer",
    "Organiser",
    "Show Manager",
    "Contact Person",
    "Contact",
    "Mobile",
    "Phone",
    "Tel",
    "Telephone",
    "Fax",
    "Website",
    "Email",
    "Facebook",
    "LINE Official",
    "Line",
  ].filter((item) => item.toLowerCase() !== label.toLowerCase());
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const nextPattern = nextLabels.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const match = text.match(new RegExp(`${escapedLabel}\\.?\\s*:?\\s*(.*?)(?=${nextPattern}\\.?\\s*:?|$)`, "i"));

  const value = cleanContactValue(match?.[1]);
  return isLikelyNavigationValue(value) ? null : value;
}

function extractEventImage(html: string): string | null {
  const $ = cheerio.load(html);
  // IMPACT detail page: main event image has descriptive alt text and is in the content area
  let found: string | null = null;
  $("img").each((_, el) => {
    if (found) return;
    const src = $(el).attr("src") || "";
    const alt = $(el).attr("alt") || "";
    if (
      src &&
      alt.length > 10 &&
      !src.includes("/thumbs/") &&
      !src.includes("logo") &&
      !src.includes("icon") &&
      !src.includes("mod_languages") &&
      !src.includes("templates") &&
      (src.includes("/images/") || src.includes("/media/"))
    ) {
      found = src.startsWith("http") ? src : "https://www.impact.co.th" + src;
    }
  });
  return found;
}

function extractOrganizerContact(html: string): OrganizerContact & { imageUrl?: string | null } {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  const email = cleanEmailValue(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]);
  const emailIndex = email ? text.indexOf(email) : -1;
  const websiteLabelIndex = text.search(/Website\s*:/i);
  const blockAnchor = emailIndex >= 0 ? emailIndex : websiteLabelIndex;
  const contactText = blockAnchor >= 0
    ? text.slice(Math.max(0, blockAnchor - 360), Math.min(text.length, blockAnchor + 360))
    : text;
  const website = cleanWebsiteValue(
    pickLabeledValue(contactText, "Website") ||
    contactText.match(/https?:\/\/[^\s"'<>]+|www\.[^\s"'<>]+/i)?.[0],
  );
  const phone =
    cleanContactValue(pickLabeledValue(contactText, "Mobile")) ||
    cleanContactValue(pickLabeledValue(contactText, "Phone")) ||
    cleanContactValue(pickLabeledValue(contactText, "Tel")) ||
    cleanContactValue(contactText.match(/(?:Mobile|Phone|Tel|Telephone)\.?\s*:?\s*([+()\d][+()\d\s.-]{6,})/i)?.[1]);
  const validPhone = isLikelyPhoneValue(phone) ? phone : null;

  return {
    organizerName: pickLabeledValue(contactText, "Organizer") || pickLabeledValue(contactText, "Organiser"),
    organizerContactName: pickLabeledValue(contactText, "Contact Person") || pickLabeledValue(contactText, "Show Manager") || pickLabeledValue(contactText, "Contact"),
    organizerPhone: validPhone,
    organizerEmail: email,
    organizerWebsite: website,
    imageUrl: extractEventImage(html),
  };
}

async function fetchOrganizerContact(sourceUrl: string): Promise<OrganizerContact & { imageUrl?: string | null }> {
  try {
    const res = await fetch(sourceUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return {};
    return extractOrganizerContact(await res.text());
  } catch (error) {
    console.warn(`Contact scrape failed for ${sourceUrl}`, error);
    return {};
  }
}

async function enrichEventsWithOrganizerContacts<T extends { sourceUrl: string; imageUrl?: string | null }>(events: T[]) {
  const enriched: Array<T & OrganizerContact & { imageUrl?: string | null }> = [];
  const concurrency = 6;

  for (let index = 0; index < events.length; index += concurrency) {
    const batch = events.slice(index, index + concurrency);
    const batchResults = await Promise.all(
      batch.map(async (event) => {
        const detail = await fetchOrganizerContact(event.sourceUrl);
        return {
          ...event,
          ...detail,
          // Prefer full-size image from detail page; fall back to list-page thumbnail if detail has none
          imageUrl: detail.imageUrl ?? event.imageUrl ?? null,
        };
      }),
    );
    enriched.push(...batchResults);
  }

  return enriched;
}

function isEventInYear(event: { startsAt: string }, year: number) {
  return new Date(event.startsAt).getFullYear() === year;
}

function dedupeEvents<T extends { title: string; startsAt: string; venueSlug: string }>(events: T[]) {
  const seen = new Set<string>();
  return events.filter((event) => {
    const key = `${event.venueSlug}|${event.title.trim().toLowerCase()}|${new Date(event.startsAt).toISOString()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Scrape live data from IMPACT website for the whole selected year.
async function scrapeImpactLive(year: number): Promise<ScrapedEvent[]> {
  const list: ScrapedEvent[] = [];
  try {
    const periods: { month: number; year: number }[] = [];
    for (let m = 1; m <= 12; m++) {
      periods.push({ month: m, year });
    }
    
    console.log(`IMPACT scraper: Initiating parallel fetch for ${periods.length} months in ${year}...`);
    
    const scrapePromises = periods.map(async ({ month, year }) => {
      const monthList: ScrapedEvent[] = [];
      const impactUrl = `https://www.impact.co.th/en/visitors/event-calendar?category_id=0&location_id=0&filter_duration=custom_date:month_${month}_year_${year}&custom_sort=asc`;
      
      try {
        const res = await fetch(impactUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          signal: AbortSignal.timeout(15000), // 15 second timeout per month fetch
        });
        
        if (!res.ok) {
          console.warn(`IMPACT Month ${month}/${year} fetch returned status ${res.status}`);
          return [];
        }
        
        const html = await res.text();
        const $ = cheerio.load(html);
        
        $("a.eb-event-title").each((i, el) => {
          const title = $(el).text().trim();
          const href = $(el).attr("href") || "";
          const container = $(el).parent().parent();
          const dateText = container.find(".eb-event-date-time").text().replace(/calendar-alt/g, "").trim();
          const locText = container.find(".eb-event-location").text().replace(/map-marker-alt/g, "").trim();

          const { startsAt, endsAt } = parseDateRange(dateText);

          // List-page thumbnail — used as fallback when detail page has no image
          const rawThumb = container.find(".eb-event-thumb, .eb-event-thumb-container img").first().attr("src") || null;
          const thumbUrl = rawThumb ? (rawThumb.startsWith("http") ? rawThumb : "https://www.impact.co.th" + rawThumb) : null;

          monthList.push({
            title,
            source: "IMPACT",
            startsAt: startsAt.toISOString(),
            endsAt: endsAt ? endsAt.toISOString() : null,
            category: getCategoryFromTitle(title),
            hall: locText || "IMPACT Challenger",
            venueSlug: "impact",
            sourceUrl: "https://www.impact.co.th" + href,
            imageUrl: thumbUrl,
          });
        });
      } catch (err) {
        console.error(`Failed to scrape IMPACT month ${month}/${year}:`, err);
      }
      return monthList;
    });

    const results = await Promise.all(scrapePromises);
    for (const monthResults of results) {
      list.push(...monthResults);
    }
    console.log(`IMPACT scraper: Successfully fetched total of ${list.length} events across ${year}.`);
  } catch (e) {
    console.error("Live IMPACT scrape failed:", e);
  }
  return enrichEventsWithOrganizerContacts(list);
}

// Scrape live data from BITEC website
async function scrapeBitecLive(year: number): Promise<ScrapedEvent[]> {
  const list: ScrapedEvent[] = [];
  try {
    const bitecUrl = "https://www.bitec.co.th/visitor/coming-events";
    const res = await fetch(bitecUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(6000), // 6 second timeout
    });
    
    if (!res.ok) return [];
    const html = await res.text();
    const $ = cheerio.load(html);
    
    $("h3.entry-title a").each((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr("href") || "";
      const container = $(el).parent().parent();
      const dateText = container.find(".date").text().trim();

      const { startsAt, endsAt } = parseDateRange(dateText);

      // BITEC stores images as CSS background-image one level up in .pic .image
      const gridRow = container.parent();
      const styleAttr = gridRow.find(".pic .image, .cover .image").first().attr("style") || "";
      const bgMatch = styleAttr.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      const imageUrl = bgMatch ? bgMatch[1] : null;

      list.push({
        title,
        source: "BITEC",
        startsAt: startsAt.toISOString(),
        endsAt: endsAt ? endsAt.toISOString() : null,
        category: getCategoryFromTitle(title),
        hall: "BITEC Exhibition Hall",
        venueSlug: "bitec",
        sourceUrl: href,
        imageUrl,
      });
    });
  } catch (e) {
    console.error("Live BITEC scrape failed:", e);
  }
  return enrichEventsWithOrganizerContacts(list.filter((event) => isEventInYear(event, year)));
}

function getCategoryFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("expo") || t.includes("fair") || t.includes("show") || t.includes("exhibition")) {
    return "Exhibition / Trade Show";
  }
  if (t.includes("concert") || t.includes("live") || t.includes("fan-con")) {
    return "Concert / Entertainment";
  }
  if (t.includes("meeting") || t.includes("seminar") || t.includes("conference")) {
    return "Meeting / Seminar";
  }
  return "General Event";
}

function mapSavedEvent(savedEvent: DbEventWithVenue, source: string) {
  return {
    id: savedEvent.id.toString(),
    title: savedEvent.title,
    source: savedEvent.source,
    date: formatDateRange(new Date(savedEvent.startsAt), savedEvent.endsAt ? new Date(savedEvent.endsAt) : null),
    venue: savedEvent.venue.name,
    hall: savedEvent.hall || "Main Exhibition Area",
    category: savedEvent.category || "General Event",
    imageUrl: savedEvent.imageUrl || null,
    organizerName: savedEvent.organizerName || null,
    organizerContactName: savedEvent.organizerContactName || null,
    organizerPhone: savedEvent.organizerPhone || null,
    organizerEmail: savedEvent.organizerEmail || null,
    organizerWebsite: savedEvent.organizerWebsite || null,
    leadScore: 80 + (savedEvent.id % 18),
    leadIdea: getLeadIdea(savedEvent.title, savedEvent.category || "", source),
  };
}

export async function POST(request: NextRequest) {
  let dbSuccess = false;
  let syncedCount = 0;
  const syncedEvents: any[] = [];

  const { searchParams } = new URL(request.url);
  const sourceParam = searchParams.get("source")?.toLowerCase() || "all";
  const requestedYear = Number(searchParams.get("year"));
  const syncYear = Number.isInteger(requestedYear) && requestedYear >= 2000 && requestedYear <= 2100
    ? requestedYear
    : new Date().getFullYear();

  // 1. Fetch live events from websites selectively or in parallel
  console.log(`Triggering live event scraping for source: ${sourceParam}, year: ${syncYear}...`);
  
  let impactLiveList: ScrapedEvent[] = [];
  let bitecLiveList: ScrapedEvent[] = [];

  try {
    const promises: Promise<any[]>[] = [];
    
    if (sourceParam === "all" || sourceParam === "impact") {
      promises.push(scrapeImpactLive(syncYear));
    } else {
      promises.push(Promise.resolve([]));
    }
    
    if (sourceParam === "all" || sourceParam === "bitec") {
      promises.push(scrapeBitecLive(syncYear));
    } else {
      promises.push(Promise.resolve([]));
    }

    const [impactRes, bitecRes] = await Promise.all(promises);
    impactLiveList = impactRes;
    bitecLiveList = bitecRes;
  } catch (e) {
    console.error("Selective scraping execution failed:", e);
  }
  
  const liveEvents = dedupeEvents([...impactLiveList, ...bitecLiveList]);
  
  const activeFallbackList = fallbackEventsList.filter(item => {
    const matchesSource = sourceParam === "all" || item.venueSlug === sourceParam;
    return matchesSource && isEventInYear(item, syncYear);
  });

  const activeEventsList = liveEvents.length > 0 ? liveEvents : activeFallbackList;
  const activeSource = liveEvents.length > 0 ? "live_scraper" : "static_fallback";

  // 2. Sync events to Database
  try {
    if (!prisma) throw new Error("Prisma client not initialized");
    
    // Ensure Venues exist
    const bitec = await prisma.venue.upsert({
      where: { slug: "bitec" },
      update: {},
      create: {
        name: "BITEC",
        slug: "bitec",
        website: "https://www.bitec.co.th/",
        location: "Bangna, Bangkok",
      },
    });

    const impact = await prisma.venue.upsert({
      where: { slug: "impact" },
      update: {},
      create: {
        name: "IMPACT Muang Thong Thani",
        slug: "impact",
        website: "https://www.impact.co.th/",
        location: "Pak Kred, Nonthaburi",
      },
    });

    const venueMap: Record<string, number> = {
      bitec: bitec.id,
      impact: impact.id,
    };

    for (const item of activeEventsList) {
      const venueId = venueMap[item.venueSlug];
      const start = new Date(item.startsAt);
      
      const savedEvent = await prisma.event.upsert({
        where: {
          title_startsAt_venueId: {
            title: item.title,
            startsAt: start,
            venueId: venueId,
          },
        },
        update: {
          endsAt: item.endsAt ? new Date(item.endsAt) : null,
          hall: item.hall,
          category: item.category,
          sourceUrl: item.sourceUrl,
          imageUrl: item.imageUrl ?? null,
        },
        create: {
          title: item.title,
          source: item.source as any,
          startsAt: start,
          endsAt: item.endsAt ? new Date(item.endsAt) : null,
          hall: item.hall,
          category: item.category,
          venueId: venueId,
          sourceUrl: item.sourceUrl,
          imageUrl: item.imageUrl ?? null,
        },
      });

      syncedEvents.push(mapSavedEvent({
        id: savedEvent.id,
        title: savedEvent.title,
        source: savedEvent.source,
        startsAt: new Date(savedEvent.startsAt),
        endsAt: savedEvent.endsAt ? new Date(savedEvent.endsAt) : null,
        hall: savedEvent.hall,
        category: savedEvent.category,
        sourceUrl: savedEvent.sourceUrl,
        organizerName: item.organizerName || null,
        organizerContactName: item.organizerContactName || null,
        organizerPhone: item.organizerPhone || null,
        organizerEmail: item.organizerEmail || null,
        organizerWebsite: item.organizerWebsite || null,
        imageUrl: item.imageUrl || null,
        venue: {
          name: item.source === "BITEC" ? "BITEC" : "IMPACT Muang Thong Thani",
          slug: item.venueSlug,
        },
      }, item.source));
      syncedCount++;
    }
    dbSuccess = true;
  } catch (error) {
    console.warn("Prisma database sync failed, trying mysql2 fallback.", error);
  }

  if (!dbSuccess) {
    try {
      const savedEvents = await upsertEventsWithMysql(activeEventsList);
      syncedEvents.push(...savedEvents.map((event) => mapSavedEvent(event, event.source)));
      syncedCount = savedEvents.length;
      dbSuccess = true;
    } catch (error) {
      console.warn("mysql2 database sync failed, executing file cache sync fallback.", error);
    }
  }

  // 3. Update Cache JSON File for consistency
  const fallbackList = syncedEvents.length > 0 ? syncedEvents : activeEventsList.map((item, idx) => ({
    id: `cache-${idx}`,
    title: item.title,
    source: item.source,
    date: formatDateRange(new Date(item.startsAt), item.endsAt ? new Date(item.endsAt) : null),
    venue: item.source === "BITEC" ? "BITEC" : "IMPACT Muang Thong Thani",
    hall: item.hall,
    category: item.category,
    organizerName: item.organizerName || null,
    organizerContactName: item.organizerContactName || null,
    organizerPhone: item.organizerPhone || null,
    organizerEmail: item.organizerEmail || null,
    organizerWebsite: item.organizerWebsite || null,
    leadScore: 82 + (idx % 15),
    leadIdea: getLeadIdea(item.title, item.category || "", item.source),
    orderNo: `LD-${String(1001 + idx)}`,
    status: idx % 3 === 0 ? "Succeed" : idx % 3 === 1 ? "Waiting" : "Canceled",
  }));

  try {
    const dir = path.dirname(CACHE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_PATH, JSON.stringify(fallbackList, null, 2), "utf-8");
  } catch (err) {
    console.error("Cache file writing failed", err);
  }

  return NextResponse.json({
    success: true,
    syncedCount: dbSuccess ? syncedCount : fallbackList.length,
    source: dbSuccess ? "database" : "cache",
    syncMethod: activeSource,
    year: syncYear,
    events: dbSuccess ? syncedEvents : fallbackList,
  });
}

function formatDateRange(start: Date, end: Date | null): string {
  const sDay = start.getDate();
  const sMonth = start.toLocaleDateString("en-GB", { month: "short" });
  const sYear = start.getFullYear();
  
  if (!end) {
    return `${String(sDay).padStart(2, "0")} ${sMonth} ${sYear}`;
  }
  
  const eDay = end.getDate();
  const eMonth = end.toLocaleDateString("en-GB", { month: "short" });

  if (sMonth === eMonth) {
    return `${String(sDay).padStart(2, "0")}-${String(eDay).padStart(2, "0")} ${sMonth} ${sYear}`;
  }
  return `${String(sDay).padStart(2, "0")} ${sMonth} - ${String(eDay).padStart(2, "0")} ${eMonth} ${sYear}`;
}

function getLeadIdea(title: string, category: string, source: string): string {
  const venue = source === "BITEC" ? "BITEC" : "IMPACT";
  if (title.toLowerCase().includes("manufacturing") || title.toLowerCase().includes("pak")) {
    return `Target exhibitors needing booth setup, CRM capture, QR registration and post-event follow-up.`;
  }
  if (category.toLowerCase().includes("health") || category.toLowerCase().includes("medical") || category.toLowerCase().includes("wellness")) {
    return `Prospect clinics, device brands and wellness operators with appointment and lead nurturing needs.`;
  }
  if (category.toLowerCase().includes("franchise") || title.toLowerCase().includes("sme")) {
    return `Find franchisors and brokers who need lead forms, branch inquiry tracking and sales follow-up.`;
  }
  return `Target exhibitors at ${venue} with customized lead generation campaigns and booth visitor tracking solutions.`;
}
