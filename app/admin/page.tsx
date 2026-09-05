import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/admin-panel";

export const metadata: Metadata = {
  title: "Administration | AtmoGrid",
  description: "Manage local prototype connector, processing and audit settings.",
};

export default function Page() {
  return <AdminPanel />;
}
