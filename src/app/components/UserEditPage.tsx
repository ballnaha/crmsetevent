"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { KeyRound, Mail, Save, ShieldCheck, UserRound } from "lucide-react";

type UserProfile = {
  id: number;
  name: string | null;
  email: string;
  role: string;
};

export default function UserEditPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/users/me", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "โหลดข้อมูลผู้ใช้ไม่สำเร็จ");

        setProfile(data.user);
        setName(data.user.name || "");
        setEmail(data.user.email);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "โหลดข้อมูลผู้ใช้ไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "บันทึกข้อมูลไม่สำเร็จ");

      setProfile(data.user);
      setName(data.user.name || "");
      setEmail(data.user.email);
      setPassword("");
      setConfirmPassword("");
      setSuccess("บันทึกข้อมูลผู้ใช้เรียบร้อยแล้ว");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "บันทึกข้อมูลไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 820, mx: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--foreground)" }}>
          แก้ไขข้อมูลผู้ใช้
        </Typography>
        <Typography sx={{ mt: 0.5, color: "var(--muted)", fontSize: "0.9rem" }}>
          จัดการชื่อ อีเมล และรหัสผ่านสำหรับบัญชีที่กำลังใช้งาน
        </Typography>
      </Box>

      <Card
        sx={{
          p: { xs: 2.25, sm: 3.5 },
          borderRadius: 3,
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-card)",
          background: "var(--panel-solid)",
        }}
      >
        {loading ? (
          <Stack sx={{ minHeight: 260, alignItems: "center", justifyContent: "center" }}>
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                <TextField
                  label="ชื่อผู้ใช้"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  fullWidth
                  disabled={saving}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start"><UserRound size={18} /></InputAdornment> } }}
                />
                <TextField
                  label="อีเมล"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                  disabled={saving}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start"><Mail size={18} /></InputAdornment> } }}
                />
              </Stack>

              <TextField
                label="สิทธิ์การใช้งาน"
                value={profile?.role || ""}
                fullWidth
                disabled
                helperText="สิทธิ์การใช้งานไม่สามารถแก้ไขจากหน้านี้ได้"
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><ShieldCheck size={18} /></InputAdornment> } }}
              />

              <Box sx={{ pt: 1, borderTop: "1px solid var(--line)" }}>
                <Typography sx={{ mb: 0.5, fontWeight: 700, color: "var(--foreground)" }}>
                  เปลี่ยนรหัสผ่าน
                </Typography>
                <Typography sx={{ mb: 2, color: "var(--muted)", fontSize: "0.8rem" }}>
                  เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                  <TextField
                    label="รหัสผ่านใหม่"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    fullWidth
                    disabled={saving}
                    slotProps={{
                      htmlInput: { minLength: 8 },
                      input: { startAdornment: <InputAdornment position="start"><KeyRound size={18} /></InputAdornment> },
                    }}
                  />
                  <TextField
                    label="ยืนยันรหัสผ่านใหม่"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    fullWidth
                    disabled={saving}
                    slotProps={{ htmlInput: { minLength: 8 } }}
                  />
                </Stack>
              </Box>

              <Stack direction="row" sx={{ justifyContent: "flex-end", pt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving || loading}
                  startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <Save size={17} />}
                  sx={{
                    minWidth: 150,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: "none",
                    background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
                  }}
                >
                  {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Card>
    </Box>
  );
}