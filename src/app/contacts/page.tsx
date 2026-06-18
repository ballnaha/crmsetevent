import { Suspense } from "react";
import AppFrame from "../components/AppFrame";
import ContactsPage from "../components/ContactsPage";

export default function ContactsRoute() {
  return (
    <AppFrame>
      <Suspense fallback={
        <div style={{ color: "var(--muted)", padding: "24px", fontSize: "0.85rem" }}>
          Loading Contacts...
        </div>
      }>
        <ContactsPage />
      </Suspense>
    </AppFrame>
  );
}
