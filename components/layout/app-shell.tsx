"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  Bell,
  Blocks,
  ChevronRight,
  Command,
  Globe2,
  LayoutDashboard,
  RadioTower,
  Repeat2,
  Settings2,
  ShieldCheck,
  Siren,
} from "lucide-react";
const navigation = [
  { href: "/", label: "Command Center", icon: LayoutDashboard },
  { href: "/incidents", label: "Incidents", icon: Siren },
  { href: "/evidence-review", label: "Evidence Review", icon: ShieldCheck },
  { href: "/replay", label: "Scenario Replay", icon: Repeat2 },
  { href: "/source-monitor", label: "Source Monitor", icon: RadioTower },
  { href: "/admin", label: "Admin", icon: Settings2 },
];
export function AppSidebar() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="AtmoGrid Command Center">
        <div className="brand-icon">
          <Blocks size={25} />
        </div>
        <div>
          <strong>
            Atmo<span>Grid</span>
          </strong>
          <small>WEATHER EVIDENCE INTELLIGENCE</small>
        </div>
      </Link>
      <div className="nav-label">OPERATIONS WORKSPACE</div>
      <nav>
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={
              (
                href === "/"
                  ? path === "/" || path === "/command-center"
                  : path.startsWith(href)
              )
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Icon size={18} />
            <span>{label}</span>
            {href === "/incidents" && <small>14</small>}
          </Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="scope-card">
          <Globe2 size={19} />
          <strong>National operations</strong>
          <p>India · All regions</p>
          <span className="small-live">
            <i /> Demo environment
          </span>
        </div>
        <div className="sih-label">
          SIH 2026 <span>PROTOTYPE</span>
        </div>
        <p className="sidebar-footnote">
          National Weather Evidence &<br />
          Ground Intelligence Platform
        </p>
      </div>
    </aside>
  );
}
export function TopBar() {
  const [notice, setNotice] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const mode = path === "/replay" ? "REPLAY" : "LIVE";
  const title =
    path === "/report"
      ? "Citizen Observation"
      : navigation.find((x) => x.href !== "/" && path.startsWith(x.href))
          ?.label || "Command Center";
  return (
    <header className="topbar">
      <div className="breadcrumb">
        Operations <ChevronRight size={13} />
        <strong>{title}</strong>
      </div>
      <div className="topbar-tools">
        <span className="scope">
          <Globe2 size={14} /> India
        </span>
        <span className="system-status">
          <i />
          System nominal
        </span>
        <Link href="/report" className="report-topbar-link">
          <Activity size={13} /> Report observation
        </Link>
        <div className="mode-toggle" aria-label="Display mode">
          {["LIVE", "REPLAY"].map((x) => (
            <button
              key={x}
              aria-pressed={mode === x}
              onClick={() => router.push(x === "REPLAY" ? "/replay" : "/")}
              className={mode === x ? "selected" : ""}
            >
              {x === "LIVE" && <i />}
              {x}
            </button>
          ))}
        </div>
        <div className="clock">
          17:33:00 <span>IST</span>
          <small>
            {mode === "LIVE"
              ? "05 SEP 2026 · SIMULATED"
              : "JAIPUR SCENARIO · SIMULATED"}
          </small>
        </div>
        <div className="notice-wrap">
          <button
            className="icon-button"
            aria-label="Notifications"
            aria-expanded={notice}
            onClick={() => setNotice(!notice)}
          >
            <Bell size={18} />
            <b />
          </button>
          {notice && (
            <div className="notification-panel">
              <strong>Demo notifications</strong>
              <p>2 P1 incidents require review.</p>
              <small>Notifications are simulated. No live connection.</small>
            </div>
          )}
        </div>
        <div className="avatar" title="Demo operator">
          OP
        </div>
      </div>
    </header>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <AppSidebar />
      <div className="workspace">
        <TopBar />
        <main>{children}</main>
        <footer className="app-footer">
          <span>
            <Command size={12} /> AtmoGrid · Weather evidence, operational
            clarity.
          </span>
          <span>Internal priorities · Not official IMD warnings</span>
        </footer>
      </div>
    </div>
  );
}
