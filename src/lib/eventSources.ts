export type CalendarSource = {
  id: "BITEC" | "IMPACT";
  name: string;
  venue: string;
  calendarUrl: string;
  leadAngle: string;
};

export const calendarSources: CalendarSource[] = [
  {
    id: "BITEC",
    name: "BITEC Upcoming Events",
    venue: "Bangkok International Trade & Exhibition Centre",
    calendarUrl: "https://www.bitec.co.th/",
    leadAngle: "Industrial, retail, hospitality, healthcare, logistics and consumer fairs",
  },
  {
    id: "IMPACT",
    name: "IMPACT Event Calendar",
    venue: "IMPACT Muang Thong Thani",
    calendarUrl: "https://www.impact.co.th/en/visitors/event-calendar",
    leadAngle: "Public exhibitions, trade shows, concerts, seminars and sport events",
  },
];

export type LeadEvent = {
  id: string;
  title: string;
  source: "BITEC" | "IMPACT";
  date: string;
  venue: string;
  hall: string;
  category: string;
  leadScore: number;
  leadIdea: string;
};

export const sampleEvents: LeadEvent[] = [
  {
    id: "bitec-manufacturing-expo-2026",
    title: "Manufacturing Expo 2026",
    source: "BITEC",
    date: "17-20 Jun 2026",
    venue: "BITEC",
    hall: "Exhibition halls",
    category: "Industrial / Manufacturing",
    leadScore: 96,
    leadIdea: "Target exhibitors needing booth setup, CRM capture, QR registration and post-event follow-up.",
  },
  {
    id: "bitec-thailand-wellness-healthcare-expo-2026",
    title: "Thailand Wellness & Healthcare Expo 2026",
    source: "BITEC",
    date: "25-27 Jun 2026",
    venue: "BITEC",
    hall: "Exhibition halls",
    category: "Healthcare",
    leadScore: 88,
    leadIdea: "Prospect clinics, device brands and wellness operators with appointment and lead nurturing needs.",
  },
  {
    id: "impact-propak-asia-2026",
    title: "ProPak Asia 2026",
    source: "IMPACT",
    date: "10-13 Jun 2026",
    venue: "IMPACT Muang Thong Thani",
    hall: "IMPACT Challenger",
    category: "Trade Exhibition",
    leadScore: 94,
    leadIdea: "Prioritize packaging, food processing and automation exhibitors for B2B sales pipeline outreach.",
  },
  {
    id: "impact-franchise-expo-thailand-2026",
    title: "Franchise Expo Thailand by Smart SME Expo",
    source: "IMPACT",
    date: "06-09 Aug 2026",
    venue: "IMPACT Muang Thong Thani",
    hall: "IMPACT Exhibition Center",
    category: "Franchise / SME",
    leadScore: 86,
    leadIdea: "Find franchisors and brokers who need lead forms, branch inquiry tracking and sales follow-up.",
  },
];

