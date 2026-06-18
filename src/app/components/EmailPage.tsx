"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box, Button, Chip, CircularProgress, Dialog, DialogContent,
  DialogTitle, Divider, FormControl, IconButton, InputLabel,
  MenuItem, Paper, Select, Stack, Tab, Tabs, TextField,
  Tooltip, Typography, Checkbox, FormControlLabel,
} from "@mui/material";
import {
  CheckCircle2, ChevronLeft, FileText, ImageIcon, Mail, Paperclip,
  Pencil, Plus, Send, Trash2, Users, X, XCircle, Eye, AlertCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type EmailTemplate = {
  id: number;
  name: string;
  subject: string;
  body: string;
  updatedAt: string;
};

type Campaign = {
  id: number;
  name: string;
  status: string;
  sentAt: string | null;
  createdAt: string;
  template: { name: string };
  _count: { recipients: number };
};

type Contact = {
  id: number | string;
  companyName: string;
  contactName: string | null;
  email: string | null;
};

type Attachment = {
  filename: string;
  contentType: string;
  base64: string;
  size: number;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MERGE_TAGS = [
  { tag: "{{contact_name}}", label: "ชื่อผู้ติดต่อ" },
  { tag: "{{company_name}}", label: "ชื่อบริษัท" },
  { tag: "{{email}}", label: "อีเมล" },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("th-TH", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function campaignStatusMeta(s: string) {
  if (s === "SENT")    return { label: "ส่งแล้ว",   color: "var(--success)", bg: "rgba(16,185,129,0.12)" };
  if (s === "FAILED")  return { label: "ล้มเหลว",   color: "var(--danger)",  bg: "rgba(239,68,68,0.12)" };
  if (s === "SENDING") return { label: "กำลังส่ง",  color: "var(--brand)",   bg: "rgba(14,165,233,0.12)" };
  return                        { label: "Draft",     color: "var(--muted)",   bg: "rgba(148,163,184,0.12)" };
}

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

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function fileToAttachment(file: File): Promise<Attachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve({ filename: file.name, contentType: file.type || "application/octet-stream", base64, size: file.size });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AttachmentZone({ attachments, onChange }: { attachments: Attachment[]; onChange: (a: Attachment[]) => void }) {
  const [dragging, setDragging] = useState(false);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const newOnes = await Promise.all(Array.from(files).map(fileToAttachment));
    onChange([...attachments, ...newOnes]);
  }

  function remove(idx: number) {
    onChange(attachments.filter((_, i) => i !== idx));
  }

  return (
    <Box>
      <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", fontWeight: 600, mb: 0.75 }}>
        ไฟล์แนบ (รูปภาพ / PDF)
      </Typography>

      {/* Drop zone */}
      <Box
        component="label"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 0.75, p: 2, borderRadius: "10px", cursor: "pointer",
          border: `1.5px dashed ${dragging ? "var(--brand)" : "rgba(148,163,184,0.25)"}`,
          bgcolor: dragging ? "rgba(14,165,233,0.06)" : "rgba(0,0,0,0.03)",
          transition: "all 0.15s ease",
          "&:hover": { borderColor: "var(--brand)", bgcolor: "rgba(14,165,233,0.04)" },
        }}
      >
        <input type="file" multiple hidden accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={(e) => addFiles(e.target.files)} />
        <Paperclip size={18} style={{ color: dragging ? "var(--brand)" : "var(--muted)" }} />
        <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", textAlign: "center" }}>
          คลิกหรือลากไฟล์มาวางที่นี่
        </Typography>
        <Typography sx={{ color: "var(--muted-light)", fontSize: "0.68rem" }}>
          รูปภาพ, PDF, Word, Excel — สูงสุด 10 MB / ไฟล์
        </Typography>
      </Box>

      {/* Attached file list */}
      {attachments.length > 0 && (
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {attachments.map((a, i) => (
            <Stack key={i} direction="row" sx={{ alignItems: "center", gap: 1, p: 0.75, borderRadius: "7px", bgcolor: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.2)" }}>
              <ImageIcon size={13} style={{ color: "var(--brand)", flexShrink: 0 }} />
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.78rem", flex: 1, minWidth: 0 }} noWrap>{a.filename}</Typography>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.7rem", flexShrink: 0 }}>{formatBytes(a.size)}</Typography>
              <IconButton size="small" onClick={() => remove(i)} sx={{ p: 0.25, color: "var(--muted)", "&:hover": { color: "var(--danger)" } }}>
                <X size={12} />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
}

// ─── Template Dialog ─────────────────────────────────────────────────────────

function TemplateDialog({
  open, onClose, initial, onSaved,
}: {
  open: boolean;
  onClose: () => void;
  initial?: EmailTemplate | null;
  onSaved: (t: EmailTemplate) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [subject, setSubject] = useState(initial?.subject ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setSubject(initial?.subject ?? "");
      setBody(initial?.body ?? "");
      setErr("");
    }
  }, [open, initial]);

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) { setErr("เฉพาะไฟล์รูปภาพเท่านั้น"); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      const imgTag = `<img src="${data.url}" alt="${file.name}" style="max-width:100%; height:auto; display:block; margin:8px 0;">`;
      setBody((prev) => prev + "\n" + imgTag);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!name.trim() || !subject.trim() || !body.trim()) {
      setErr("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setSaving(true);
    try {
      const url = initial ? `/api/email-templates/${initial.id}` : "/api/email-templates";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, subject, body }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      onSaved(data.template);
      onClose();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  }

  function insertTag(tag: string) {
    setBody((prev) => prev + tag);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth
      slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid var(--line)", borderRadius: "14px", height: "90vh", display: "flex", flexDirection: "column" } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1, flexShrink: 0 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <FileText size={18} style={{ color: "var(--brand)" }} />
          <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "1rem" }}>
            {initial ? "แก้ไข Template" : "สร้าง Template ใหม่"}
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: "var(--muted)" }}>
          <X size={16} />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <DialogContent sx={{ pt: 2.5, flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <Stack spacing={2.5} sx={{ flex: 1 }}>
          {err && (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", bgcolor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", p: 1.25 }}>
              <AlertCircle size={14} style={{ color: "var(--danger)", flexShrink: 0 }} />
              <Typography sx={{ color: "var(--danger)", fontSize: "0.8rem" }}>{err}</Typography>
            </Stack>
          )}
          <TextField label="ชื่อ Template" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" sx={fieldSx()} />
          <TextField
            label="Subject (หัวข้ออีเมล)" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth size="small"
            placeholder="เช่น  สวัสดี {{contact_name}} — ขอนำเสนอพื้นที่จัดงาน"
            sx={fieldSx()}
          />

          {/* Toolbar: Merge tags + Image upload */}
          <Box>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", fontWeight: 600 }}>
                Merge Tags — คลิกเพื่อแทรกใน Body
              </Typography>
              <Tooltip title="อัปโหลดรูปแล้วแทรก <img> ลง body">
                <Box component="label" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.25, py: 0.5, borderRadius: "7px", cursor: "pointer", bgcolor: uploading ? "rgba(14,165,233,0.06)" : "rgba(0,0,0,0.04)", border: "1px solid var(--line)", "&:hover": { bgcolor: "rgba(14,165,233,0.1)", borderColor: "rgba(14,165,233,0.4)" }, transition: "all 0.15s" }}>
                  <input type="file" hidden accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }} />
                  {uploading ? <CircularProgress size={12} sx={{ color: "var(--brand)" }} /> : <ImageIcon size={13} style={{ color: "var(--brand)" }} />}
                  <Typography sx={{ color: "var(--brand)", fontSize: "0.72rem", fontWeight: 600 }}>
                    {uploading ? "กำลังอัปโหลด..." : "อัปโหลดรูป"}
                  </Typography>
                </Box>
              </Tooltip>
            </Stack>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {MERGE_TAGS.map((m) => (
                <Chip
                  key={m.tag} label={`${m.tag} · ${m.label}`} size="small"
                  onClick={() => insertTag(m.tag)}
                  sx={{ cursor: "pointer", bgcolor: "rgba(14,165,233,0.1)", color: "var(--brand)", border: "1px solid rgba(14,165,233,0.3)", fontSize: "0.7rem", "&:hover": { bgcolor: "rgba(14,165,233,0.2)" } }}
                />
              ))}
            </Box>
          </Box>

          <TextField
            label="Body (HTML หรือ Plain Text)"
            value={body} onChange={(e) => setBody(e.target.value)}
            fullWidth multiline rows={16} size="small"
            placeholder={"<p>เรียน {{contact_name}},</p>\n<p>ทางเราขอนำเสนอ...</p>"}
            sx={{
              ...fieldSx(),
              flex: 1,
              "& .MuiInputBase-root": { fontFamily: "monospace", fontSize: "0.82rem", color: "var(--foreground)", bgcolor: "rgba(0,0,0,0.03)", borderRadius: "8px", width: "100%", height: "100%", alignItems: "flex-start" },
              "& .MuiInputBase-input": { resize: "none", height: "100% !important", overflow: "auto !important" },
              "& .MuiFormControl-root": { height: "100%" },
            }}
          />
        </Stack>
      </DialogContent>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onClose} size="small" sx={{ color: "var(--muted)", textTransform: "none" }}>ยกเลิก</Button>
        <Button onClick={save} disabled={saving} size="small" variant="contained"
          sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, px: 2.5, "&:hover": { bgcolor: "#0284c7" } }}>
          {saving ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : "บันทึก"}
        </Button>
      </Box>
    </Dialog>
  );
}

// ─── Preview Dialog ───────────────────────────────────────────────────────────

function PreviewDialog({ open, onClose, subject, body }: { open: boolean; onClose: () => void; subject: string; body: string }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid var(--line)", borderRadius: "14px" } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Eye size={18} style={{ color: "var(--brand)" }} />
          <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "1rem" }}>Preview Email</Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: "var(--muted)" }}><X size={16} /></IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <DialogContent sx={{ pt: 2 }}>
        <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", fontWeight: 600, mb: 0.5 }}>SUBJECT</Typography>
        <Typography sx={{ color: "var(--foreground)", fontSize: "0.9rem", mb: 2, p: 1.5, bgcolor: "rgba(0,0,0,0.04)", borderRadius: "8px", border: "1px solid var(--line)" }}>
          {subject || "(ว่าง)"}
        </Typography>
        <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", fontWeight: 600, mb: 0.5 }}>BODY</Typography>
        <Box sx={{ bgcolor: "#fff", borderRadius: "8px", p: 2, minHeight: 200 }}
          dangerouslySetInnerHTML={{ __html: body }} />
      </DialogContent>
    </Dialog>
  );
}

// ─── Templates Tab ────────────────────────────────────────────────────────────

function TemplatesTab() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EmailTemplate | null>(null);
  const [previewT, setPreviewT] = useState<EmailTemplate | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/email-templates");
      const data = await res.json();
      setTemplates(data.templates ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function deleteTemplate(id: number) {
    if (!confirm("ลบ template นี้?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/email-templates/${id}`, { method: "DELETE" });
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  function onSaved(t: EmailTemplate) {
    setTemplates((prev) => {
      const idx = prev.findIndex((x) => x.id === t.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = t; return next; }
      return [t, ...prev];
    });
  }

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem" }}>
          {templates.length} template{templates.length !== 1 ? "s" : ""}
        </Typography>
        <Button size="small" startIcon={<Plus size={14} />} variant="contained"
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, fontSize: "0.8rem", px: 2, "&:hover": { bgcolor: "#0284c7" } }}>
          สร้าง Template
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress size={28} sx={{ color: "var(--brand)" }} /></Box>
      ) : templates.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <FileText size={40} style={{ color: "var(--muted)", opacity: 0.4, marginBottom: 12 }} />
          <Typography sx={{ color: "var(--muted)", fontSize: "0.9rem" }}>ยังไม่มี Template — กดปุ่มสร้างเลย</Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {templates.map((t) => (
            <Paper key={t.id} sx={{ bgcolor: "rgba(0,0,0,0.03)", border: "1px solid var(--line)", borderRadius: "10px", p: 2 }}>
              <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }} spacing={2}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.9rem", mb: 0.25 }}>{t.name}</Typography>
                  <Typography sx={{ color: "var(--brand)", fontSize: "0.8rem", mb: 0.5 }} noWrap>{t.subject}</Typography>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem" }}>อัปเดต {fmtDate(t.updatedAt)}</Typography>
                </Box>
                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Preview">
                    <IconButton size="small" onClick={() => setPreviewT(t)} sx={{ color: "var(--muted)", "&:hover": { color: "var(--brand)" } }}>
                      <Eye size={14} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="แก้ไข">
                    <IconButton size="small" onClick={() => { setEditing(t); setDialogOpen(true); }} sx={{ color: "var(--muted)", "&:hover": { color: "var(--warning)" } }}>
                      <Pencil size={14} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="ลบ">
                    <IconButton size="small" onClick={() => deleteTemplate(t.id)} disabled={deleting === t.id} sx={{ color: "var(--muted)", "&:hover": { color: "var(--danger)" } }}>
                      {deleting === t.id ? <CircularProgress size={12} /> : <Trash2 size={14} />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <TemplateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initial={editing} onSaved={onSaved} />
      {previewT && <PreviewDialog open={!!previewT} onClose={() => setPreviewT(null)} subject={previewT.subject} body={previewT.body} />}
    </Box>
  );
}

// ─── Send Campaign Tab ────────────────────────────────────────────────────────

type SendStep = "compose" | "contacts" | "confirm" | "done";

function SendCampaignTab() {
  const [step, setStep] = useState<SendStep>("compose");
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingT, setLoadingT] = useState(true);
  const [loadingC, setLoadingC] = useState(false);

  const [campaignName, setCampaignName] = useState("");
  const [templateId, setTemplateId] = useState<number | "">("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [filterEmail, setFilterEmail] = useState(true);
  const [search, setSearch] = useState("");

  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);
  const [sendErr, setSendErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoadingT(true);
      const res = await fetch("/api/email-templates");
      const data = await res.json();
      setTemplates(data.templates ?? []);
      setLoadingT(false);
    })();
  }, []);

  async function loadContacts() {
    setLoadingC(true);
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data.contacts ?? []);
    setLoadingC(false);
  }

  function goToContacts() {
    if (!campaignName.trim() || !templateId) return;
    if (contacts.length === 0) loadContacts();
    setStep("contacts");
  }

  const selectedTemplate = templates.find((t) => t.id === templateId) ?? null;

  const filteredContacts = contacts.filter((c) => {
    if (filterEmail && !c.email) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.companyName.toLowerCase().includes(q) || (c.contactName ?? "").toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q);
    }
    return true;
  });

  function toggleContact(id: string | number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    const allIds = filteredContacts.map((c) => c.id);
    const allSelected = allIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds((prev) => { const next = new Set(prev); allIds.forEach((id) => next.delete(id)); return next; });
    } else {
      setSelectedIds((prev) => { const next = new Set(prev); allIds.forEach((id) => next.add(id)); return next; });
    }
  }

  async function send() {
    const recipients = contacts
      .filter((c) => selectedIds.has(c.id) && c.email)
      .map((c) => ({ email: c.email!, name: c.contactName ?? undefined, company: c.companyName }));

    if (!recipients.length) { setSendErr("ไม่มีผู้รับที่มีอีเมล"); return; }

    setSending(true);
    setSendErr("");
    try {
      const res = await fetch("/api/email-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, name: campaignName, recipients, attachments }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setResult({ sent: data.sent, failed: data.failed });
      setStep("done");
    } catch (e: unknown) {
      setSendErr(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setStep("compose");
    setCampaignName("");
    setTemplateId("");
    setAttachments([]);
    setSelectedIds(new Set());
    setSearch("");
    setResult(null);
    setSendErr("");
  }

  const recipientsWithEmail = contacts.filter((c) => selectedIds.has(c.id) && c.email);
  const recipientsNoEmail = contacts.filter((c) => selectedIds.has(c.id) && !c.email);

  // ── Step: compose ────────────────────────────────────────────────────────
  if (step === "compose") return (
    <Box sx={{ maxWidth: 640 }}>
      <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem", mb: 2 }}>ขั้นตอนที่ 1 — เลือก Template</Typography>
      <Stack spacing={2.5}>
        <TextField
          label="ชื่อแคมเปญ" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} fullWidth size="small"
          placeholder="เช่น  Invitation — BITEC Q3 2026"
          sx={fieldSx()}
        />
        <FormControl fullWidth size="small" sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(148,163,184,0.2)" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(56,189,248,0.4)" },
          "& .MuiInputLabel-root": { color: "var(--muted)", fontSize: "0.78rem" },
          "& .MuiInputLabel-root.Mui-focused": { color: "var(--brand)" },
          "& .MuiSelect-select": { color: "var(--foreground)" },
        }}>
          <InputLabel>Email Template</InputLabel>
          <Select value={templateId} onChange={(e) => setTemplateId(e.target.value as number)} label="Email Template"
            sx={{ color: "var(--foreground)", "& .MuiSvgIcon-root": { color: "var(--muted)" }, bgcolor: "rgba(0,0,0,0.03)", borderRadius: "8px" }}
            MenuProps={{ slotProps: { paper: { sx: { bgcolor: "#ffffff", border: "1px solid var(--line)" } } } }}>
            {loadingT ? (
              <MenuItem disabled><CircularProgress size={14} /></MenuItem>
            ) : templates.map((t) => (
              <MenuItem key={t.id} value={t.id} sx={{ color: "var(--foreground)", "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } }}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedTemplate && (
          <Paper sx={{ bgcolor: "rgba(0,0,0,0.04)", border: "1px solid var(--line)", borderRadius: "8px", p: 1.5 }}>
            <Typography sx={{ color: "var(--muted)", fontSize: "0.7rem", fontWeight: 600, mb: 0.5 }}>SUBJECT PREVIEW</Typography>
            <Typography sx={{ color: "var(--brand)", fontSize: "0.85rem" }}>{selectedTemplate.subject}</Typography>
          </Paper>
        )}

        <AttachmentZone attachments={attachments} onChange={setAttachments} />

        <Button
          size="small" variant="contained" endIcon={<Users size={14} />}
          disabled={!campaignName.trim() || !templateId} onClick={goToContacts}
          sx={{ alignSelf: "flex-start", bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, px: 2.5, "&:hover": { bgcolor: "#0284c7" }, "&.Mui-disabled": { opacity: 0.4 } }}>
          เลือก Contacts →
        </Button>
      </Stack>
    </Box>
  );

  // ── Step: contacts ────────────────────────────────────────────────────────
  if (step === "contacts") return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }} spacing={1}>
        <IconButton size="small" onClick={() => setStep("compose")} sx={{ color: "var(--muted)" }}><ChevronLeft size={16} /></IconButton>
        <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem" }}>ขั้นตอนที่ 2 — เลือก Contacts</Typography>
      </Stack>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", mb: 1.5 }}>
        <TextField
          size="small" placeholder="ค้นหา บริษัท / ชื่อ / อีเมล" value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200, ...fieldSx() }}
        />
        <FormControlLabel
          control={<Checkbox checked={filterEmail} onChange={(e) => setFilterEmail(e.target.checked)} size="small" sx={{ color: "var(--muted)", "&.Mui-checked": { color: "var(--brand)" } }} />}
          label={<Typography sx={{ color: "var(--muted)", fontSize: "0.8rem" }}>แสดงเฉพาะที่มีอีเมล</Typography>}
        />
        <Button size="small" onClick={toggleAll}
          sx={{ color: "var(--brand)", textTransform: "none", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
          {filteredContacts.every((c) => selectedIds.has(c.id)) ? "ยกเลิกทั้งหมด" : "เลือกทั้งหมด"}
        </Button>
      </Box>

      <Typography sx={{ color: "var(--muted)", fontSize: "0.75rem", mb: 1 }}>
        เลือกแล้ว {selectedIds.size} คน · มีอีเมล {recipientsWithEmail.length} คน
      </Typography>

      {loadingC ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress size={28} sx={{ color: "var(--brand)" }} /></Box>
      ) : (
        <Box sx={{ maxHeight: 440, overflowY: "auto", pr: 0.5 }}>
          <Stack spacing={0.75}>
            {filteredContacts.map((c) => {
              const checked = selectedIds.has(c.id);
              return (
                <Paper
                  key={c.id} onClick={() => toggleContact(c.id)}
                  sx={{
                    bgcolor: checked ? "rgba(14,165,233,0.08)" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${checked ? "rgba(14,165,233,0.35)" : "var(--line)"}`,
                    borderRadius: "8px", p: 1.25, cursor: "pointer",
                    "&:hover": { borderColor: "var(--brand)" },
                    transition: "all 0.12s ease",
                  }}
                >
                  <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
                    <Checkbox checked={checked} size="small" onClick={(e) => e.stopPropagation()} onChange={() => toggleContact(c.id)}
                      sx={{ p: 0, color: "var(--muted)", "&.Mui-checked": { color: "var(--brand)" } }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 600 }} noWrap>{c.companyName}</Typography>
                      <Stack direction="row" spacing={1}>
                        {c.contactName && <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem" }} noWrap>{c.contactName}</Typography>}
                        {c.email
                          ? <Typography sx={{ color: "var(--brand)", fontSize: "0.72rem" }} noWrap>{c.email}</Typography>
                          : <Typography sx={{ color: "var(--danger)", fontSize: "0.72rem" }}>ไม่มีอีเมล</Typography>}
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              );
            })}
            {filteredContacts.length === 0 && (
              <Typography sx={{ color: "var(--muted)", textAlign: "center", py: 4, fontSize: "0.85rem" }}>ไม่พบ contact</Typography>
            )}
          </Stack>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          size="small" variant="contained" endIcon={<Send size={14} />}
          disabled={recipientsWithEmail.length === 0} onClick={() => setStep("confirm")}
          sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, px: 2.5, "&:hover": { bgcolor: "#0284c7" }, "&.Mui-disabled": { opacity: 0.4 } }}>
          ถัดไป — ยืนยันส่ง ({recipientsWithEmail.length} คน)
        </Button>
      </Box>
    </Box>
  );

  // ── Step: confirm ─────────────────────────────────────────────────────────
  if (step === "confirm") return (
    <Box sx={{ maxWidth: 600 }}>
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }} spacing={1}>
        <IconButton size="small" onClick={() => setStep("contacts")} sx={{ color: "var(--muted)" }}><ChevronLeft size={16} /></IconButton>
        <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem" }}>ขั้นตอนที่ 3 — ยืนยันก่อนส่ง</Typography>
      </Stack>

      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Paper sx={{ bgcolor: "rgba(0,0,0,0.03)", border: "1px solid var(--line)", borderRadius: "10px", p: 2 }}>
          <Stack spacing={1}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>แคมเปญ</Typography>
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 600 }}>{campaignName}</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>Template</Typography>
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem" }}>{selectedTemplate?.name}</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>Subject</Typography>
              <Typography sx={{ color: "var(--brand)", fontSize: "0.85rem" }}>{selectedTemplate?.subject}</Typography>
            </Stack>
            <Divider sx={{ borderColor: "var(--line)" }} />
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ส่งถึง</Typography>
              <Typography sx={{ color: "var(--success)", fontSize: "0.85rem", fontWeight: 700 }}>{recipientsWithEmail.length} คน</Typography>
            </Stack>
            {recipientsNoEmail.length > 0 && (
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ข้าม (ไม่มีอีเมล)</Typography>
                <Typography sx={{ color: "var(--danger)", fontSize: "0.85rem" }}>{recipientsNoEmail.length} คน</Typography>
              </Stack>
            )}
            {attachments.length > 0 && (
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ไฟล์แนบ</Typography>
                <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem" }}>{attachments.length} ไฟล์</Typography>
              </Stack>
            )}
          </Stack>
        </Paper>

        {sendErr && (
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", bgcolor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", p: 1.25 }}>
            <AlertCircle size={14} style={{ color: "var(--danger)", flexShrink: 0 }} />
            <Typography sx={{ color: "var(--danger)", fontSize: "0.8rem" }}>{sendErr}</Typography>
          </Stack>
        )}
      </Stack>

      <Button
        size="small" variant="contained" startIcon={sending ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : <Send size={14} />}
        disabled={sending} onClick={send}
        sx={{ bgcolor: "var(--success)", textTransform: "none", fontWeight: 700, px: 3, "&:hover": { bgcolor: "#059669" }, "&.Mui-disabled": { opacity: 0.5 } }}>
        {sending ? "กำลังส่ง..." : `ส่ง Email ${recipientsWithEmail.length} ฉบับ`}
      </Button>
    </Box>
  );

  // ── Step: done ────────────────────────────────────────────────────────────
  return (
    <Box sx={{ maxWidth: 480, textAlign: "center", py: 4 }}>
      <CheckCircle2 size={52} style={{ color: "var(--success)", marginBottom: 16 }} />
      <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>ส่ง Email เรียบร้อย!</Typography>
      {result && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
          <Chip label={`✓ ส่งสำเร็จ ${result.sent} ฉบับ`} sx={{ bgcolor: "rgba(16,185,129,0.12)", color: "var(--success)", fontWeight: 600 }} />
          {result.failed > 0 && <Chip label={`✗ ล้มเหลว ${result.failed} ฉบับ`} sx={{ bgcolor: "rgba(239,68,68,0.12)", color: "var(--danger)", fontWeight: 600 }} />}
        </Box>
      )}
      <Button size="small" variant="contained" onClick={reset}
        sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 600, px: 3, "&:hover": { bgcolor: "#0284c7" } }}>
        ส่งแคมเปญใหม่
      </Button>
    </Box>
  );
}

// ─── Campaigns History Tab ────────────────────────────────────────────────────

function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/email-campaigns");
      const data = await res.json();
      setCampaigns(data.campaigns ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress size={28} sx={{ color: "var(--brand)" }} /></Box>
      ) : campaigns.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Mail size={40} style={{ color: "var(--muted)", opacity: 0.4, marginBottom: 12 }} />
          <Typography sx={{ color: "var(--muted)", fontSize: "0.9rem" }}>ยังไม่เคยส่งแคมเปญ</Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {campaigns.map((c) => {
            const meta = campaignStatusMeta(c.status);
            return (
              <Paper key={c.id} sx={{ bgcolor: "rgba(0,0,0,0.03)", border: "1px solid var(--line)", borderRadius: "10px", p: 2 }}>
                <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }} spacing={2}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 0.5 }}>
                      <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.88rem" }}>{c.name}</Typography>
                      <Chip label={meta.label} size="small" sx={{ bgcolor: meta.bg, color: meta.color, fontWeight: 600, fontSize: "0.68rem", height: 20 }} />
                    </Stack>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                      Template: {c.template.name} · {c._count.recipients} recipients
                    </Typography>
                    {c.sentAt && <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem", mt: 0.25 }}>ส่งเมื่อ {fmtDate(c.sentAt)}</Typography>}
                  </Box>
                  {c.status === "SENT"   && <CheckCircle2 size={18} style={{ color: "var(--success)", flexShrink: 0 }} />}
                  {c.status === "FAILED" && <XCircle      size={18} style={{ color: "var(--danger)",  flexShrink: 0 }} />}
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function EmailPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Box sx={{ width: 42, height: 42, borderRadius: "11px", bgcolor: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", display: "grid", placeItems: "center" }}>
          <Mail size={20} style={{ color: "var(--brand)" }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1.2 }}>Email Campaigns</Typography>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>สร้าง template แล้วส่งพร้อมกันหลาย contact</Typography>
        </Box>
      </Stack>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          "& .MuiTabs-indicator": { bgcolor: "var(--brand)" },
          "& .MuiTab-root": { color: "var(--muted)", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minWidth: 0, px: 2 },
          "& .Mui-selected": { color: "var(--brand) !important" },
        }}>
        <Tab label="Templates" icon={<FileText size={14} />} iconPosition="start" />
        <Tab label="ส่งแคมเปญ" icon={<Send size={14} />} iconPosition="start" />
        <Tab label="ประวัติ" icon={<Mail size={14} />} iconPosition="start" />
      </Tabs>

      {tab === 0 && <TemplatesTab />}
      {tab === 1 && <SendCampaignTab />}
      {tab === 2 && <CampaignsTab />}
    </Box>
  );
}
