"use client";

import { Box, Drawer } from "@mui/material";
import { useState, Suspense } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type AppFrameProps = {
  children: React.ReactNode;
};

export default function AppFrame({ children }: AppFrameProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box className="appFrame">
      <Box className="desktopSidebar">
        <Suspense fallback={<Box className="appSidebar" sx={{ opacity: 0.5 }} />}>
          <Sidebar />
        </Suspense>
      </Box>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            className: "mobileDrawerPaper",
          },
        }}
      >
        <Suspense fallback={<Box className="appSidebar" sx={{ opacity: 0.5 }} />}>
          <Sidebar variant="mobile" onClose={() => setMobileOpen(false)} />
        </Suspense>
      </Drawer>
      <Box className="mainColumn">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <Box component="main" className="mainContent">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

