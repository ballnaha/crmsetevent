import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    if (!filename) {
      return new NextResponse("Filename is required", { status: 400 });
    }

    // Prevent directory traversal
    const baseName = path.basename(filename);
    const filePath = path.join(process.cwd(), "public", "uploads", baseName);

    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);

    // Determine content type
    let contentType = "application/octet-stream";
    const ext = path.extname(baseName).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[GET /uploads/[filename]]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
