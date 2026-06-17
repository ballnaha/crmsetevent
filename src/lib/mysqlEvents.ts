import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

type RawEventInput = {
  title: string;
  source: string;
  startsAt: string;
  endsAt: string | null;
  category: string;
  hall: string;
  venueSlug: string;
  sourceUrl: string;
  imageUrl?: string | null;
  organizerName?: string | null;
  organizerContactName?: string | null;
  organizerPhone?: string | null;
  organizerEmail?: string | null;
  organizerWebsite?: string | null;
};

export type DbEventWithVenue = {
  id: number;
  title: string;
  source: string;
  startsAt: Date;
  endsAt: Date | null;
  hall: string | null;
  category: string | null;
  sourceUrl?: string | null;
  imageUrl?: string | null;
  organizerName?: string | null;
  organizerContactName?: string | null;
  organizerPhone?: string | null;
  organizerEmail?: string | null;
  organizerWebsite?: string | null;
  outreachStatus?: string | null;
  venue: {
    name: string;
    slug: string;
  };
};

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
  return url;
}

async function createConnection() {
  return mysql.createConnection(getDatabaseUrl());
}

async function upsertVenue(
  conn: mysql.Connection,
  venue: { name: string; slug: string; website: string; location: string },
) {
  const [result] = await conn.execute<ResultSetHeader>(
    `INSERT INTO venue (name, slug, website, location, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, NOW(3), NOW(3))
     ON DUPLICATE KEY UPDATE
       id = LAST_INSERT_ID(id),
       name = VALUES(name),
       website = VALUES(website),
       location = VALUES(location),
       updatedAt = NOW(3)`,
    [venue.name, venue.slug, venue.website, venue.location],
  );

  return result.insertId;
}

async function ensureEventContactColumns(conn: mysql.Connection) {
  const [columns] = await conn.execute<RowDataPacket[]>("SHOW COLUMNS FROM event");
  const existing = new Set(columns.map((column) => String(column.Field)));
  const missingColumns = [
    ["organizerName", "VARCHAR(191) NULL"],
    ["organizerContactName", "VARCHAR(191) NULL"],
    ["organizerPhone", "VARCHAR(191) NULL"],
    ["organizerEmail", "VARCHAR(191) NULL"],
    ["organizerWebsite", "VARCHAR(191) NULL"],
    ["outreachStatus", "VARCHAR(32) NOT NULL DEFAULT 'NEW'"],
    ["imageUrl", "VARCHAR(512) NULL"],
  ].filter(([name]) => !existing.has(name));

  for (const [name, definition] of missingColumns) {
    await conn.execute(`ALTER TABLE event ADD COLUMN \`${name}\` ${definition}`);
  }
}

export async function upsertEventsWithMysql(items: RawEventInput[]) {
  const conn = await createConnection();

  try {
    await conn.beginTransaction();
    await ensureEventContactColumns(conn);

    const bitecId = await upsertVenue(conn, {
      name: "BITEC",
      slug: "bitec",
      website: "https://www.bitec.co.th/",
      location: "Bangna, Bangkok",
    });
    const impactId = await upsertVenue(conn, {
      name: "IMPACT Muang Thong Thani",
      slug: "impact",
      website: "https://www.impact.co.th/",
      location: "Pak Kred, Nonthaburi",
    });

    const venueMap: Record<string, { id: number; name: string }> = {
      bitec: { id: bitecId, name: "BITEC" },
      impact: { id: impactId, name: "IMPACT Muang Thong Thani" },
    };

    const savedEvents: DbEventWithVenue[] = [];

    for (const item of items) {
      const venue = venueMap[item.venueSlug];
      if (!venue) continue;

      const startsAt = new Date(item.startsAt);
      const endsAt = item.endsAt ? new Date(item.endsAt) : null;

      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO event
          (
            title,
            source,
            sourceUrl,
            imageUrl,
            category,
            hall,
            organizerName,
            organizerContactName,
            organizerPhone,
            organizerEmail,
            organizerWebsite,
            outreachStatus,
            startsAt,
            endsAt,
            venueId,
            createdAt,
            updatedAt
          )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, ?, ?, NOW(3), NOW(3))
         ON DUPLICATE KEY UPDATE
           id = LAST_INSERT_ID(id),
           endsAt = VALUES(endsAt),
           hall = VALUES(hall),
           category = VALUES(category),
           sourceUrl = VALUES(sourceUrl),
           imageUrl = VALUES(imageUrl),
           organizerName = VALUES(organizerName),
           organizerContactName = VALUES(organizerContactName),
           organizerPhone = VALUES(organizerPhone),
           organizerEmail = VALUES(organizerEmail),
           organizerWebsite = VALUES(organizerWebsite),
           updatedAt = NOW(3)`,
        [
          item.title,
          item.source,
          item.sourceUrl,
          item.imageUrl ?? null,
          item.category,
          item.hall,
          item.organizerName ?? null,
          item.organizerContactName ?? null,
          item.organizerPhone ?? null,
          item.organizerEmail ?? null,
          item.organizerWebsite ?? null,
          startsAt,
          endsAt,
          venue.id,
        ],
      );

      savedEvents.push({
        id: result.insertId,
        title: item.title,
        source: item.source,
        startsAt,
        endsAt,
        hall: item.hall,
        category: item.category,
        sourceUrl: item.sourceUrl,
        imageUrl: item.imageUrl ?? null,
        organizerName: item.organizerName ?? null,
        organizerContactName: item.organizerContactName ?? null,
        organizerPhone: item.organizerPhone ?? null,
        organizerEmail: item.organizerEmail ?? null,
        organizerWebsite: item.organizerWebsite ?? null,
        outreachStatus: "NEW",
        venue: {
          name: venue.name,
          slug: item.venueSlug,
        },
      });
    }

    await conn.commit();
    return savedEvents;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    await conn.end();
  }
}

type EventRow = RowDataPacket & {
  id: number;
  title: string;
  source: string;
  startsAt: Date;
  endsAt: Date | null;
  hall: string | null;
  category: string | null;
  sourceUrl: string | null;
  imageUrl: string | null;
  organizerName: string | null;
  organizerContactName: string | null;
  organizerPhone: string | null;
  organizerEmail: string | null;
  organizerWebsite: string | null;
  outreachStatus: string;
  venueName: string;
  venueSlug: string;
};

export async function findEventsWithMysql(): Promise<DbEventWithVenue[]> {
  const conn = await createConnection();

  try {
    await ensureEventContactColumns(conn);
    const [rows] = await conn.execute<EventRow[]>(
      `SELECT
         e.id,
         e.title,
         e.source,
         e.startsAt,
         e.endsAt,
         e.hall,
         e.category,
         e.sourceUrl,
         e.imageUrl,
         e.organizerName,
         e.organizerContactName,
         e.organizerPhone,
         e.organizerEmail,
         e.organizerWebsite,
         e.outreachStatus,
         v.name AS venueName,
         v.slug AS venueSlug
       FROM event e
       INNER JOIN venue v ON v.id = e.venueId
       ORDER BY e.startsAt DESC`,
    );

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      source: row.source,
      startsAt: row.startsAt,
      endsAt: row.endsAt,
      hall: row.hall,
      category: row.category,
      sourceUrl: row.sourceUrl,
      imageUrl: row.imageUrl,
      organizerName: row.organizerName,
      organizerContactName: row.organizerContactName,
      organizerPhone: row.organizerPhone,
      organizerEmail: row.organizerEmail,
      organizerWebsite: row.organizerWebsite,
      outreachStatus: row.outreachStatus,
      venue: {
        name: row.venueName,
        slug: row.venueSlug,
      },
    }));
  } finally {
    await conn.end();
  }
}

export async function updateEventOutreachStatusWithMysql(id: number, outreachStatus: string) {
  const conn = await createConnection();

  try {
    await ensureEventContactColumns(conn);
    const [result] = await conn.execute<ResultSetHeader>(
      "UPDATE event SET outreachStatus = ?, updatedAt = NOW(3) WHERE id = ?",
      [outreachStatus, id],
    );
    return result.affectedRows > 0;
  } finally {
    await conn.end();
  }
}
