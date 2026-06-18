"use client";

import { useRouter, usePathname } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  LayoutDashboard,
  Mail,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

type SidebarProps = {
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

export default function Sidebar({ variant = "desktop", onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box component="aside" className="appSidebar" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Brand Logo & Title */}
      <Box className="sidebarBrand" sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1.25} className="brandIdentity" sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          <Box className="brandIcon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" rx="1.5" />
              <rect x="14" y="3" width="7" height="5" rx="1.5" />
              <rect x="14" y="12" width="7" height="9" rx="1.5" />
              <rect x="3" y="16" width="7" height="5" rx="1.5" />
            </svg>
          </Box>
          <Typography className="brandName">EventSync</Typography>
        </Stack>
      </Box>

      {/* Main Navigation List */}
      <Stack spacing={2} sx={{ flex: 1 }}>
        {/* Menu Group 1: Navigation */}
        <Box>
          <Typography 
            sx={{ 
              color: "var(--sidebar-muted)", 
              fontSize: "0.65rem", 
              fontWeight: 700, 
              letterSpacing: "0.08em", 
              textTransform: "uppercase", 
              px: 1.5,
              mb: 1
            }}
          >
            Navigation
          </Typography>
          
          <Stack spacing={0.5}>
            {/* Dashboard Button */}
            <Button
              className={`navButton ${pathname === "/" ? "navButtonActive" : ""}`}
              startIcon={<LayoutDashboard size={16} />}
              onClick={() => {
                router.push("/");
                if (onClose) onClose();
              }}
              sx={{
                justifyContent: "flex-start",
                color: pathname === "/" ? "#fff" : "var(--muted)",
                bgcolor: pathname === "/" ? "var(--sidebar-active-bg)" : "transparent",
                fontWeight: pathname === "/" ? 600 : 500,
                px: 1.5,
                py: 1,
                width: "100%",
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              Lead Dashboard
            </Button>

            {/* Contacts Button */}
            <Button
              className={`navButton ${pathname === "/contacts" ? "navButtonActive" : ""}`}
              startIcon={<Users size={16} />}
              onClick={() => {
                router.push("/contacts");
                if (onClose) onClose();
              }}
              sx={{
                justifyContent: "flex-start",
                color: pathname === "/contacts" ? "#fff" : "var(--muted)",
                bgcolor: pathname === "/contacts" ? "var(--sidebar-active-bg)" : "transparent",
                fontWeight: pathname === "/contacts" ? 600 : 500,
                px: 1.5,
                py: 1,
                width: "100%",
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              Organizer Contacts
            </Button>

            {/* Email Campaigns Button */}
            <Button
              className={`navButton ${pathname === "/email" ? "navButtonActive" : ""}`}
              startIcon={<Mail size={16} />}
              onClick={() => {
                router.push("/email");
                if (onClose) onClose();
              }}
              sx={{
                justifyContent: "flex-start",
                color: pathname === "/email" ? "#fff" : "var(--muted)",
                bgcolor: pathname === "/email" ? "var(--sidebar-active-bg)" : "transparent",
                fontWeight: pathname === "/email" ? 600 : 500,
                px: 1.5,
                py: 1,
                width: "100%",
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              Email Campaigns
            </Button>

            {/* Sync Manager Button */}
            <Button
              className={`navButton ${pathname === "/sync" ? "navButtonActive" : ""}`}
              startIcon={<RefreshCw size={16} />}
              onClick={() => {
                router.push("/sync");
                if (onClose) onClose();
              }}
              sx={{
                justifyContent: "flex-start",
                color: pathname === "/sync" ? "#fff" : "var(--muted)",
                bgcolor: pathname === "/sync" ? "var(--sidebar-active-bg)" : "transparent",
                fontWeight: pathname === "/sync" ? 600 : 500,
                px: 1.5,
                py: 1,
                width: "100%",
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              Calendar Sync Hub
            </Button>
          </Stack>
        </Box>

        {/* Menu Group 2: Administration */}
        <Box>
          <Typography 
            sx={{ 
              color: "var(--sidebar-muted)", 
              fontSize: "0.65rem", 
              fontWeight: 700, 
              letterSpacing: "0.08em", 
              textTransform: "uppercase", 
              px: 1.5,
              mb: 1
            }}
          >
            Administration
          </Typography>
          <Stack spacing={0.5}>
            <Button
              className="navButton"
              disabled
              startIcon={<Settings size={16} />}
              sx={{
                transition: "all 0.15s ease",
                justifyContent: "flex-start",
                color: "var(--sidebar-muted) !important",
                opacity: 0.4,
                cursor: "not-allowed",
                px: 1.5,
                py: 1,
                width: "100%",
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              System Settings
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/* Bottom Panel (Status Card + Operator Profile) */}
      <Stack spacing={1.5} sx={{ mt: "auto", pt: 2 }}>
        {/* Status Indicator Card */}
        <Box 
          sx={{ 
            p: 1.25, 
            borderRadius: "10px", 
            border: "1px solid var(--sidebar-line)", 
            bgcolor: "rgba(14, 165, 233, 0.03)",
            display: "flex",
            gap: 1.25,
            alignItems: "flex-start"
          }}
        >
          <ShieldCheck size={16} style={{ color: "var(--brand)", marginTop: 2, flexShrink: 0 }} />
          <Box sx={{ width: "100%" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>Sync Status</Typography>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "var(--success)",
                  boxShadow: "0 0 8px var(--success)",
                  animation: "pulseDot 1.6s infinite",
                  "@keyframes pulseDot": {
                    "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)" },
                    "70%": { transform: "scale(1)", boxShadow: "0 0 0 6px rgba(16, 185, 129, 0)" },
                    "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" },
                  },
                }}
              />
            </Stack>
            <Typography sx={{ color: "var(--sidebar-muted)", fontSize: "0.68rem", mt: 0.25, lineHeight: 1.3 }}>
              Scrapers active.
            </Typography>
          </Box>
        </Box>

        {/* Profile Card */}
        <Box 
          sx={{ 
            p: 1.25, 
            borderRadius: "10px", 
            border: "1px solid var(--sidebar-line)", 
            bgcolor: "rgba(255, 255, 255, 0.02)"
          }}
        >
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
            <Box className="avatarContainer" sx={{ position: "relative" }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "0.75rem",
                }}
              >
                OP
              </Box>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "var(--success)",
                  border: "1.5px solid var(--sidebar)",
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                }}
              />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700, lineHeight: 1.2 }}>
                CRM Operator
              </Typography>
              <Typography sx={{ color: "var(--sidebar-muted)", fontSize: "0.65rem", mt: 0.15, fontWeight: 500 }}>
                Administrator
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}


