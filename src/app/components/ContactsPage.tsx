"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogContent, DialogTitle,
  Divider, IconButton, Paper, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import {
  AlertCircle, Ban, BadgeCheck, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, ClipboardCheck, Download, ExternalLink,
  FileSpreadsheet, Globe2, Lock, LockOpen, Mail, MessageCircle, Pencil,
  Phone, Plus, Search, Send, Trash2, Upload, Users, X, SearchCheck,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type ContactEvent = {
  id: number | string;
  title: string;
  startsAt: string;
  source: string;
  category: string;
};

type Activity = {
  id: number;
  organizerId: number;
  type: string;
  text: string;
  createdAt: string;
};

type Contact = {
  id: number | string;
  companyName: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  facebook: string | null;
  outreachStatus: string;
  note: string | null;
  lockedFields: string[];
  events: ContactEvent[];
};

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { id: "NEW",            label: "มาใหม่",          color: "var(--brand)",   bg: "rgba(14,165,233,0.14)",  icon: BadgeCheck },
  { id: "NEEDS_REVIEW",   label: "ต้องเช็กข้อมูล",  color: "#a78bfa",        bg: "rgba(139,92,246,0.14)",  icon: SearchCheck },
  { id: "READY",          label: "น่าติดต่อ",        color: "var(--warning)", bg: "rgba(245,158,11,0.14)",  icon: ClipboardCheck },
  { id: "CONTACTED",      label: "ติดต่อแล้ว",       color: "var(--success)", bg: "rgba(16,185,129,0.14)",  icon: MessageCircle },
  { id: "PROPOSAL",       label: "ส่งข้อเสนอแล้ว",  color: "#38bdf8",        bg: "rgba(56,189,248,0.14)",  icon: Send },
  { id: "NOT_INTERESTED", label: "ไม่น่าสนใจ",       color: "var(--danger)",  bg: "rgba(239,68,68,0.14)",   icon: Ban },
];

const ACTIVITY_TYPES = [
  { id: "CALL",     label: "โทรศัพท์",   color: "var(--success)" },
  { id: "EMAIL",    label: "อีเมล",       color: "var(--brand)" },
  { id: "MEETING",  label: "ประชุม",      color: "#a78bfa" },
  { id: "PROPOSAL", label: "ส่งข้อเสนอ", color: "var(--warning)" },
  { id: "NOTE",     label: "หมายเหตุ",   color: "#f472b6" },
];

const ROWS = 15;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusMeta(id?: string | null) {
  return STATUS_OPTIONS.find((s) => s.id === id) ?? STATUS_OPTIONS[0];
}

function activityTypeMeta(id: string) {
  return ACTIVITY_TYPES.find((t) => t.id === id) ?? ACTIVITY_TYPES[4];
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "CO";
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("th-TH", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function paginationItems(page: number, total: number) {
  const visible = new Set([1, total, page - 1, page, page + 1].filter((n) => n >= 1 && n <= total));
  const items: (number | "…")[] = [];
  let prev = 0;
  Array.from(visible).sort((a, b) => a - b).forEach((n) => {
    if (prev && n - prev > 1) items.push("…");
    items.push(n);
    prev = n;
  });
  return items;
}

async function exportExcel(contacts: Contact[]) {
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = "EventSync";
  wb.created = new Date();

  const ws = wb.addWorksheet("Organizer Contacts", {
    views: [{ state: "frozen", ySplit: 4 }],
    pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1 },
  });

  ws.columns = [
    { width: 5  }, // #
    { width: 32 }, // บริษัท
    { width: 22 }, // ผู้ติดต่อ
    { width: 16 }, // เบอร์โทร
    { width: 28 }, // อีเมล
    { width: 24 }, // Website
    { width: 24 }, // Facebook
    { width: 16 }, // สถานะ
    { width: 7  }, // งาน
    { width: 42 }, // ชื่องาน
    { width: 36 }, // บันทึก
  ];

  const COLS = 11;
  const lastCol = String.fromCharCode(64 + COLS); // "K"

  // ── Row 1: Title ──────────────────────────────────────────────────────────
  ws.mergeCells(`A1:${lastCol}1`);
  const r1 = ws.getRow(1);
  r1.height = 34;
  const c1 = ws.getCell("A1");
  c1.value = "EventSync — Organizer Contacts";
  c1.font = { bold: true, size: 16, name: "Calibri", color: { argb: "FFFFFFFF" } };
  c1.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0C4A6E" } };
  c1.alignment = { vertical: "middle", horizontal: "left", indent: 1 };

  // ── Row 2: Export info ────────────────────────────────────────────────────
  ws.mergeCells(`A2:${lastCol}2`);
  const r2 = ws.getRow(2);
  r2.height = 18;
  const c2 = ws.getCell("A2");
  c2.value = `ส่งออกเมื่อ ${new Date().toLocaleDateString("th-TH", { day: "2-digit", month: "long", year: "numeric" })}   |   รวม ${contacts.length} บริษัท`;
  c2.font = { italic: true, size: 10, name: "Calibri", color: { argb: "FF64748B" } };
  c2.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } };
  c2.alignment = { vertical: "middle", horizontal: "left", indent: 1 };

  // ── Row 3: Accent line ────────────────────────────────────────────────────
  ws.mergeCells(`A3:${lastCol}3`);
  ws.getRow(3).height = 4;
  ws.getCell("A3").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0EA5E9" } };

  // ── Row 4: Column headers ─────────────────────────────────────────────────
  const HEADERS = ["#", "บริษัท", "ผู้ติดต่อ", "เบอร์โทร", "อีเมล", "Website", "Facebook", "สถานะ", "งาน", "ชื่องาน", "บันทึก"];
  const r4 = ws.getRow(4);
  r4.height = 22;
  HEADERS.forEach((h, i) => {
    const cell = r4.getCell(i + 1);
    cell.value = h;
    cell.font = { bold: true, size: 10, name: "Calibri", color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = { bottom: { style: "medium", color: { argb: "FF0EA5E9" } } };
  });
  r4.commit();

  // ── Status color map ──────────────────────────────────────────────────────
  const STATUS_COLOR: Record<string, string> = {
    NEW: "FF0EA5E9", NEEDS_REVIEW: "FF8B5CF6", READY: "FFF59E0B",
    CONTACTED: "FF10B981", PROPOSAL: "FF38BDF8", NOT_INTERESTED: "FFEF4444",
  };

  // ── Data rows ─────────────────────────────────────────────────────────────
  contacts.forEach((c, idx) => {
    const meta = statusMeta(c.outreachStatus);
    const row = ws.getRow(5 + idx);
    row.height = 18;

    const vals = [
      idx + 1,
      c.companyName,
      c.contactName ?? "",
      c.phone ?? "",
      c.email ?? "",
      c.website ?? "",
      c.facebook ?? "",
      meta.label,
      c.events.length,
      c.events.map((e) => e.title).join("  |  "),
      c.note ?? "",
    ];

    const bg = idx % 2 === 0 ? "FFFFFFFF" : "FFF0F9FF";

    vals.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
      cell.font = { size: 10, name: "Calibri" };
      cell.alignment = { vertical: "middle", wrapText: i === 10 };
      cell.border = { bottom: { style: "hair", color: { argb: "FFE2E8F0" } } };

      if (i === 0) { cell.alignment = { ...cell.alignment, horizontal: "center" }; cell.font = { ...cell.font, color: { argb: "FF94A3B8" } }; }
      if (i === 7) { cell.font = { size: 10, name: "Calibri", bold: true, color: { argb: STATUS_COLOR[c.outreachStatus] ?? "FF94A3B8" } }; }
      if (i === 8) { cell.alignment = { ...cell.alignment, horizontal: "center" }; cell.font = { ...cell.font, bold: true, color: { argb: "FF0EA5E9" } }; }
      if (i === 11 - 1) { cell.alignment = { ...cell.alignment, wrapText: true }; cell.font = { ...cell.font, color: { argb: "FF64748B" } }; }
    });
    row.commit();
  });

  // ── Auto-filter on header ─────────────────────────────────────────────────
  ws.autoFilter = { from: { row: 4, column: 1 }, to: { row: 4, column: COLS } };

  // ── Download ──────────────────────────────────────────────────────────────
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contacts_${new Date().toISOString().slice(0, 10)}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Edit Form ───────────────────────────────────────────────────────────────

type EditForm = { companyName: string; contactName: string; phone: string; email: string; website: string; facebook: string; note: string };
type LockableField = "companyName" | "contactName" | "phone" | "email" | "website" | "facebook";
const LOCKABLE_FIELDS: LockableField[] = ["companyName", "contactName", "phone", "email", "website", "facebook"];

function fieldSx() {
  return {
    "& .MuiInputBase-root": { bgcolor: "rgba(0,0,0,0.03)", color: "var(--foreground)", fontSize: "0.82rem", borderRadius: "8px" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(148,163,184,0.2)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(56,189,248,0.4)" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--brand)", borderWidth: 1 },
    "& .MuiInputLabel-root": { color: "var(--muted)", fontSize: "0.78rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "var(--brand)" },
  };
}

// ─── Create Contact Dialog ───────────────────────────────────────────────────

type CreateForm = { companyName: string; contactName: string; phone: string; email: string; website: string; facebook: string; note: string };
const EMPTY_FORM: CreateForm = { companyName: "", contactName: "", phone: "", email: "", website: "", facebook: "", note: "" };

function CreateContactDialog({ open, onClose, onCreated }: {
  open: boolean;
  onClose: () => void;
  onCreated: (c: Contact) => void;
}) {
  const [form, setForm] = useState<CreateForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { if (open) { setForm(EMPTY_FORM); setErr(""); } }, [open]);

  function set(field: keyof CreateForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function save() {
    if (!form.companyName.trim()) { setErr("กรุณากรอกชื่อบริษัท"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      onCreated(data.contact);
      onClose();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  }

  const fields: { key: keyof CreateForm; label: string; required?: boolean; multiline?: boolean; rows?: number }[] = [
    { key: "companyName",  label: "ชื่อบริษัท / องค์กร *", required: true },
    { key: "contactName",  label: "ชื่อผู้ติดต่อ" },
    { key: "phone",        label: "เบอร์โทร" },
    { key: "email",        label: "อีเมล" },
    { key: "website",      label: "เว็บไซต์" },
    { key: "facebook",     label: "Facebook URL" },
    { key: "note",         label: "บันทึก", multiline: true, rows: 3 },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid var(--line)", borderRadius: "12px" } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Plus size={16} style={{ color: "var(--brand)" }} />
          <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem" }}>เพิ่ม Contact ใหม่</Typography>
        </Stack>
        <IconButton size="small" onClick={onClose} sx={{ color: "var(--muted)" }}><X size={15} /></IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          {err && (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", p: 1.25, borderRadius: "8px", bgcolor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
              <AlertCircle size={13} style={{ color: "var(--danger)", flexShrink: 0 }} />
              <Typography sx={{ color: "var(--danger)", fontSize: "0.8rem" }}>{err}</Typography>
            </Stack>
          )}
          {fields.map((f) => (
            <TextField key={f.key} label={f.label} value={form[f.key]} size="small" fullWidth
              multiline={f.multiline} rows={f.rows}
              onChange={(e) => set(f.key, e.target.value)} sx={fieldSx()} />
          ))}
        </Stack>
      </DialogContent>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button size="small" onClick={onClose} sx={{ color: "var(--muted)", textTransform: "none" }}>ยกเลิก</Button>
        <Button size="small" variant="contained" disabled={saving} onClick={save}
          sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, px: 2.5, "&:hover": { bgcolor: "var(--brand-hover)" } }}>
          {saving ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
      </Box>
    </Dialog>
  );
}

// ─── Import Excel Dialog ──────────────────────────────────────────────────────

type ImportRow = { companyName: string; contactName: string; phone: string; email: string; website: string; facebook: string; note: string };

const COL_MAP: Record<string, keyof ImportRow> = {
  "ชื่อบริษัท": "companyName", "บริษัท": "companyName", "company": "companyName", "companyname": "companyName", "องค์กร": "companyName",
  "ชื่อผู้ติดต่อ": "contactName", "ผู้ติดต่อ": "contactName", "contact": "contactName", "contactname": "contactName",
  "เบอร์โทร": "phone", "เบอร์": "phone", "โทร": "phone", "phone": "phone", "tel": "phone",
  "อีเมล": "email", "email": "email", "e-mail": "email",
  "เว็บไซต์": "website", "เว็บ": "website", "website": "website", "web": "website",
  "facebook": "facebook", "เฟสบุ๊ค": "facebook", "fb": "facebook",
  "บันทึก": "note", "note": "note", "หมายเหตุ": "note",
};

function ImportExcelDialog({ open, onClose, onImported }: {
  open: boolean;
  onClose: () => void;
  onImported: () => void;
}) {
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ created: number; skipped: number } | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => { if (open) { setRows([]); setResult(null); setErr(""); } }, [open]);

  async function parseFile(file: File) {
    setParsing(true);
    setErr("");
    try {
      const ExcelJS = (await import("exceljs")).default;
      const wb = new ExcelJS.Workbook();
      const buf = await file.arrayBuffer();
      await wb.xlsx.load(buf);
      const ws = wb.worksheets[0];
      if (!ws) throw new Error("ไม่พบ sheet ใน Excel");

      const headerRow = ws.getRow(1);
      const colMap: Record<number, keyof ImportRow> = {};
      headerRow.eachCell((cell, col) => {
        const key = String(cell.value ?? "").trim().toLowerCase();
        const mapped = COL_MAP[key];
        if (mapped) colMap[col] = mapped;
      });

      const parsed: ImportRow[] = [];
      ws.eachRow((row, i) => {
        if (i === 1) return;
        const obj: ImportRow = { companyName: "", contactName: "", phone: "", email: "", website: "", facebook: "", note: "" };
        row.eachCell((cell, col) => {
          const field = colMap[col];
          if (field) obj[field] = String(cell.value ?? "").trim();
        });
        if (obj.companyName) parsed.push(obj);
      });

      if (parsed.length === 0) throw new Error("ไม่พบข้อมูล — ตรวจสอบชื่อ column header");
      setRows(parsed);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "อ่านไฟล์ไม่ได้");
    } finally {
      setParsing(false);
    }
  }

  async function doImport() {
    setImporting(true);
    try {
      const res = await fetch("/api/contacts/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setResult({ created: data.created, skipped: data.skipped });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Import ล้มเหลว");
    } finally {
      setImporting(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid var(--line)", borderRadius: "12px" } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <FileSpreadsheet size={16} style={{ color: "var(--success)" }} />
          <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem" }}>Import จาก Excel</Typography>
        </Stack>
        <IconButton size="small" onClick={onClose} sx={{ color: "var(--muted)" }}><X size={15} /></IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <DialogContent sx={{ pt: 2 }}>
        {result ? (
          <Stack sx={{ alignItems: "center", py: 3, gap: 2 }}>
            <CheckCircle2 size={44} style={{ color: "var(--success)" }} />
            <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "1rem" }}>Import เสร็จแล้ว!</Typography>
            <Stack direction="row" spacing={2}>
              <Chip label={`✓ เพิ่มใหม่ ${result.created} รายการ`} sx={{ bgcolor: "rgba(16,185,129,0.12)", color: "var(--success)", fontWeight: 600 }} />
              {result.skipped > 0 && <Chip label={`ข้าม ${result.skipped} ซ้ำ`} sx={{ bgcolor: "rgba(148,163,184,0.1)", color: "var(--muted)", fontWeight: 600 }} />}
            </Stack>
            <Button size="small" variant="contained" onClick={() => { onImported(); onClose(); }}
              sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, px: 3, "&:hover": { bgcolor: "var(--brand-hover)" } }}>
              ปิดและดูรายชื่อ
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2.5}>
            {/* Format hint */}
            <Box sx={{ p: 1.5, borderRadius: "8px", bgcolor: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.2)" }}>
              <Typography sx={{ color: "var(--brand)", fontSize: "0.75rem", fontWeight: 600, mb: 0.5 }}>Column ที่รองรับ (Row 1 = Header)</Typography>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", lineHeight: 1.7 }}>
                ชื่อบริษัท* · ชื่อผู้ติดต่อ · เบอร์โทร · อีเมล · เว็บไซต์ · Facebook · บันทึก<br/>
                <span style={{ opacity: 0.7 }}>หรือ: companyName · contactName · phone · email · website · facebook · note</span>
              </Typography>
            </Box>

            {/* Upload zone */}
            {rows.length === 0 && (
              <Box component="label" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, p: 3, borderRadius: "10px", border: "1.5px dashed rgba(148,163,184,0.35)", bgcolor: "rgba(0,0,0,0.03)", cursor: "pointer", "&:hover": { borderColor: "var(--brand)", bgcolor: "rgba(14,165,233,0.04)" }, transition: "all 0.15s" }}>
                <input type="file" hidden accept=".xlsx,.xls" onChange={(e) => { const f = e.target.files?.[0]; if (f) parseFile(f); }} />
                {parsing ? <Typography sx={{ color: "var(--muted)", fontSize: "0.85rem" }}>กำลังอ่านไฟล์...</Typography> : (
                  <>
                    <Upload size={28} style={{ color: "var(--muted)", opacity: 0.5 }} />
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.85rem" }}>คลิกหรือลาก .xlsx / .xls มาวาง</Typography>
                  </>
                )}
              </Box>
            )}

            {err && (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", p: 1.25, borderRadius: "8px", bgcolor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <AlertCircle size={13} style={{ color: "var(--danger)", flexShrink: 0 }} />
                <Typography sx={{ color: "var(--danger)", fontSize: "0.8rem" }}>{err}</Typography>
              </Stack>
            )}

            {/* Preview table */}
            {rows.length > 0 && (
              <>
                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 600 }}>
                    พบ {rows.length} รายการ — ตัวอย่าง 5 แถวแรก
                  </Typography>
                  <Button size="small" onClick={() => setRows([])} sx={{ color: "var(--muted)", textTransform: "none", fontSize: "0.75rem" }}>
                    เลือกไฟล์ใหม่
                  </Button>
                </Stack>
                <TableContainer component={Paper} sx={{ bgcolor: "rgba(0,0,0,0.02)", border: "1px solid var(--line)", borderRadius: "8px", maxHeight: 260 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        {["ชื่อบริษัท", "ผู้ติดต่อ", "เบอร์", "อีเมล", "เว็บ"].map((h) => (
                          <TableCell key={h} sx={{ bgcolor: "rgba(0,0,0,0.04)", color: "var(--foreground)", fontSize: "0.7rem", fontWeight: 700, borderColor: "var(--line)", py: 0.75 }}>{h}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(0, 5).map((r, i) => (
                        <TableRow key={i} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.03)" } }}>
                          {[r.companyName, r.contactName, r.phone, r.email, r.website].map((v, j) => (
                            <TableCell key={j} sx={{ color: v ? "var(--foreground)" : "var(--muted-light)", fontSize: "0.75rem", borderColor: "var(--line)", py: 0.75, maxWidth: 160 }}>
                              <Typography noWrap sx={{ fontSize: "inherit", color: "inherit" }}>{v || "—"}</Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Stack>
        )}
      </DialogContent>
      {!result && rows.length > 0 && (
        <>
          <Divider sx={{ borderColor: "var(--line)" }} />
          <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button size="small" onClick={onClose} sx={{ color: "var(--muted)", textTransform: "none" }}>ยกเลิก</Button>
            <Button size="small" variant="contained" disabled={importing} onClick={doImport}
              sx={{ bgcolor: "var(--success)", textTransform: "none", fontWeight: 600, px: 2.5, "&:hover": { bgcolor: "#059669" } }}>
              {importing ? "กำลัง Import..." : `Import ${rows.length} รายการ`}
            </Button>
          </Box>
        </>
      )}
    </Dialog>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactsPage() {
  const [contacts, setContacts]         = useState<Contact[]>([]);
  const [loading, setLoading]           = useState(true);
  const [dataSource, setDataSource]     = useState("");
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage]                 = useState(1);

  // Create / Import dialogs
  const [createOpen, setCreateOpen]     = useState(false);
  const [importOpen, setImportOpen]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [deleting, setDeleting]         = useState(false);

  // Dialog state
  const [viewContact, setViewContact]   = useState<Contact | null>(null);
  const [dialogMode, setDialogMode]     = useState<"view" | "edit">("view");
  const [editForm, setEditForm]         = useState<EditForm>({ companyName: "", contactName: "", phone: "", email: "", website: "", facebook: "", note: "" });
  const [editLocked, setEditLocked]     = useState<Set<LockableField>>(new Set());
  const [saving, setSaving]             = useState(false);

  // Activity log state
  const [activities, setActivities]     = useState<Activity[]>([]);
  const [actType, setActType]           = useState("CALL");
  const [actText, setActText]           = useState("");
  const [addingAct, setAddingAct]       = useState(false);

  // ── Data fetch ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((d) => { setContacts(d.contacts ?? []); setDataSource(d.source ?? ""); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadActivities = useCallback((id: number | string) => {
    if (typeof id !== "number") { setActivities([]); return; }
    fetch(`/api/contacts/${id}/activities`)
      .then((r) => r.json())
      .then((d) => setActivities(d.activities ?? []))
      .catch(() => setActivities([]));
  }, []);

  // ── Filtered / paged contacts ───────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts.filter((c) => {
      const matchQ = !q || c.companyName.toLowerCase().includes(q) || (c.contactName ?? "").toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q) || (c.phone ?? "").includes(q);
      return matchQ && (statusFilter === "all" || c.outreachStatus === statusFilter);
    });
  }, [contacts, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS));
  const paged      = filtered.slice((page - 1) * ROWS, page * ROWS);
  const firstItem  = filtered.length === 0 ? 0 : (page - 1) * ROWS + 1;
  const lastItem   = Math.min(page * ROWS, filtered.length);
  const pgItems    = paginationItems(page, totalPages);

  // ── Open dialogs ────────────────────────────────────────────────────────
  function openView(c: Contact) {
    setViewContact(c);
    setDialogMode("view");
    loadActivities(c.id);
  }

  function openEdit(c: Contact) {
    setViewContact(c);
    setDialogMode("edit");
    setEditForm({ companyName: c.companyName, contactName: c.contactName ?? "", phone: c.phone ?? "", email: c.email ?? "", website: c.website ?? "", facebook: c.facebook ?? "", note: c.note ?? "" });
    setEditLocked(new Set((c.lockedFields ?? []) as LockableField[]));
  }

  function toggleLock(field: LockableField) {
    setEditLocked((prev) => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field); else next.add(field);
      return next;
    });
  }

  function closeDialog() { setViewContact(null); setActivities([]); setActText(""); }

  // ── Status change ───────────────────────────────────────────────────────
  async function changeStatus(id: number | string, status: string) {
    if (typeof id !== "number") return;
    const res = await fetch("/api/contacts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, outreachStatus: status }) });
    if (!res.ok) return;
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, outreachStatus: status } : c));
    setViewContact((prev) => prev?.id === id ? { ...prev, outreachStatus: status } : prev);
  }

  // ── Save edits ──────────────────────────────────────────────────────────
  async function saveEdit() {
    if (!viewContact || typeof viewContact.id !== "number") return;
    setSaving(true);
    const res = await fetch("/api/contacts", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: viewContact.id, ...editForm, lockedFields: Array.from(editLocked) }),
    });
    setSaving(false);
    if (!res.ok) return;
    const newLocked = Array.from(editLocked);
    const updated: Contact = { ...viewContact, ...editForm, contactName: editForm.contactName || null, phone: editForm.phone || null, email: editForm.email || null, website: editForm.website || null, facebook: editForm.facebook || null, note: editForm.note || null, lockedFields: newLocked };
    setContacts((prev) => prev.map((c) => c.id === viewContact.id ? updated : c));
    setViewContact(updated);
    setDialogMode("view");
  }


  // ── Delete contact ──────────────────────────────────────────────────────
  async function confirmDelete() {
    if (!deleteTarget || typeof deleteTarget.id !== "number") return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/contacts/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) return;
      setContacts((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      if (viewContact?.id === deleteTarget.id) { setViewContact(null); setActivities([]); }
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  // ── Add activity ────────────────────────────────────────────────────────
  async function addActivity() {
    if (!viewContact || typeof viewContact.id !== "number" || !actText.trim()) return;
    setAddingAct(true);
    const res = await fetch(`/api/contacts/${viewContact.id}/activities`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: actType, text: actText.trim() }) });
    setAddingAct(false);
    if (!res.ok) return;
    const { activity } = await res.json();
    setActivities((prev) => [activity, ...prev]);
    setActText("");
  }

  // ── Delete activity ─────────────────────────────────────────────────────
  async function deleteActivity(activityId: number) {
    if (!viewContact || typeof viewContact.id !== "number") return;
    const res = await fetch(`/api/contacts/${viewContact.id}/activities/${activityId}`, { method: "DELETE" });
    if (!res.ok) return;
    setActivities((prev) => prev.filter((a) => a.id !== activityId));
  }

  const isReadOnly = typeof viewContact?.id !== "number";

  // ─── JSX ─────────────────────────────────────────────────────────────────
  return (
    <Box className="dashboardPage">

      {/* ── Header ── */}
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 1, flexWrap: "wrap", gap: 1.5 }}>
        <Box>
          <Typography component="h1" sx={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--foreground)" }}>Organizer Contacts</Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "var(--muted)", mt: 0.25 }}>บริษัทผู้จัดงานทั้งหมด — ติดตามการเสนอขายบริการ event / LED display</Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 0.75 }}>
          {dataSource === "events_fallback" && (
            <Chip label="ยังไม่ได้ Sync DB" sx={{ fontSize: "0.7rem", height: 22, bgcolor: "rgba(245,158,11,0.1)", color: "var(--warning)", border: "1px solid rgba(245,158,11,0.2)", fontWeight: 600 }} />
          )}
          <Chip label={`${contacts.length} บริษัท`} icon={<Users size={11} />} sx={{ fontSize: "0.7rem", height: 22, bgcolor: "rgba(14,165,233,0.12)", color: "var(--brand)", border: "1px solid rgba(14,165,233,0.2)", "& .MuiChip-icon": { color: "inherit" }, fontWeight: 600 }} />
          <Button
            size="small"
            startIcon={<Download size={13} />}
            onClick={() => exportExcel(filtered)}
            sx={{ textTransform: "none", fontSize: "0.76rem", fontWeight: 600, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "8px", px: 1.5, "&:hover": { color: "var(--foreground)", bgcolor: "rgba(0,0,0,0.06)", borderColor: "rgba(0,0,0,0.15)" } }}
          >
            Export Excel
          </Button>
          <Button
            size="small"
            startIcon={<FileSpreadsheet size={13} />}
            onClick={() => setImportOpen(true)}
            sx={{ textTransform: "none", fontSize: "0.76rem", fontWeight: 600, color: "var(--success)", border: "1px solid rgba(16,185,129,0.35)", borderRadius: "8px", px: 1.5, "&:hover": { bgcolor: "rgba(16,185,129,0.08)", borderColor: "var(--success)" } }}
          >
            Import Excel
          </Button>
          <Button
            size="small"
            startIcon={<Plus size={13} />}
            onClick={() => setCreateOpen(true)}
            variant="contained"
            sx={{ textTransform: "none", fontSize: "0.76rem", fontWeight: 600, bgcolor: "var(--brand)", borderRadius: "8px", px: 1.5, "&:hover": { bgcolor: "var(--brand-hover)" } }}
          >
            เพิ่ม Contact
          </Button>
        </Stack>
      </Stack>

      {/* ── Search + Filter Bar ── */}
      <Paper elevation={0} sx={{ border: "1px solid var(--line)", borderRadius: "8px", bgcolor: "rgba(0,0,0,0.03)", p: 1.5, mb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flex: 1, minWidth: 200, border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", px: 1.25, py: 0.6, bgcolor: "rgba(0,0,0,0.04)" }}>
            <Search size={13} color="var(--muted)" />
            <Box component="input" placeholder="ค้นหาบริษัท ชื่อ อีเมล เบอร์..." value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
              sx={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--foreground)", fontSize: "0.82rem", fontFamily: "inherit", "&::placeholder": { color: "var(--muted-light)" } }} />
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", rowGap: 0.5 }}>
            {[{ id: "all", label: "ทั้งหมด", color: "var(--brand)", bg: "rgba(14,165,233,0.14)" }, ...STATUS_OPTIONS].map((s) => (
              <Button key={s.id} size="small" onClick={() => { setStatusFilter(s.id); setPage(1); }}
                sx={{ textTransform: "none", fontSize: "0.72rem", px: 1.25, py: 0.4, borderRadius: "6px", bgcolor: statusFilter === s.id ? s.bg : "transparent", color: statusFilter === s.id ? s.color : "var(--muted)", border: `1px solid ${statusFilter === s.id ? s.color + "44" : "transparent"}`, fontWeight: statusFilter === s.id ? 700 : 500, "&:hover": { bgcolor: s.bg, color: s.color } }}>
                {s.label}
              </Button>
            ))}
          </Stack>
          <Typography sx={{ color: "var(--muted-light)", fontSize: "0.72rem", fontWeight: 600, ml: { sm: "auto" } }}>{filtered.length} รายการ</Typography>
        </Stack>
      </Paper>

      {/* ── Contacts Table ── */}
      <Paper className="dashboardCard ordersCard" elevation={0}>
        <Stack direction="row" className="cardTitleRow" sx={{ mb: 2 }}>
          <Typography component="h2" className="cardTitle">รายชื่อบริษัทผู้จัดงาน</Typography>
        </Stack>
        <TableContainer>
          <Table size="small" aria-label="organizer contacts">
            <TableHead>
              <TableRow>
                <TableCell>บริษัท / ผู้ติดต่อ</TableCell>
                <TableCell>เบอร์โทร / อีเมล</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>งาน</TableCell>
                <TableCell>สถานะ</TableCell>
                <TableCell align="right" sx={{ width: 80 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 8 }}><Typography sx={{ color: "var(--muted)", fontSize: "0.85rem" }}>กำลังโหลด...</Typography></TableCell></TableRow>
              ) : paged.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                    {contacts.length === 0 ? "ยังไม่มี contacts — กด Sync ใน Calendar Sync Hub ก่อน" : "ไม่พบรายการที่ตรงกับการค้นหา"}
                  </Typography>
                </TableCell></TableRow>
              ) : paged.map((c) => {
                const meta = statusMeta(c.outreachStatus);
                return (
                  <TableRow key={c.id} hover onClick={() => openView(c)} sx={{ cursor: "pointer" }}>
                    <TableCell sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Avatar sx={{ width: 34, height: 34, fontSize: "0.72rem", fontWeight: 800, borderRadius: "10px", background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)", border: "1px solid rgba(14,165,233,0.2)", flexShrink: 0 }}>{initials(c.companyName)}</Avatar>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography className="tablePrimary" sx={{ mb: 0.15 }}>{c.companyName}</Typography>
                          {c.contactName && <Typography className="tableSecondary">{c.contactName}</Typography>}
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.4}>
                        {c.phone && <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}><Phone size={12} color="var(--success)" /><Typography sx={{ color: "var(--foreground)", fontSize: "0.78rem" }}>{c.phone}</Typography></Stack>}
                        {c.email && <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}><Mail size={12} color="var(--brand)" /><Typography component="a" href={`mailto:${c.email}`} onClick={(e) => e.stopPropagation()} sx={{ color: "var(--brand)", fontSize: "0.82rem", "&:hover": { textDecoration: "underline" } }}>{c.email}</Typography></Stack>}
                        {!c.phone && !c.email && <Typography sx={{ color: "var(--muted-light)", fontSize: "0.82rem" }}>—</Typography>}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {c.website ? (
                        <Typography component="a" href={c.website.startsWith("http") ? c.website : `https://${c.website}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} sx={{ color: "var(--brand)", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { textDecoration: "underline" } }}>
                          <Globe2 size={12} />{c.website.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0]}
                        </Typography>
                      ) : <Typography sx={{ color: "var(--muted-light)", fontSize: "0.82rem" }}>—</Typography>}
                    </TableCell>
                    <TableCell>
                      <Chip label={c.events.length} icon={<CalendarDays size={10} />} size="small" sx={{ height: 20, fontSize: "0.7rem", fontWeight: 700, bgcolor: "rgba(14,165,233,0.1)", color: "var(--brand)", border: "1px solid rgba(14,165,233,0.2)", "& .MuiChip-icon": { color: "inherit" } }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={meta.label} size="small" className="statusPill" sx={{ color: `${meta.color} !important`, bgcolor: `${meta.bg} !important`, border: `1px solid ${meta.color}33 !important` }} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: "flex-end" }}>
                        <IconButton size="small" aria-label="ดูรายละเอียด" onClick={(e) => { e.stopPropagation(); openView(c); }}
                          sx={{ width: 28, height: 28, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "7px", "&:hover": { color: "#fff", bgcolor: "rgba(14,165,233,0.12)", borderColor: "rgba(14,165,233,0.3)" } }}>
                          <ExternalLink size={12} />
                        </IconButton>
                        <IconButton size="small" aria-label="แก้ไขข้อมูล" onClick={(e) => { e.stopPropagation(); openEdit(c); }}
                          sx={{ width: 28, height: 28, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "7px", "&:hover": { color: "#fff", bgcolor: "rgba(139,92,246,0.12)", borderColor: "rgba(139,92,246,0.3)" } }}>
                          <Pencil size={12} />
                        </IconButton>
                        <IconButton size="small" aria-label="ลบ" onClick={(e) => { e.stopPropagation(); setDeleteTarget(c); }}
                          sx={{ width: 28, height: 28, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "7px", "&:hover": { color: "#fff", bgcolor: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.4)" } }}>
                          <Trash2 size={12} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" className="tableFooter" sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "0.78rem", fontWeight: 600 }}>Showing {firstItem}–{lastItem} of {filtered.length}</Typography>
          <Stack direction="row" className="paginationControls">
            <IconButton size="small" className="paginationIcon" disabled={page === 1} onClick={() => setPage(1)}><ChevronsLeft size={14} /></IconButton>
            <IconButton size="small" className="paginationIcon" disabled={page === 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={14} /></IconButton>
            <Stack direction="row" className="paginationPages">
              {pgItems.map((item, idx) => item === "…" ? (
                <Box key={`e${idx}`} component="span" className="paginationEllipsis">...</Box>
              ) : (
                <Button key={item} size="small" className={item === page ? "paginationPage paginationPageActive" : "paginationPage"} onClick={() => setPage(item as number)}>{item}</Button>
              ))}
            </Stack>
            <IconButton size="small" className="paginationIcon" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight size={14} /></IconButton>
            <IconButton size="small" className="paginationIcon" disabled={page === totalPages} onClick={() => setPage(totalPages)}><ChevronsRight size={14} /></IconButton>
          </Stack>
        </Stack>
      </Paper>

      {/* ── Detail / Edit Dialog ── */}
      <Dialog open={Boolean(viewContact)} onClose={closeDialog} fullWidth maxWidth="lg"
        slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", color: "var(--foreground)", border: "1px solid var(--line)", borderRadius: "8px", boxShadow: "var(--shadow-md)", overflow: "hidden" } } }}>
        {viewContact && (
          <>
            {/* Dialog Header */}
            <DialogTitle sx={{ p: 0 }}>
              <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between", gap: 2, p: 2.5, borderBottom: "1px solid var(--line)", bgcolor: "rgba(0,0,0,0.02)" }}>
                <Stack direction="row" spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
                  <Avatar sx={{ width: 42, height: 42, fontSize: "0.85rem", fontWeight: 800, borderRadius: "12px", background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)", border: "1px solid rgba(14,165,233,0.25)", flexShrink: 0 }}>
                    {initials(viewContact.companyName)}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography component="h2" sx={{ color: "var(--foreground)", fontSize: "1rem", fontWeight: 800, lineHeight: 1.3 }}>{viewContact.companyName}</Typography>
                    {viewContact.contactName && <Typography sx={{ color: "var(--muted)", fontSize: "0.88rem", mt: 0.2 }}>{viewContact.contactName}</Typography>}
                    <Stack direction="row" spacing={0.75} sx={{ mt: 0.75, flexWrap: "wrap", rowGap: 0.5 }}>
                      <Chip label={statusMeta(viewContact.outreachStatus).label} size="small" className="statusPill"
                        sx={{ color: `${statusMeta(viewContact.outreachStatus).color} !important`, bgcolor: `${statusMeta(viewContact.outreachStatus).bg} !important`, border: `1px solid ${statusMeta(viewContact.outreachStatus).color}33 !important` }} />
                      <Chip label={`${viewContact.events.length} งาน`} size="small" icon={<CalendarDays size={10} />}
                        sx={{ height: 22, fontSize: "0.75rem", fontWeight: 700, bgcolor: "rgba(14,165,233,0.1)", color: "var(--brand)", border: "1px solid rgba(14,165,233,0.2)", "& .MuiChip-icon": { color: "inherit" } }} />
                    </Stack>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexShrink: 0 }}>
                  {!isReadOnly && dialogMode === "view" && (
                    <>
                      <Button size="small" startIcon={<Pencil size={13} />} onClick={() => openEdit(viewContact)}
                        sx={{ textTransform: "none", fontSize: "0.82rem", fontWeight: 600, color: "#fff", bgcolor: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "8px", px: 1.5, "&:hover": { bgcolor: "rgba(139,92,246,0.35)" } }}>
                        แก้ไขข้อมูล
                      </Button>
                      <IconButton size="small" onClick={() => setDeleteTarget(viewContact)}
                        sx={{ width: 32, height: 32, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "8px", "&:hover": { color: "var(--danger)", bgcolor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.4)" } }}>
                        <Trash2 size={14} />
                      </IconButton>
                    </>
                  )}
                  <IconButton onClick={closeDialog} sx={{ width: 34, height: 34, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "8px", "&:hover": { color: "var(--foreground)", bgcolor: "rgba(0,0,0,0.06)" } }}>
                    <X size={16} />
                  </IconButton>
                </Stack>
              </Stack>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              {dialogMode === "edit" ? (
                /* ── Edit Mode ── */
                <Box sx={{ p: 2.5 }}>
                  {/* Lock legend */}
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2, p: 1.25, borderRadius: "8px", bgcolor: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)" }}>
                    <Lock size={13} color="var(--warning)" />
                    <Typography sx={{ fontSize: "0.82rem", color: "var(--warning)", fontWeight: 600 }}>
                      Field ที่ล็อคอยู่ (🔒) จะ<strong>ไม่ถูก Sync ทับ</strong> — คลิกไอคอนเพื่อสลับ lock/unlock
                    </Typography>
                  </Stack>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                    {([
                      { field: "companyName" as LockableField, label: "ชื่อบริษัท *", required: true },
                      { field: "contactName" as LockableField, label: "ชื่อผู้ติดต่อ" },
                      { field: "phone" as LockableField, label: "เบอร์โทรศัพท์" },
                      { field: "email" as LockableField, label: "อีเมล" },
                      { field: "website" as LockableField, label: "Website" },
                      { field: "facebook" as LockableField, label: "Facebook" },
                    ] as { field: LockableField; label: string; required?: boolean }[]).map(({ field, label, required }) => {
                      const isLocked = editLocked.has(field);
                      return (
                        <TextField
                          key={field}
                          label={label}
                          value={editForm[field]}
                          onChange={(e) => setEditForm((f) => ({ ...f, [field]: e.target.value }))}
                          size="small" fullWidth
                          slotProps={{
                            input: {
                              endAdornment: (
                                <IconButton size="small" onClick={() => toggleLock(field)} tabIndex={-1}
                                  sx={{ mr: -0.5, color: isLocked ? "var(--warning)" : "var(--muted)", "&:hover": { color: isLocked ? "#fbbf24" : "var(--foreground)" } }}>
                                  {isLocked ? <Lock size={14} /> : <LockOpen size={14} />}
                                </IconButton>
                              ),
                            },
                          }}
                          sx={{
                            ...fieldSx(),
                            ...(isLocked ? { "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245,158,11,0.4) !important" } } : {}),
                          }}
                        />
                      );
                    })}
                    <TextField label="บันทึก / หมายเหตุ" value={editForm.note} onChange={(e) => setEditForm((f) => ({ ...f, note: e.target.value }))} size="small" multiline rows={3} fullWidth sx={{ ...fieldSx(), gridColumn: "1 / -1" }} />
                    <Stack direction="row" spacing={1} sx={{ gridColumn: "1 / -1", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>
                        🔒 {editLocked.size} field ถูกล็อค — Sync จะ skip field เหล่านี้
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Button onClick={() => setDialogMode("view")} sx={{ textTransform: "none", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "0.88rem", px: 2, "&:hover": { color: "var(--foreground)", bgcolor: "rgba(0,0,0,0.06)" } }}>ยกเลิก</Button>
                        <Button onClick={saveEdit} disabled={saving || !editForm.companyName.trim()}
                          sx={{ textTransform: "none", color: "#fff", bgcolor: "var(--brand)", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 600, px: 2.5, "&:hover": { bgcolor: "var(--brand-hover)" }, "&.Mui-disabled": { bgcolor: "rgba(14,165,233,0.4)", color: "rgba(255,255,255,0.5)" } }}>
                          {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              ) : (
                /* ── View Mode ── */
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>

                  {/* Col 1: Contact info + Status */}
                  <Stack spacing={2.25} sx={{ p: 2.5, borderRight: { md: "1px solid var(--line)" } }}>
                    <Box>
                      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.25 }}>
                        <Typography sx={{ color: "var(--foreground)", fontSize: "0.88rem", fontWeight: 800 }}>ข้อมูลติดต่อ</Typography>
                        {viewContact.lockedFields?.length > 0 && (
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                            <Lock size={12} color="var(--warning)" />
                            <Typography sx={{ fontSize: "0.75rem", color: "var(--warning)", fontWeight: 600 }}>{viewContact.lockedFields.length} field ล็อคอยู่</Typography>
                          </Stack>
                        )}
                      </Stack>
                      <Stack spacing={1.1}>
                        {viewContact.phone && <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}><Phone size={15} color="var(--success)" /><Typography component="a" href={`tel:${viewContact.phone}`} sx={{ color: "var(--foreground)", fontSize: "0.9rem", flex: 1, "&:hover": { color: "var(--success)" } }}>{viewContact.phone}</Typography>{viewContact.lockedFields?.includes("phone") && <Lock size={12} color="var(--warning)" />}</Stack>}
                        {viewContact.email && <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}><Mail size={15} color="var(--brand)" /><Typography component="a" href={`mailto:${viewContact.email}`} sx={{ color: "var(--brand)", fontSize: "0.9rem", flex: 1, "&:hover": { textDecoration: "underline" } }}>{viewContact.email}</Typography>{viewContact.lockedFields?.includes("email") && <Lock size={12} color="var(--warning)" />}</Stack>}
                        {viewContact.website && <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}><Globe2 size={15} color="var(--brand)" /><Typography component="a" href={viewContact.website.startsWith("http") ? viewContact.website : `https://${viewContact.website}`} target="_blank" rel="noreferrer" sx={{ color: "var(--brand)", fontSize: "0.88rem", wordBreak: "break-all", flex: 1, "&:hover": { textDecoration: "underline" } }}>{viewContact.website}</Typography>{viewContact.lockedFields?.includes("website") && <Lock size={12} color="var(--warning)" />}</Stack>}
                        {viewContact.facebook && <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                          <Typography component="a" href={viewContact.facebook.startsWith("http") ? viewContact.facebook : `https://${viewContact.facebook}`} target="_blank" rel="noreferrer" sx={{ color: "var(--brand)", fontSize: "0.88rem", flex: 1, "&:hover": { textDecoration: "underline" } }}>Facebook Page</Typography>
                          {viewContact.lockedFields?.includes("facebook") && <Lock size={12} color="var(--warning)" />}
                        </Stack>}
                        {!viewContact.phone && !viewContact.email && !viewContact.website && !viewContact.facebook && <Typography sx={{ color: "var(--muted-light)", fontSize: "0.88rem" }}>ไม่มีข้อมูลติดต่อ</Typography>}
                      </Stack>
                    </Box>
                    {viewContact.note && (
                      <>
                        <Divider sx={{ borderColor: "var(--line)" }} />
                        <Box>
                          <Typography sx={{ color: "var(--foreground)", fontSize: "0.88rem", fontWeight: 800, mb: 0.75 }}>บันทึก</Typography>
                          <Typography sx={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{viewContact.note}</Typography>
                        </Box>
                      </>
                    )}
                    {!isReadOnly && (
                      <>
                        <Divider sx={{ borderColor: "var(--line)" }} />
                        <Box>
                          <Typography sx={{ color: "var(--foreground)", fontSize: "0.88rem", fontWeight: 800, mb: 1 }}>สถานะการเสนอขาย</Typography>
                          <Stack spacing={0.6}>
                            {STATUS_OPTIONS.map((opt) => {
                              const active = viewContact.outreachStatus === opt.id;
                              const Icon = opt.icon;
                              return (
                                <Button key={opt.id} size="small" onClick={() => changeStatus(viewContact.id, opt.id)} startIcon={<Icon size={13} />}
                                  sx={{ textTransform: "none", fontSize: "0.82rem", px: 1.25, py: 0.55, borderRadius: "7px", justifyContent: "flex-start", bgcolor: active ? opt.bg : "transparent", color: active ? opt.color : "var(--muted)", border: `1px solid ${active ? opt.color + "44" : "rgba(0,0,0,0.08)"}`, fontWeight: active ? 700 : 500, "& .MuiButton-startIcon": { color: "inherit" }, "&:hover": { bgcolor: opt.bg, color: opt.color } }}>
                                  {opt.label}
                                </Button>
                              );
                            })}
                          </Stack>
                        </Box>
                      </>
                    )}
                  </Stack>

                  {/* Col 2: Activity Log */}
                  <Stack spacing={2} sx={{ p: 2.5, borderRight: { lg: "1px solid var(--line)" } }}>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.88rem", fontWeight: 800 }}>Activity Log</Typography>

                    {/* Add Activity */}
                    {!isReadOnly && (
                      <Box sx={{ p: 1.25, borderRadius: "8px", border: "1px solid var(--line)", bgcolor: "rgba(0,0,0,0.02)" }}>
                        <Stack direction="row" spacing={0.5} sx={{ mb: 1, flexWrap: "wrap", rowGap: 0.5 }}>
                          {ACTIVITY_TYPES.map((t) => (
                            <Button key={t.id} size="small" onClick={() => setActType(t.id)}
                              sx={{ textTransform: "none", fontSize: "0.76rem", px: 1, py: 0.35, borderRadius: "6px", bgcolor: actType === t.id ? `${t.color}22` : "transparent", color: actType === t.id ? t.color : "var(--muted)", border: `1px solid ${actType === t.id ? t.color + "44" : "rgba(0,0,0,0.08)"}`, fontWeight: actType === t.id ? 700 : 500, "&:hover": { bgcolor: `${t.color}18`, color: t.color } }}>
                              {t.label}
                            </Button>
                          ))}
                        </Stack>
                        <TextField placeholder="บันทึกรายละเอียด..." value={actText} onChange={(e) => setActText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addActivity(); } }} size="small" multiline rows={2} fullWidth sx={fieldSx()} />
                        <Button size="small" onClick={addActivity} disabled={addingAct || !actText.trim()} startIcon={<Plus size={13} />}
                          sx={{ mt: 0.75, textTransform: "none", fontSize: "0.82rem", fontWeight: 600, color: "#fff", bgcolor: "var(--brand)", borderRadius: "7px", px: 1.5, "&:hover": { bgcolor: "var(--brand-hover)" }, "&.Mui-disabled": { bgcolor: "rgba(14,165,233,0.35)", color: "rgba(255,255,255,0.4)" } }}>
                          {addingAct ? "กำลังบันทึก..." : "เพิ่ม Activity"}
                        </Button>
                      </Box>
                    )}

                    {/* Activity list */}
                    <Stack spacing={0.75} sx={{ maxHeight: 340, overflowY: "auto", pr: 0.5 }}>
                      {activities.length === 0 ? (
                        <Typography sx={{ color: "var(--muted-light)", fontSize: "0.85rem", textAlign: "center", py: 2 }}>ยังไม่มี activity — บันทึกการติดต่อได้เลย</Typography>
                      ) : activities.map((a) => {
                        const t = activityTypeMeta(a.type);
                        return (
                          <Box key={a.id} sx={{ p: 1.25, borderRadius: "8px", border: "1px solid var(--line)", bgcolor: "rgba(0,0,0,0.02)" }}>
                            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mb: 0.5 }}>
                              <Chip label={t.label} size="small" sx={{ height: 20, fontSize: "0.72rem", fontWeight: 700, color: t.color, bgcolor: `${t.color}18`, border: `1px solid ${t.color}30` }} />
                              <Typography sx={{ color: "var(--muted-light)", fontSize: "0.73rem", ml: "auto" }}>{fmtDateTime(a.createdAt)}</Typography>
                              {!isReadOnly && (
                                <IconButton size="small" onClick={() => deleteActivity(a.id)} tabIndex={-1}
                                  sx={{ width: 22, height: 22, color: "var(--muted-light)", borderRadius: "5px", "&:hover": { color: "var(--danger)", bgcolor: "rgba(239,68,68,0.1)" } }}>
                                  <Trash2 size={12} />
                                </IconButton>
                              )}
                            </Stack>
                            <Typography sx={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{a.text}</Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Stack>

                  {/* Col 3: Linked events */}
                  <Stack spacing={2} sx={{ p: 2.5 }}>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.88rem", fontWeight: 800 }}>งานที่เกี่ยวข้อง ({viewContact.events.length})</Typography>
                    {viewContact.events.length === 0 ? (
                      <Typography sx={{ color: "var(--muted-light)", fontSize: "0.88rem" }}>ไม่มีงานที่ลิงก์อยู่</Typography>
                    ) : (
                      <Stack spacing={0.75} sx={{ maxHeight: 420, overflowY: "auto", pr: 0.5 }}>
                        {viewContact.events.map((ev) => (
                          <Box key={ev.id} sx={{ p: 1.25, borderRadius: "8px", border: "1px solid var(--line)", bgcolor: "rgba(0,0,0,0.02)" }}>
                            <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.3, mb: 0.5 }}>{ev.title}</Typography>
                            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                              <Chip label={ev.source} size="small" sx={{ height: 20, fontSize: "0.72rem", bgcolor: "var(--brand-light)", color: "var(--brand)", fontWeight: 700 }} />
                              <Typography sx={{ color: "var(--muted-light)", fontSize: "0.75rem" }}>{fmtDate(ev.startsAt)}</Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => !deleting && setDeleteTarget(null)} maxWidth="xs" fullWidth
        slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px" } } }}>
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Trash2 size={16} style={{ color: "var(--danger)" }} />
            </Box>
            <Box>
              <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 }}>ยืนยันการลบ</Typography>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.75rem" }}>ไม่สามารถกู้คืนได้</Typography>
            </Box>
          </Stack>
        </DialogTitle>
        <Divider sx={{ borderColor: "var(--line)" }} />
        <DialogContent sx={{ pt: 2 }}>
          <Typography sx={{ color: "var(--foreground)", fontSize: "0.88rem" }}>
            ต้องการลบ <Typography component="span" sx={{ fontWeight: 700, color: "var(--foreground)" }}>{deleteTarget?.companyName}</Typography> ออกจากระบบใช่ไหม?
          </Typography>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", mt: 0.75 }}>
            ประวัติ activity และการเชื่อมโยงกับ event จะถูกลบทั้งหมด
          </Typography>
        </DialogContent>
        <Divider sx={{ borderColor: "var(--line)" }} />
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button size="small" disabled={deleting} onClick={() => setDeleteTarget(null)}
            sx={{ color: "var(--muted)", textTransform: "none", border: "1px solid var(--line)", borderRadius: "8px", px: 2 }}>
            ยกเลิก
          </Button>
          <Button size="small" disabled={deleting} onClick={confirmDelete} variant="contained"
            startIcon={deleting ? <CircularProgress size={13} sx={{ color: "#fff" }} /> : <Trash2 size={13} />}
            sx={{ bgcolor: deleting ? "#b91c1c" : "var(--danger)", textTransform: "none", fontWeight: 700, px: 2.5, borderRadius: "8px", "&:hover": { bgcolor: "#dc2626" }, "&.Mui-disabled": { bgcolor: "#b91c1c", opacity: 0.85 }, transition: "background-color 0.2s" }}>
            {deleting ? "กำลังลบ..." : "ลบเลย"}
          </Button>
        </Box>
      </Dialog>


      {/* ── Create Contact Dialog ── */}
      <CreateContactDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(c) => setContacts((prev) => [c, ...prev])}
      />

      {/* ── Import Excel Dialog ── */}
      <ImportExcelDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImported={() => {
          setImportOpen(false);
          fetch("/api/contacts").then((r) => r.json()).then((d) => setContacts(d.contacts ?? []));
        }}
      />
    </Box>
  );
}
