"use client";

import { Box, IconButton } from "@mui/material";
import { Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <Box component="header" className="appHeader">
      <IconButton className="mobileMenuButton" onClick={onMenuClick} sx={{ display: { sm: "none" } }}>
        <Menu size={18} />
      </IconButton>
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
