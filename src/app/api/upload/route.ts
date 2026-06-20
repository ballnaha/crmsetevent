import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Supported extensions
const ALLOWED_EXT = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const files = await fs.readdir(uploadDir);
    const images = files.filter((file) => ALLOWED_EXT.test(file));

    const imageList = await Promise.all(
      images.map(async (file) => {
        const filePath = path.join(uploadDir, file);
        const stats = await fs.stat(filePath);
        
        const host = req.headers.get("host") || "localhost:4013";
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const baseUrl = `${protocol}://${host}`;

        return {
          name: file,
          url: `${baseUrl}/uploads/${file}`,
          size: stats.size,
          uploadedAt: stats.mtime,
        };
      })
    );

    // Sort descending (latest first)
    imageList.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

    return NextResponse.json({ images: imageList });
  } catch (err) {
    console.error("[GET /api/upload]", err);
    return NextResponse.json({ error: "Failed to scan files" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // Validate filename extension
    if (!ALLOWED_EXT.test(file.name)) {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const ext = path.extname(file.name) || ".png";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    // Write file
    await fs.writeFile(filePath, buffer);

    const host = req.headers.get("host") || "localhost:4013";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;
    const url = `${baseUrl}/uploads/${uniqueName}`;

    return NextResponse.json({ url, name: uniqueName }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    // Prevent directory traversal
    const baseName = path.basename(name);
    const filePath = path.join(process.cwd(), "public", "uploads", baseName);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/upload]", err);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
