import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { findEventsWithMysql, updateEventOutreachStatusWithMysql, type DbEventWithVenue } from "@/lib/mysqlEvents";
import { sampleEvents } from "@/lib/eventSources";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "src/generated/scraped_events.json");
const allowedStatuses = new Set(["NEW", "NEEDS_REVIEW", "READY", "CONTACTED", "PROPOSAL", "NOT_INTERESTED"]);
const DIGITECH_FACEBOOK_URL = "https://www.facebook.com/digitechasean";

function getVisibleYears() {
  const currentYear = new Date().getFullYear();
  return [currentYear];
}

function isDbEventInYears(event: DbEventWithVenue, years: number[]) {
  return years.includes(new Date(event.startsAt).getFullYear());
}

function getCachedEventYear(event: { startsAt?: string | null; date?: string | null }) {
  if (event.startsAt) {
    const startsAt = new Date(event.startsAt);
    if (!Number.isNaN(startsAt.getTime())) return startsAt.getFullYear();
  }

  const match = event.date?.match(/\b(20\d{2}|21\d{2})\b/);
  return match ? Number(match[1]) : null;
}

function isCachedEventInYears(event: { startsAt?: string | null; date?: string | null }, years: number[]) {
  const year = getCachedEventYear(event);
  return year === null || years.includes(year);
}

function getDefaultOutreachStatus(e: DbEventWithVenue) {
  if (e.outreachStatus) return e.outreachStatus;
  if (e.organizerPhone || e.organizerEmail) return "READY";
  return "NEEDS_REVIEW";
}

function getFacebookOverride(event: { title: string; organizerEmail?: string | null; organizerWebsite?: string | null }) {
  const title = event.title.toLowerCase();
  const email = event.organizerEmail?.toLowerCase() || "";
  const website = event.organizerWebsite?.toLowerCase() || "";

  if (
    title.includes("digitech asean thailand") ||
    email.includes("info@digitechasean.com") ||
    website.includes("digitechasean.com")
  ) {
    return DIGITECH_FACEBOOK_URL;
  }

  return null;
}

function mapDbEvent(e: DbEventWithVenue, idx: number) {
  const organizerFacebook = getFacebookOverride(e) || e.organizerFacebook || null;

  return {
    id: e.id.toString(),
    title: e.title,
    source: e.source,
    startsAt: new Date(e.startsAt).toISOString(),
    endsAt: e.endsAt ? new Date(e.endsAt).toISOString() : null,
    date: formatDateRange(new Date(e.startsAt), e.endsAt ? new Date(e.endsAt) : null),
    venue: e.venue.name,
    hall: e.hall || "Main Exhibition Area",
    category: e.category || "General Event",
    sourceUrl: e.sourceUrl || null,
    imageUrl: e.imageUrl || null,
    organizerName: e.organizerName || null,
    organizerContactName: e.organizerContactName || null,
    organizerPhone: e.organizerPhone || null,
    organizerEmail: e.organizerEmail || null,
    organizerWebsite: e.organizerWebsite || null,
    organizerFacebook,
    leadIdea: getLeadIdea(e.title, e.category || "", e.venue.name),
    orderNo: `LD-${String(1001 + idx)}`,
    status: getDefaultOutreachStatus(e),
  };
}

export async function GET() {
  const visibleYears = getVisibleYears();

  try {
    if (!prisma) throw new Error("Prisma client not initialized");
    // Attempt to query events from local MySQL
    const dbEvents = await prisma.event.findMany({
      include: { venue: true },
      orderBy: { startsAt: "desc" },
    });

    if (dbEvents.length > 0) {
      const mapped = dbEvents.map((e, idx) => mapDbEvent({
        id: e.id,
        title: e.title,
        source: e.source,
        startsAt: new Date(e.startsAt),
        endsAt: e.endsAt ? new Date(e.endsAt) : null,
        hall: e.hall,
        category: e.category,
        sourceUrl: e.sourceUrl,
        imageUrl: e.imageUrl,
        organizerName: e.organizerName,
        organizerContactName: e.organizerContactName,
        organizerPhone: e.organizerPhone,
        organizerEmail: e.organizerEmail,
        organizerWebsite: e.organizerWebsite,
        organizerFacebook: e.organizerFacebook,
        outreachStatus: e.outreachStatus,
        venue: {
          name: e.venue.name,
          slug: e.venue.slug,
        },
      }, idx));
      return NextResponse.json({
        events: mapped.filter((event) => isCachedEventInYears(event, visibleYears)),
        source: "database",
        years: visibleYears,
      });
    }
  } catch (dbError) {
    console.warn("Prisma database connection failed. Trying mysql2 fallback.", dbError);
  }

  try {
    const dbEvents = await findEventsWithMysql();
    if (dbEvents.length > 0) {
      return NextResponse.json({ events: dbEvents.filter((event) => isDbEventInYears(event, visibleYears)).map(mapDbEvent), source: "database", years: visibleYears });
    }
  } catch (dbError) {
    console.warn("mysql2 database connection failed. Falling back to local cache.", dbError);
  }

  // Fallback 1: Local Cache JSON file
  if (fs.existsSync(CACHE_PATH)) {
    try {
      const data = fs.readFileSync(CACHE_PATH, "utf-8");
      const cached = JSON.parse(data);
      return NextResponse.json({ events: cached.filter((event: { startsAt?: string | null; date?: string | null }) => isCachedEventInYears(event, visibleYears)), source: "cache", years: visibleYears });
    } catch (cacheError) {
      console.error("Failed to read cache file", cacheError);
    }
  }

  // Fallback 2: Return Hardcoded Sample Events
  const formattedSample = sampleEvents.map((event, index) => ({
    ...event,
    orderNo: `LD-${String(1001 + index)}`,
    status: index % 3 === 0 ? "NEW" : index % 3 === 1 ? "READY" : "NEEDS_REVIEW",
  }));

  return NextResponse.json({ events: formattedSample.filter((event) => isCachedEventInYears(event, visibleYears)), source: "mock", years: visibleYears });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = String(body.status || "");

    if (!Number.isInteger(id) || id <= 0 || !allowedStatuses.has(status)) {
      return NextResponse.json({ success: false, message: "Invalid status update" }, { status: 400 });
    }

    const updated = await updateEventOutreachStatusWithMysql(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error("Failed to update event outreach status", error);
    return NextResponse.json({ success: false, message: "Unable to update status" }, { status: 500 });
  }
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

function getLeadIdea(title: string, category: string, venue: string): string {
  if (title.toLowerCase().includes("manufacturing") || title.toLowerCase().includes("pak")) {
    return `Target exhibitors needing booth setup, CRM capture, QR registration and post-event follow-up.`;
  }
  if (category.toLowerCase().includes("health") || category.toLowerCase().includes("medical")) {
    return `Prospect clinics, device brands and wellness operators with appointment and lead nurturing needs.`;
  }
  if (category.toLowerCase().includes("franchise") || title.toLowerCase().includes("sme")) {
    return `Find franchisors and brokers who need lead forms, branch inquiry tracking and sales follow-up.`;
  }
  return `Target exhibitors at ${venue} with customized lead generation campaigns and booth visitor tracking solutions.`;
}
