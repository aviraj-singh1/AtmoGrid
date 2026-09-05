import Link from "next/link";
import { ArrowLeft, Layers3 } from "lucide-react";
import { PageHeader } from "./status";
export function PhasePlaceholder({
  title,
  description,
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
        </div>
        <span className="demo-tag">DEMO ENVIRONMENT</span>
        <h2>Not included in this demonstration</h2>
        <p>{description}</p>
        {reference && <code>{reference}</code>}
        <div className="placeholder-note">
          This module is outside the scope of the current prototype demonstration.
          The Command Center provides the national operational overview.
        </div>
        <Link className="primary-button" href="/">
          <ArrowLeft size={16} />
          Back to Command Center
        </Link>
      </section>
    </>
  );
}
