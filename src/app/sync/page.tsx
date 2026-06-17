import { Suspense } from "react";
import AppFrame from "../components/AppFrame";
import EventSyncDashboard from "../components/EventSyncDashboard";

export default function SyncPage() {
  return (
    <AppFrame>
      <Suspense fallback={
        <div style={{ color: "var(--muted)", padding: "24px", fontSize: "0.85rem" }}>
          Loading Sync Center...
        </div>
      }>
        <EventSyncDashboard />
      </Suspense>
    </AppFrame>
  );
}

