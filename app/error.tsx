"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="placeholder panel">
      <h1>Workspace could not load</h1>
      <p>Please retry the local demo.</p>
      <button className="primary-button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
