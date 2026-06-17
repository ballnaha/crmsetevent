import { NextResponse } from "next/server";
import { calendarSources, sampleEvents } from "@/lib/eventSources";

export function GET() {
  return NextResponse.json({
    sources: calendarSources,
    sampleEvents,
    generatedAt: new Date().toISOString(),
  });
}

