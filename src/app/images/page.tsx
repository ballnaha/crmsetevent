"use client";

import AppFrame from "@/app/components/AppFrame";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  AlertCircle,
  FileImage,
  ExternalLink,
  Search,
  Database,
  Info,
  Sparkles,
  Eye,
  X,
} from "lucide-react";

type UploadedImage = {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
};

export default function ImageLibraryPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFormat, setSelectedFormat] = useState("ALL");
  const [previewImage, setPreviewImage] = useState<UploadedImage | null>(null);
  const [copiedHtmlId, setCopiedHtmlId] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      setLoading(true);
      const res = await fetch("/api/upload");
      const data = await res.json();
      setImages(data.images ?? []);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถโหลดรายการรูปภาพได้");
    } finally {
      setLoading(false);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("อนุญาตให้อัปโหลดเฉพาะไฟล์รูปภาพเท่านั้น");
      return;
    }
    // Allow up to 15MB since client-side compression will optimize it down to < 1MB
    if (file.size > 15 * 1024 * 1024) {
      setError("ขนาดไฟล์ดั้งเดิมห้ามเกิน 15MB");
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(10);

    try {
      // Compress and resize image in client browser
      const processedFile = await resizeAndCompressImage(file);
      setUploadProgress(30);

      const formData = new FormData();
      formData.append("file", processedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "เกิดข้อผิดพลาดในการอัปโหลด");

      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        fetchImages();
      }, 500);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "เกิดข้อผิดพลาดในการอัปโหลด");
      setUploading(false);
    }
  }

  function deleteImage(name: string) {
    setDeleteTarget(name);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/upload?name=${encodeURIComponent(deleteTarget)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "เกิดข้อผิดพลาดในการลบ");
      setDeleteTarget(null);
      fetchImages();
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "เกิดข้อผิดพลาดในการลบไฟล์");
    } finally {
      setDeleting(false);
    }
  }

  const copyToClipboard = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const fmtDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalSize = images.reduce((acc, img) => acc + img.size, 0);
  const filteredImages = images.filter((img) => {
    const matchesSearch = img.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFormat === "ALL") return true;
    const ext = img.name.split('.').pop()?.toUpperCase() ?? "";
    if (selectedFormat === "JPG") return ext === "JPG" || ext === "JPEG";
    return ext === selectedFormat;
  });

  const copyHtmlToClipboard = (url: string, name: string) => {
    const html = `<img src="${url}" alt="${name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 8px;" />`;
    navigator.clipboard.writeText(html);
    setCopiedHtmlId(name);
    setTimeout(() => setCopiedHtmlId(null), 2000);
  };

  const mockHtmlCode = `<img src="${images[0]?.url || "https://yourdomain.com/uploads/image.png"}" alt="Event Banner" style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 8px;" />`;

  return (
    <AppFrame>
      <Box className="dashboardPage">
        
        {/* Header Block with glassmorphism styling */}
        <Paper
          sx={{
            p: 3.5,
            mb: 4.5,
            bgcolor: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-card)",
            background: "linear-gradient(135deg, var(--panel) 0%, rgba(139,92,246,0.02) 100%)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, var(--brand) 0%, #a78bfa 100%)",
            }
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} sx={{ alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between" }} spacing={3}>
            <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "14px",
                  bgcolor: "rgba(139,92,246,0.08)",
                  border: "1.5px solid rgba(139,92,246,0.2)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(139,92,246,0.15)",
                }}
              >
                <ImageIcon size={24} style={{ color: "var(--brand)" }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: 850, fontSize: "1.45rem", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
                  Image Library & Media Vault
                </Typography>
                <Typography sx={{ color: "var(--muted)", fontSize: "0.82rem", mt: 0.5 }}>
                  คลังเก็บไฟล์ภาพและสื่อมีเดียสำหรับแนบลิงก์รูปภาพใน Email Templates ของแคมเปญ
                </Typography>
              </Box>
            </Stack>

            {/* Statistics Badges */}
            <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: "rgba(139,92,246,0.04)",
                  border: "1px solid rgba(139,92,246,0.1)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                }}
              >
                <FileImage size={15} style={{ color: "var(--brand)" }} />
                <Box>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700 }}>ไฟล์ทั้งหมด</Typography>
                  <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.85rem", fontWeight: 800 }}>{images.length} รูปภาพ</Typography>
                </Box>
              </Paper>

              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: "rgba(14,165,233,0.04)",
                  border: "1px solid rgba(14,165,233,0.1)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                }}
              >
                <Database size={15} style={{ color: "var(--brand-dark)" }} />
                <Box>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700 }}>ความจุที่ใช้</Typography>
                  <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 800 }}>{formatBytes(totalSize)}</Typography>
                </Box>
              </Paper>
            </Stack>
          </Stack>
        </Paper>

        {/* Upload Error Warning */}
        {error && (
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              mb: 4,
              p: 2,
              bgcolor: "var(--danger-bg)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <AlertCircle size={16} style={{ color: "var(--danger)" }} />
            <Typography sx={{ color: "var(--danger)", fontSize: "0.82rem", fontWeight: 600 }}>{error}</Typography>
          </Stack>
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "360px 1fr" }, gap: 4.5, alignItems: "start" }}>
          
          {/* Left Column: Drag & Drop Zone + Instructions */}
          <Stack spacing={4}>
            
            {/* Dropzone card */}
            <Paper
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              sx={{
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: dragging ? "rgba(139,92,246,0.06)" : "var(--panel)",
                border: dragging ? "2.2px dashed var(--brand)" : "1.8px dashed var(--line)",
                borderRadius: "20px",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: dragging ? "0 12px 30px rgba(139,92,246,0.15)" : "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "&:hover": {
                  borderColor: "var(--brand)",
                  bgcolor: "rgba(139,92,246,0.02)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                },
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              
              {uploading ? (
                <Stack spacing={2.5} sx={{ alignItems: "center", py: 3, width: "100%" }}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress size={56} variant="determinate" value={uploadProgress} sx={{ color: "var(--brand)" }} />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.75rem", color: "var(--brand-dark)" }}>
                        {uploadProgress}%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 750 }}>
                    กำลังส่งรูปขึ้นเซิร์ฟเวอร์...
                  </Typography>
                </Stack>
              ) : (
                <Stack spacing={3} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      bgcolor: "rgba(139,92,246,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(139,92,246,0.1)",
                      transition: "transform 0.2s ease",
                      "& svg": { transition: "transform 0.2s ease" },
                      ".MuiPaper-root:hover &": {
                        bgcolor: "rgba(139,92,246,0.1)",
                        "& svg": { transform: "translateY(-3px)" }
                      }
                    }}
                  >
                    <Upload size={24} style={{ color: "var(--brand)" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.9rem", fontWeight: 800 }}>
                      ลากไฟล์รูปภาพมาวางที่นี่
                    </Typography>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.76rem", mt: 0.75, px: 2 }}>
                      หรือกดเลือกรูปภาพจากโฟลเดอร์ในคอมพิวเตอร์ของคุณ
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "var(--muted-light)", fontSize: "0.68rem", bgcolor: "rgba(0,0,0,0.02)", px: 1.5, py: 0.5, borderRadius: "20px" }}>
                    JPG, PNG, GIF, WebP, SVG (ไม่เกิน 5MB)
                  </Typography>
                </Stack>
              )}
            </Paper>

            {/* Storage Capacity Widget */}
            <Paper
              sx={{
                p: 3,
                bgcolor: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                boxShadow: "var(--shadow-card)",
                background: "linear-gradient(135deg, var(--panel) 0%, rgba(14,165,233,0.01) 100%)",
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: "rgba(14,165,233,0.08)",
                    border: "1px solid rgba(14,165,233,0.15)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--brand)"
                  }}
                >
                  <Database size={15} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "0.85rem" }}>
                    พื้นที่จัดเก็บข้อมูล (Storage)
                  </Typography>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                    ความจุสำหรับการอัปโหลดรูปภาพบนเครื่องเซิร์ฟเวอร์
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ mb: 1.5 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 0.75 }}>
                  <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.82rem", fontWeight: 750 }}>
                    {formatBytes(totalSize)}
                  </Typography>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", fontWeight: 600 }}>
                    ขีดจำกัดแนะนำ 50 MB
                  </Typography>
                </Stack>
                
                {/* Custom animated progress bar */}
                <Box
                  sx={{
                    height: 8,
                    width: "100%",
                    bgcolor: "rgba(0,0,0,0.04)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${Math.min((totalSize / (50 * 1024 * 1024)) * 100, 100)}%`,
                      background: "linear-gradient(90deg, var(--brand) 0%, var(--accent) 100%)",
                      borderRadius: "4px",
                      transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 0 10px rgba(14,165,233,0.3)"
                    }}
                  />
                </Box>
              </Box>

              <Typography sx={{ color: "var(--muted-light)", fontSize: "0.68rem", lineHeight: 1.4 }}>
                * ลบภาพที่ไม่ได้ใช้งานออกเพื่อเพิ่มพื้นที่ว่าง ระบบรองรับการอัปโหลดได้ไม่จำกัดจำนวนไฟล์จนกว่าพื้นที่บนเครื่องเซิร์ฟเวอร์หลักจะเต็ม
              </Typography>
            </Paper>

            {/* Instruction Card */}
            <Paper
              sx={{
                p: 3,
                bgcolor: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                boxShadow: "var(--shadow-card)",
                background: "linear-gradient(180deg, var(--panel) 0%, rgba(0,0,0,0.01) 100%)"
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <Info size={16} style={{ color: "var(--brand)" }} />
                <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "0.85rem" }}>
                  วิธีนำรูปภาพไปใส่ในเทมเพลต
                </Typography>
              </Stack>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.6 }}>
                1. อัปโหลดภาพ Banner หรือโลโก้งานของคุณ<br />
                2. เลือกภาพที่ต้องการแล้วกด **"คัดลอกลิงก์"**<br />
                3. นำโค้ด HTML ด้านล่างนี้ไปแปะในหน้าออกแบบจดหมาย:
              </Typography>
              
              <Box sx={{ position: "relative", mt: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#1e1e2e",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.72rem",
                    wordBreak: "break-all",
                    maxHeight: 120,
                    overflowY: "auto",
                    pr: 5,
                    lineHeight: 1.55,
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)"
                  }}
                >
                  <span style={{ color: "#f38ba8" }}>&lt;img</span>{" "}
                  <span style={{ color: "#fab387" }}>src</span>=<span style={{ color: "#a6e3a1" }}>"{images[0]?.url || "https://yourdomain.com/uploads/banner.png"}"</span>{" "}
                  <span style={{ color: "#fab387" }}>alt</span>=<span style={{ color: "#a6e3a1" }}>"Event Banner"</span>{" "}
                  <span style={{ color: "#fab387" }}>style</span>=<span style={{ color: "#a6e3a1" }}>"max-width:100%;height:auto;display:block;margin:0 auto;border-radius:8px;"</span>{" "}
                  <span style={{ color: "#f38ba8" }}>/&gt;</span>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => copyCodeToClipboard(mockHtmlCode)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: copiedCode ? "var(--success)" : "rgba(255,255,255,0.15)",
                    color: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    "&:hover": {
                      bgcolor: copiedCode ? "var(--success)" : "rgba(255,255,255,0.25)",
                    }
                  }}
                >
                  {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                </IconButton>
              </Box>
            </Paper>
          </Stack>

          {/* Right Column: Search Toolbar & Grid */}
          <Stack spacing={3} sx={{ width: "100%", minWidth: 0 }}>
            
            {/* Search toolbar */}
            <Paper
              sx={{
                p: 1.75,
                bgcolor: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <TextField
                placeholder="ค้นหารูปภาพตามชื่อไฟล์..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: "var(--muted)" }}>
                        <Search size={16} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={fieldSx()}
              />
            </Paper>

            {/* Format Filter Pills */}
            <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 0.5, "::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none" }}>
              {["ALL", "PNG", "JPG", "GIF", "SVG", "WEBP"].map((format) => {
                const isActive = selectedFormat === format;
                return (
                  <Button
                    key={format}
                    size="small"
                    onClick={() => setSelectedFormat(format)}
                    sx={{
                      textTransform: "none",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      borderRadius: "20px",
                      px: 2.25,
                      py: 0.5,
                      minWidth: "auto",
                      whiteSpace: "nowrap",
                      bgcolor: isActive ? "var(--brand)" : "rgba(0, 0, 0, 0.03)",
                      color: isActive ? "#fff" : "var(--muted)",
                      border: isActive ? "1px solid var(--brand)" : "1px solid var(--line)",
                      boxShadow: isActive ? "0 4px 10px rgba(14, 165, 233, 0.25)" : "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: isActive ? "var(--brand-hover)" : "rgba(0, 0, 0, 0.06)",
                        transform: "translateY(-1px)",
                      }
                    }}
                  >
                    {format === "ALL" ? "ทั้งหมด" : format}
                  </Button>
                );
              })}
            </Stack>

            {/* Images Grid */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 16 }}>
                <CircularProgress size={32} sx={{ color: "var(--brand)" }} />
              </Box>
            ) : filteredImages.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 14,
                  bgcolor: "var(--panel)",
                  border: "1.5px dashed var(--line)",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <FileImage size={42} style={{ color: "var(--muted)", opacity: 0.25 }} />
                <Box>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.88rem", fontWeight: 700 }}>
                    ไม่พบรูปภาพตามที่ระบุ
                  </Typography>
                  <Typography sx={{ color: "var(--muted-light)", fontSize: "0.78rem", mt: 0.5 }}>
                    {search ? "ลองค้นหาด้วยคำค้นอื่น หรือล้างตัวอักษรค้นหา" : "เริ่มอัปโหลดไฟล์รูปภาพแรกของคุณผ่านแผงควบคุม"}
                  </Typography>
                </Box>
                {search && (
                  <Button
                    size="small"
                    onClick={() => setSearch("")}
                    sx={{ textTransform: "none", color: "var(--brand)", fontWeight: 700 }}
                  >
                    ล้างการค้นหา
                  </Button>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                  gap: 3,
                }}
              >
                {filteredImages.map((img) => (
                  <Card
                    key={img.name}
                    sx={{
                      bgcolor: "var(--panel)",
                      border: "1px solid var(--line)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-card)",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.07)",
                        borderColor: "rgba(139,92,246,0.3)",
                        "& .mediaOverlay": { opacity: 1 },
                        "& .mediaThumb": { transform: "scale(1.04)" }
                      },
                    }}
                  >
                    {/* Thumbnail View with Cover zoom & Hover overlay */}
                    <Box
                      sx={{
                        height: 155,
                        width: "100%",
                        bgcolor: "rgba(0,0,0,0.015)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {/* Extension badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          zIndex: 10,
                          bgcolor: "rgba(15, 23, 42, 0.7)",
                          color: "#fff",
                          backdropFilter: "blur(6px)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "6px",
                          px: 1,
                          py: 0.25,
                          fontSize: "0.62rem",
                          fontWeight: 800,
                          letterSpacing: "0.05em",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                        }}
                      >
                        {(img.name.split('.').pop() || "IMG").toUpperCase()}
                      </Box>

                      <Box
                        className="mediaThumb"
                        sx={{
                          height: "100%",
                          width: "100%",
                          backgroundImage: `url(${img.url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                      
                      {/* Dark overlay on hover for better button visibility */}
                      <Box
                        className="mediaOverlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          bgcolor: "rgba(0,0,0,0.25)",
                          opacity: 0,
                          transition: "opacity 0.2s ease-in-out",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1.5,
                          zIndex: 5,
                        }}
                      >
                        <Tooltip title="ขยายรูปภาพ">
                          <IconButton
                            size="small"
                            onClick={() => setPreviewImage(img)}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.9)",
                              color: "var(--foreground)",
                              width: 34,
                              height: 34,
                              "&:hover": { bgcolor: "#fff", transform: "scale(1.08)" },
                              transition: "all 0.15s ease",
                            }}
                          >
                            <Eye size={14} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="เปิดลิงก์รูปภาพใหม่">
                          <IconButton
                            size="small"
                            href={img.url}
                            target="_blank"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.9)",
                              color: "var(--foreground)",
                              width: 34,
                              height: 34,
                              "&:hover": { bgcolor: "#fff", transform: "scale(1.08)" },
                              transition: "all 0.15s ease",
                            }}
                          >
                            <ExternalLink size={14} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Metadata Content */}
                    <CardContent sx={{ p: 2, pb: 1.75, flexGrow: 1 }}>
                      <Typography
                        noWrap
                        sx={{
                          color: "var(--foreground)",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          mb: 0.75,
                        }}
                        title={img.name}
                      >
                        {img.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", color: "var(--muted)", fontSize: "0.68rem" }}>
                        <Typography sx={{ fontSize: "inherit", color: "inherit", fontWeight: 600 }}>{formatBytes(img.size)}</Typography>
                        <Typography sx={{ fontSize: "inherit", color: "inherit" }}>{fmtDate(img.uploadedAt)}</Typography>
                      </Stack>
                    </CardContent>

                    <Divider sx={{ borderColor: "var(--line)" }} />

                    {/* Quick Action Footer */}
                    <CardActions sx={{ p: 1.5, py: 1.25, bgcolor: "rgba(0,0,0,0.005)" }}>
                      <Stack direction="row" spacing={0.75} sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                        <Stack direction="row" spacing={0.75}>
                          {/* Copy Link Button */}
                          <Button
                            size="small"
                            onClick={() => copyToClipboard(img.url, img.name)}
                            sx={{
                              textTransform: "none",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              color: copiedId === img.name ? "var(--success)" : "var(--brand)",
                              bgcolor: copiedId === img.name ? "rgba(16,185,129,0.06)" : "rgba(14,165,233,0.04)",
                              border: `1px solid ${copiedId === img.name ? "rgba(16,185,129,0.2)" : "rgba(14,165,233,0.15)"}`,
                              borderRadius: "6px",
                              px: 1.25,
                              py: 0.25,
                              transition: "all 0.15s ease",
                              "&:hover": {
                                bgcolor: copiedId === img.name ? "rgba(16,185,129,0.1)" : "rgba(14,165,233,0.1)",
                              },
                            }}
                          >
                            {copiedId === img.name ? "ลิงก์ ✓" : "คัดลอกลิงก์"}
                          </Button>

                          {/* Copy HTML Button */}
                          <Button
                            size="small"
                            onClick={() => copyHtmlToClipboard(img.url, img.name)}
                            sx={{
                              textTransform: "none",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              color: copiedHtmlId === img.name ? "var(--success)" : "var(--accent)",
                              bgcolor: copiedHtmlId === img.name ? "rgba(16,185,129,0.06)" : "rgba(139,92,246,0.04)",
                              border: `1px solid ${copiedHtmlId === img.name ? "rgba(16,185,129,0.2)" : "rgba(139,92,246,0.15)"}`,
                              borderRadius: "6px",
                              px: 1.25,
                              py: 0.25,
                              transition: "all 0.15s ease",
                              "&:hover": {
                                bgcolor: copiedHtmlId === img.name ? "rgba(16,185,129,0.1)" : "rgba(139,92,246,0.15)",
                              },
                            }}
                          >
                            {copiedHtmlId === img.name ? "HTML ✓" : "คัดลอก HTML"}
                          </Button>
                        </Stack>

                        <Tooltip title="ลบรูปภาพ">
                          <IconButton
                            size="small"
                            onClick={() => deleteImage(img.name)}
                            sx={{
                              color: "var(--muted)",
                              width: 28,
                              height: 28,
                              border: "1px solid transparent",
                              borderRadius: "6px",
                              transition: "all 0.15s ease",
                              "&:hover": {
                                color: "var(--danger)",
                                bgcolor: "var(--danger-bg)",
                                borderColor: "rgba(239,68,68,0.15)",
                              },
                            }}
                          >
                            <Trash2 size={13} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Box>

      {/* ── Delete Image Confirmation Dialog ── */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--panel-solid)",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              p: 1.5,
              maxWidth: 400,
              boxShadow: "var(--shadow-md)",
            },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
          <Box sx={{ width: 34, height: 34, borderRadius: "50%", bgcolor: "rgba(239,68,68,0.1)", display: "grid", placeItems: "center", color: "var(--danger)" }}>
            <Trash2 size={16} />
          </Box>
          <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "0.95rem" }}>ยืนยันลบรูปภาพ</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.5 }}>
            คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพ <strong>{deleteTarget}</strong>?
          </Typography>
          <Typography sx={{ color: "var(--danger)", fontSize: "0.78rem", mt: 0.75, fontWeight: 550 }}>
            ⚠️ คำเตือน: ลิงก์ที่เคยนำไปใช้ใน email template แคมเปญต่าง ๆ จะใช้งานไม่ได้อีกต่อไป
          </Typography>
        </DialogContent>
        <Divider sx={{ borderColor: "var(--line)" }} />
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button
            size="small"
            disabled={deleting}
            onClick={() => setDeleteTarget(null)}
            sx={{ color: "var(--muted)", textTransform: "none", border: "1px solid var(--line)", borderRadius: "8px", px: 2 }}
          >
            ยกเลิก
          </Button>
          <Button
            size="small"
            disabled={deleting}
            onClick={confirmDelete}
            variant="contained"
            startIcon={deleting ? <CircularProgress size={13} sx={{ color: "#fff" }} /> : <Trash2 size={13} />}
            sx={{
              bgcolor: deleting ? "#b91c1c" : "var(--danger)",
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#dc2626" },
              "&.Mui-disabled": { bgcolor: "#b91c1c", opacity: 0.85 },
              transition: "background-color 0.2s",
            }}
          >
            {deleting ? "กำลังลบ..." : "ลบเลย"}
          </Button>
        </Box>
      </Dialog>

      {/* ── Lightbox Image Preview Dialog ── */}
      <Dialog
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--panel-solid)",
              border: "1px solid var(--line)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)",
            },
          },
        }}
      >
        {previewImage && (
          <Box>
            {/* Modal Header */}
            <Stack direction="row" sx={{ p: 2, alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)" }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <FileImage size={18} style={{ color: "var(--brand)" }} />
                <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "0.95rem" }} noWrap>
                  {previewImage.name}
                </Typography>
              </Stack>
              <IconButton size="small" onClick={() => setPreviewImage(null)} sx={{ color: "var(--muted)" }}>
                <X size={16} />
              </IconButton>
            </Stack>

            {/* Modal Content */}
            <Box sx={{ p: 3, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: 3, bgcolor: "rgba(0,0,0,0.01)" }}>
              
              {/* Image Preview Container */}
              <Box
                sx={{
                  bgcolor: "#0f172a",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 300,
                  maxHeight: 500,
                  boxShadow: "inset 0 4px 20px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <img
                  src={previewImage.url}
                  alt={previewImage.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    objectFit: "contain",
                    display: "block"
                  }}
                />
              </Box>

              {/* Info & Copy Panel */}
              <Stack spacing={2.5} sx={{ justifyContent: "center" }}>
                <Box>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    ชื่อไฟล์ (Filename)
                  </Typography>
                  <Typography sx={{ color: "var(--foreground)", fontWeight: 750, fontSize: "0.9rem", mt: 0.5, wordBreak: "break-all" }}>
                    {previewImage.name}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={3}>
                  <Box>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      ขนาดไฟล์ (Size)
                    </Typography>
                    <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.85rem", mt: 0.5 }}>
                      {formatBytes(previewImage.size)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      วันที่อัปโหลด (Uploaded At)
                    </Typography>
                    <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.85rem", mt: 0.5 }}>
                      {fmtDate(previewImage.uploadedAt)}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ borderColor: "var(--line)" }} />

                <Stack spacing={1.5}>
                  {/* Copy URL */}
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={copiedId === previewImage.name ? <Check size={14} /> : <Copy size={14} />}
                    onClick={() => copyToClipboard(previewImage.url, previewImage.name)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      borderRadius: "8px",
                      py: 1,
                      color: copiedId === previewImage.name ? "var(--success)" : "var(--brand)",
                      borderColor: copiedId === previewImage.name ? "var(--success)" : "var(--brand)",
                      bgcolor: copiedId === previewImage.name ? "rgba(16,185,129,0.04)" : "transparent",
                      "&:hover": {
                        bgcolor: copiedId === previewImage.name ? "rgba(16,185,129,0.08)" : "rgba(14,165,233,0.04)",
                        borderColor: copiedId === previewImage.name ? "var(--success)" : "var(--brand-hover)",
                      }
                    }}
                  >
                    {copiedId === previewImage.name ? "คัดลอกลิงก์เรียบร้อย!" : "คัดลอกลิงก์รูปภาพเต็ม (Direct URL)"}
                  </Button>

                  {/* Copy HTML tag */}
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={copiedHtmlId === previewImage.name ? <Check size={14} /> : <Sparkles size={14} />}
                    onClick={() => copyHtmlToClipboard(previewImage.url, previewImage.name)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      borderRadius: "8px",
                      py: 1,
                      bgcolor: copiedHtmlId === previewImage.name ? "var(--success)" : "var(--brand)",
                      "&:hover": {
                        bgcolor: copiedHtmlId === previewImage.name ? "#059669" : "var(--brand-hover)",
                      }
                    }}
                  >
                    {copiedHtmlId === previewImage.name ? "คัดลอกโค้ด HTML เรียบร้อย!" : "คัดลอกโค้ด HTML (<img />)"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        )}
      </Dialog>
    </AppFrame>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fieldSx() {
  return {
    "& .MuiInputBase-root": {
      bgcolor: "rgba(0,0,0,0.015)",
      color: "var(--foreground)",
      fontSize: "0.82rem",
      borderRadius: "10px",
      transition: "all 0.15s ease",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(148,163,184,0.12)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(139,92,246,0.25)",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--brand)",
      borderWidth: 1.5,
    },
  };
}

function resizeAndCompressImage(file: File, maxDim: number = 1200, maxSize: number = 1 * 1024 * 1024): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }
    if (file.type.includes("svg")) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width <= maxDim && height <= maxDim && file.size <= maxSize) {
          resolve(file);
          return;
        }

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const outputMime = file.type === "image/png" ? "image/png" : "image/jpeg";
        const quality = 0.85;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const ext = outputMime === "image/png" ? ".png" : ".jpg";
              let baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
              const newName = baseName + ext;
              
              const resizedFile = new File([blob], newName, {
                type: outputMime,
                lastModified: Date.now(),
              });

              if (resizedFile.size > maxSize && outputMime === "image/png") {
                const jpegCanvas = document.createElement("canvas");
                jpegCanvas.width = width;
                jpegCanvas.height = height;
                const jpegCtx = jpegCanvas.getContext("2d");
                if (jpegCtx) {
                  jpegCtx.fillStyle = "#ffffff";
                  jpegCtx.fillRect(0, 0, width, height);
                  jpegCtx.drawImage(img, 0, 0, width, height);
                  jpegCanvas.toBlob(
                    (jpegBlob) => {
                      if (jpegBlob) {
                        const finalFile = new File([jpegBlob], baseName + ".jpg", {
                          type: "image/jpeg",
                          lastModified: Date.now(),
                        });
                        resolve(finalFile);
                      } else {
                        resolve(resizedFile);
                      }
                    },
                    "image/jpeg",
                    0.75
                  );
                } else {
                  resolve(resizedFile);
                }
              } else {
                resolve(resizedFile);
              }
            } else {
              resolve(file);
            }
          },
          outputMime,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
