"use client";

import { useRouter, usePathname } from "next/navigation";
import { Box, Button, Stack, Typography, IconButton } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Mail,
  RefreshCw,
  Settings,
  Users,
  LogOut,
  Image as ImageIcon,
} from "lucide-react";

type SidebarProps = {
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

export default function Sidebar({ variant = "desktop", onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const userName = user?.name || "CRM Operator";
  const userRole = (user as any)?.role || "Administrator";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "OP";

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
                color: pathname === "/" ? "var(--brand-dark)" : "var(--muted)",
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
                color: pathname === "/contacts" ? "var(--brand-dark)" : "var(--muted)",
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
                color: pathname === "/email" ? "var(--brand-dark)" : "var(--muted)",
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

            {/* Image Library Button */}
            <Button
              className={`navButton ${pathname === "/images" ? "navButtonActive" : ""}`}
              startIcon={<ImageIcon size={16} />}
              onClick={() => {
                router.push("/images");
                if (onClose) onClose();
              }}
              sx={{
                justifyContent: "flex-start",
                color: pathname === "/images" ? "var(--brand-dark)" : "var(--muted)",
                bgcolor: pathname === "/images" ? "var(--sidebar-active-bg)" : "transparent",
                fontWeight: pathname === "/images" ? 600 : 500,
                px: 1.5,
                py: 1,
                width: "100%",
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              Image Library
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
                color: pathname === "/sync" ? "var(--brand-dark)" : "var(--muted)",
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
        {/* Profile Card */}
        <Box 
          sx={{ 
            p: 1.25, 
            borderRadius: "10px", 
            border: "1px solid var(--sidebar-line)", 
            bgcolor: "rgba(0, 0, 0, 0.02)"
          }}
        >
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", minWidth: 0, flex: 1 }}>
              <Box className="avatarContainer" sx={{ position: "relative", flexShrink: 0 }}>
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
                  {userInitials}
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
                <Typography sx={{ color: "var(--sidebar-text)", fontSize: "0.75rem", fontWeight: 700, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {userName}
                </Typography>
                <Typography sx={{ color: "var(--sidebar-muted)", fontSize: "0.65rem", mt: 0.15, fontWeight: 500, textTransform: "capitalize" }}>
                  {userRole.toLowerCase()}
                </Typography>
              </Box>
            </Stack>
            <IconButton 
              size="small" 
              onClick={() => signOut({ callbackUrl: "/login" })} 
              sx={{ 
                color: "var(--sidebar-muted)", 
                "&:hover": { 
                  color: "var(--danger)", 
                  bgcolor: "var(--danger-bg)" 
                } 
              }}
              title="ออกจากระบบ"
            >
              <LogOut size={16} />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}


