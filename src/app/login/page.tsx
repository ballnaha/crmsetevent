"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Stack, Alert, InputAdornment, IconButton, Card, CircularProgress } from "@mui/material";
import { Lock, Mail, Eye, EyeOff, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (err: any) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 0%, #e0eaf4 0%, var(--background) 70%)",
        px: 2,
      }}
    >
      {/* Background Decorative Blob 1 */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0) 70%)",
          top: "10%",
          left: "15%",
          filter: "blur(40px)",
          animation: "float1 8s infinite alternate",
          "@keyframes float1": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(20px, 30px) scale(1.1)" }
          }
        }}
      />

      {/* Background Decorative Blob 2 */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0) 70%)",
          bottom: "10%",
          right: "15%",
          filter: "blur(50px)",
          animation: "float2 10s infinite alternate",
          "@keyframes float2": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(-30px, -20px) scale(1.05)" }
          }
        }}
      />

      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          border: "1px solid var(--line)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
          zIndex: 1,
        }}
      >
        {/* Brand Logo & Title */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "center", mb: 3.5 }}>
          <Box
            sx={{
              display: "grid",
              width: 38,
              height: 38,
              placeItems: "center",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(14, 165, 233, 0.4)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" rx="1.5" />
              <rect x="14" y="3" width="7" height="5" rx="1.5" />
              <rect x="14" y="12" width="7" height="9" rx="1.5" />
              <rect x="3" y="16" width="7" height="5" rx="1.5" />
            </svg>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            EventSync
          </Typography>
        </Stack>

        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--foreground)", mb: 0.5 }}>
            ยินดีต้อนรับกลับมา
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted)" }}>
            เข้าสู่ระบบ EventSync CRM เพื่อจัดการข้อมูลผู้จัดงาน
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            icon={<ShieldAlert size={18} />}
            sx={{
              mb: 3,
              borderRadius: 2,
              fontSize: "0.85rem",
              fontWeight: 500,
              bgcolor: "var(--danger-bg)",
              color: "var(--danger)",
              border: "1px solid rgba(239, 68, 68, 0.15)",
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* Email Field */}
            <TextField
              label="อีเมล (Email)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              disabled={loading}
              placeholder="operator@eventsync.com"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} style={{ color: "var(--muted)" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  "&:hover fieldset": { borderColor: "var(--brand)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--brand)" },
                },
              }}
            />

            {/* Password Field */}
            <TextField
              label="รหัสผ่าน (Password)"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              disabled={loading}
              placeholder="••••••••"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} style={{ color: "var(--muted)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  "&:hover fieldset": { borderColor: "var(--brand)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--brand)" },
                },
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)",
                background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 16px rgba(14, 165, 233, 0.35)",
                  background: "linear-gradient(135deg, var(--brand-hover) 0%, var(--accent) 100%)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "เข้าสู่ระบบ"
              )}
            </Button>
          </Stack>
        </form>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px dashed var(--line)",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "var(--muted)", display: "block", mb: 0.5 }}>
            บัญชีเริ่มต้นระบบ:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "var(--foreground)", display: "block" }}>
            admin@eventsync.com / admin123
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
