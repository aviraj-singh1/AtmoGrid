import Link from "next/link";
import { ArrowLeft, Layers3, LockKeyhole } from "lucide-react";
import { PageHeader } from "./status";
export function PhasePlaceholder({
  title,
  description,
  phase = "a future phase",
  reference,
}: {
  title: string;
  description: string;
  phase?: string;
  reference?: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow="AT M O G R I D / WORKSPACE"
        title={title}
        description={description}
      />
      <section className="placeholder panel">
        <div className="placeholder-art">
          <Layers3 size={48} />
          <LockKeyhole size={20} />
        </div>
        <span className="demo-tag">FOUNDATION READY</span>
        <h2>Coming in {phase}</h2>
        <p>{description}</p>
        {reference && <code>{reference}</code>}
        <div className="placeholder-note">
          The Phase 1 Command Center provides the simulated operational
          overview. This module is reserved for a subsequent build.
        </div>
        <Link className="primary-button" href="/">
          <ArrowLeft size={16} />
          Back to Command Center
        </Link>
      </section>
    </>
  );
}
