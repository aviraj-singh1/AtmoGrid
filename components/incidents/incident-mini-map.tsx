"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapType, Marker } from "maplibre-gl";
import { Crosshair, MapPinned } from "lucide-react";
import { jaipurEvidence } from "@/data/mock-evidence";
import { IncidentEvidenceItem } from "@/types/domain";
import {
  EvidenceRelationshipBadge,
  LocationProvenanceBadge,
} from "./evidence-badges";

const plottedEvidence = jaipurEvidence.filter(
  (
    item,
  ): item is IncidentEvidenceItem & { latitude: number; longitude: number } =>
    item.latitude !== undefined && item.longitude !== undefined,
);

export default function IncidentMiniMap({
  replayStage,
  compact = false,
}: {
  replayStage?: number;
  compact?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapType | null>(null);
  const markers = useRef<Marker[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<IncidentEvidenceItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("maplibre-gl")
      .then((maplibre) => {
        if (cancelled || !container.current) return;
        try {
          maplibre.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
          const instance = new maplibre.Map({
            container: container.current,
            center: [75.8, 26.892],
            zoom: 11.8,
            minZoom: 9,
            maxZoom: 15,
            attributionControl: false,
            style: {
              version: 8,
              sources: {
                countries: { type: "geojson", data: "/world.geojson" },
              },
              layers: [
                {
                  id: "detail-bg",
                  type: "background",
                  paint: { "background-color": "#0a1622" },
                },
                {
                  id: "detail-land",
                  type: "fill",
                  source: "countries",
                  paint: { "fill-color": "#152838", "fill-opacity": 0.92 },
                },
                {
                  id: "detail-border",
                  type: "line",
                  source: "countries",
                  paint: { "line-color": "#355268", "line-width": 0.7 },
                },
              ],
            },
          });
          map.current = instance;
          instance.addControl(
            new maplibre.NavigationControl({ showCompass: false }),
            "top-right",
          );
          instance.on("load", () => !cancelled && setReady(true));
          instance.on("error", () => !cancelled && setFailed(true));
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
      markers.current.forEach((marker) => marker.remove());
      const visibleEvidence =
        replayStage === undefined
          ? plottedEvidence
          : plottedEvidence.filter((item) => {
              if (replayStage < 1) return false;
              if (replayStage === 1) return item.id === "EV-001";
              if (replayStage < 5) return ["EV-001", "EV-002", "EV-003"].includes(item.id);
              if (replayStage < 6) return item.id !== "EV-006" && item.id !== "EV-007";
              if (replayStage < 7) return item.id !== "EV-007";
              return true;
            });
      const nextMarkers: Marker[] = [];
      if (replayStage === undefined || replayStage >= 2) {
        const eventMarker = document.createElement("button");
        eventMarker.className = "investigation-marker event-center";
        eventMarker.setAttribute("aria-label", "Urban flooding event center");
        eventMarker.innerHTML = "<span></span><b>EVENT CENTER</b>";
        eventMarker.addEventListener("click", () => setSelected(null));
        nextMarkers.push(
          new maplibre.Marker({ element: eventMarker, anchor: "center" })
            .setLngLat([75.8, 26.89])
            .addTo(map.current),
        );
      }
      nextMarkers.push(
        ...visibleEvidence.map((item) => {
          const el = document.createElement("button");
          const markerType =
            item.sourceFamily === "Weather Observation"
              ? "physical"
              : item.locationProvenance === "GPS_CONFIRMED"
                ? "gps"
                : "inferred";
          el.className = `investigation-marker ${markerType}`;
          el.setAttribute("aria-label", `${item.title}, ${item.timestamp}`);
          el.innerHTML = `<span></span>`;
          el.addEventListener("click", () => setSelected(item));
          return new maplibre.Marker({ element: el, anchor: "center" })
            .setLngLat([item.longitude, item.latitude])
            .addTo(map.current!);
        }),
      );
      markers.current = nextMarkers;
    });
    return () => {
      disposed = true;
    };
  }, [ready, replayStage]);

  return (
    <section className={`panel investigation-map-panel ${compact ? "compact" : ""}`}>
      <div className="panel-heading">
        <h2>
          <MapPinned size={16} /> Incident geography
        </h2>
        <span>JAIPUR · APPROXIMATE LOCALITY</span>
      </div>
      <div className="investigation-map-stage">
        <div
          ref={container}
          className="map-canvas"
          aria-label="Jaipur evidence map"
        />
        {!ready && !failed && (
          <div className="map-loading">Locating evidence…</div>
        )}
        {failed && (
          <div className="map-fallback">Geographic view unavailable</div>
        )}
        <button
          className="map-reset icon-button"
          aria-label="Reset Jaipur map"
          title="Reset Jaipur map"
          onClick={() =>
            map.current?.flyTo({ center: [75.8, 26.892], zoom: 11.8 })
          }
        >
          <Crosshair size={16} />
        </button>
        <div className="detail-map-grid" aria-hidden="true" />
        {selected ? (
          <div className="observation-popup" aria-live="polite">
            <header>
              <strong>{selected.title}</strong>
              <span>{selected.timestamp} IST</span>
            </header>
            <p>
              {selected.sourceFamily} · {selected.mediaType}
            </p>
            <div>
              <LocationProvenanceBadge
                provenance={selected.locationProvenance}
              />
              <EvidenceRelationshipBadge relationship={selected.relationship} />
            </div>
          </div>
        ) : (
          <div className="observation-popup event-popup">
            <header>
              <strong>{replayStage !== undefined && replayStage < 2 ? "No event formed" : "Urban Flooding"}</strong>
              <span>{replayStage !== undefined && replayStage < 2 ? "WAITING" : "JPR-FLD-001"}</span>
            </header>
            <p>{replayStage !== undefined && replayStage < 2 ? "Markers appear as evidence gains location support." : "Tonk Road · Event center is approximate, not a GPS claim."}</p>
          </div>
        )}
      </div>
      <div className="detail-map-legend">
        <span>
          <i className="event-center" />
          Event center
        </span>
        <span>
          <i className="gps" />
          GPS confirmed
        </span>
        <span>
          <i className="inferred" />
          Text / landmark inferred
        </span>
        <span>
          <i className="physical" />
          Weather observation
        </span>
      </div>
    </section>
  );
}
