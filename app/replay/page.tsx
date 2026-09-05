import type { Metadata } from "next";
import { ReplayLab } from "@/components/replay/replay-lab";

export const metadata: Metadata = {
  title: "Jaipur Evidence Replay | AtmoGrid",
  description:
    "A simulated replay of AtmoGrid reconstructing the Jaipur urban flooding incident from incoming evidence.",
};

export default function Page() {
  return <ReplayLab />;
}
