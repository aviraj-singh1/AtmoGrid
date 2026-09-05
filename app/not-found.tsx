import Link from "next/link";
export default function NotFound() {
  return (
    <div className="placeholder panel">
      <span className="eyebrow">404 / OUTSIDE OPERATIONAL SCOPE</span>
      <h1>Page not found</h1>
      <p>This route or incident is not part of the demo.</p>
      <Link className="primary-button" href="/">
        Return to Command Center
      </Link>
    </div>
  );
}
