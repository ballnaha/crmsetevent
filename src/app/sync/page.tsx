import { Suspense } from "react";
import AppFrame from "../components/AppFrame";
import SetEventThailandDashboard from "../components/SetEventThailandDashboard";

export default function SyncPage() {
  return (
    <AppFrame>
      <Suspense fallback={
        <div style={{ color: "var(--muted)", padding: "24px", fontSize: "0.85rem" }}>
          Loading Sync Center...
        </div>
      }>
        <SetEventThailandDashboard />
      </Suspense>
    </AppFrame>
  );
}

