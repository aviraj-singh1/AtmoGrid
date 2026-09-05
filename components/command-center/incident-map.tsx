"use client";
import { useEffect, useRef, useState } from "react";
import type { Map as MapType, Marker } from "maplibre-gl";
import { Crosshair, MapPin } from "lucide-react";
import { Incident } from "@/types/domain";
import { PriorityBadge, VerificationBadge } from "@/components/shared/status";
export default function IncidentMap({
  incidents,
  selected,
  onSelect,
}: {
  incidents: Incident[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapType | null>(null);
  const markers = useRef<Marker[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const callback = useRef(onSelect);
  callback.current = onSelect;
  useEffect(() => {
    let cancelled = false;
    import("maplibre-gl")
      .then((maplibre) => {
        if (cancelled || !container.current) return;
        try {
          maplibre.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
          const instance = new maplibre.Map({
            container: container.current,
            center: [80.5, 23.5],
            zoom: 2.8,
            minZoom: 2.2,
            maxZoom: 7,
            attributionControl: false,
            style: {
              version: 8,
              sources: {
                countries: { type: "geojson", data: "/world.geojson" },
              },
              layers: [
                {
                  id: "background",
                  type: "background",
                  paint: { "background-color": "#0a1622" },
                },
                {
                  id: "land",
                  type: "fill",
                  source: "countries",
                  paint: { "fill-color": "#172838", "fill-opacity": 0.95 },
                },
                {
                  id: "borders",
                  type: "line",
                  source: "countries",
                  paint: { "line-color": "#3a5063", "line-width": 0.8 },
                },
              ],
            },
          });
          map.current = instance;
          instance.addControl(
            new maplibre.NavigationControl({ showCompass: false }),
            "top-right",
          );
          instance.on("load", () => {
            if (!cancelled) setReady(true);
          });
          instance.on("error", () => {
            if (!cancelled) setFailed(true);
          });
        } catch {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    if (!ready || !map.current) return;
    let disposed = false;
    import("maplibre-gl").then((maplibre) => {
      if (disposed || !map.current) return;
      markers.current.forEach((x) => x.remove());
      markers.current = incidents.map((x) => {
        const el = document.createElement("button");
        el.className = `geo-marker city-${x.city.toLowerCase()} ${x.priority.toLowerCase()} ${x.id === selected ? "selected" : ""}`;
        el.setAttribute(
          "aria-label",
          `${x.title}, ${x.city}, ${x.priority}, ${x.independentGroupCount} independent groups`,
        );
        const dot = document.createElement("span");
        dot.className = "marker-dot";
        const label = document.createElement("span");
        label.className = "marker-label";
        label.textContent = x.city;
        el.append(dot, label);
        el.addEventListener("click", () => callback.current(x.id));
        el.addEventListener("mouseenter", () => callback.current(x.id));
        return new maplibre.Marker({ element: el, anchor: "left" })
          .setLngLat([x.longitude, x.latitude])
          .addTo(map.current!);
      });
    });
    return () => {
      disposed = true;
    };
  }, [incidents, selected, ready]);
  const active = incidents.find((x) => x.id === selected);
  return (
    <section className="panel map-panel">
      <div className="panel-heading">
        <h2>
          <MapPin size={16} />
          Geographic situation
        </h2>
        <span>INDIA · {incidents.length} MAPPED</span>
      </div>
      <div className="map-stage">
        <div
          ref={container}
          className="map-canvas"
          aria-label="Interactive India incident map"
        />
        {!ready && !failed && (
          <div className="map-loading">Preparing geographic context…</div>
        )}
        {failed && (
          <div className="map-fallback">
            <p>Geographic view unavailable · Select a locality</p>
            {incidents.map((x) => (
              <button key={x.id} onClick={() => onSelect(x.id)}>
                <MapPin size={14} />
                {x.city} · {x.priority}
              </button>
            ))}
          </div>
        )}
        <div className="map-coordinate">
          NATIONAL SITUATION
          <br />
          <span>23.5° N / 80.5° E</span>
        </div>
        <div className="map-country">I N D I A</div>
        <span className="ocean-label">
          ARABIAN
          <br />
          SEA
        </span>
        <span className="ocean-label bay">
          BAY OF
          <br />
          BENGAL
        </span>
        <button
          className="map-reset icon-button"
          title="Reset India view"
          aria-label="Reset India view"
          onClick={() =>
            map.current?.flyTo({
              center: [80.5, 23.5],
              zoom: 2.8,
              duration: 500,
            })
          }
        >
          <Crosshair size={17} />
        </button>
        {active && (
          <div className="map-incident" aria-live="polite">
            <div className="map-popup-title">
              <span
                className={`priority-dot ${active.priority.toLowerCase()}`}
              />
              <strong>{active.title}</strong>
              <small>{active.id}</small>
            </div>
            <p>{active.location}</p>
            <div>
              <PriorityBadge priority={active.priority} />
              <VerificationBadge status={active.verificationStatus} />
            </div>
            <footer>
              <span>
                <b>{active.independentGroupCount}</b> independent evidence
                groups
              </span>
              <span>{active.locationBasis}</span>
            </footer>
          </div>
        )}
        <div className="map-attribution">
          Natural Earth / geo-countries · Illustrative boundaries
        </div>
      </div>
      <div className="map-legend">
        <span>
          <i className="priority-dot p1" />
          P1 · Review now
        </span>
        <span>
          <i className="priority-dot p2" />
          P2 · Attention
        </span>
        <span>
          <i className="priority-dot p3" />
          P3 · Monitor
        </span>
        <small>Internal operational priority</small>
      </div>
    </section>
  );
}
