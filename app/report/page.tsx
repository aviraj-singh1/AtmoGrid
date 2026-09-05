import type { Metadata } from "next";
import { CitizenReport } from "@/components/citizen-report/citizen-report";

export const metadata: Metadata = {
  title: "Report Ground Weather Condition | AtmoGrid",
  description: "Submit a local demonstration observation for weather evidence review.",
};

export default function Page() {
  return <CitizenReport />;
}
