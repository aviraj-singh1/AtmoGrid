"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  initialReplaySnapshot,
  jaipurReplayEvents,
  replayDurationSeconds,
} from "@/data/mock-jaipur-replay";

export type ReplaySpeed = 0.5 | 1 | 2 | 4;
export type ReplayStatus = "IDLE" | "PLAYING" | "PAUSED" | "COMPLETE";

function parseScenarioTime(value: string) {
  const [hours, minutes, seconds] = value.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatScenarioTime(elapsed: number) {
  let currentIndex = 0;
  jaipurReplayEvents.forEach((event, index) => {
    if (event.offsetSeconds <= elapsed) currentIndex = index;
  });
  const current = jaipurReplayEvents[currentIndex];
  const next = jaipurReplayEvents[currentIndex + 1] ?? current;
  const replaySpan = Math.max(1, next.offsetSeconds - current.offsetSeconds);
  const progress = Math.min(1, (elapsed - current.offsetSeconds) / replaySpan);
  const currentTime = parseScenarioTime(current.scenarioTime);
  const nextTime = parseScenarioTime(next.scenarioTime);
  const total = Math.round(currentTime + (nextTime - currentTime) * progress);
  const hours = Math.floor(total / 3600) % 24;
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

export function useReplayEngine() {
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<ReplayStatus>("IDLE");
  const [speed, setSpeed] = useState<ReplaySpeed>(1);

  useEffect(() => {
    if (status !== "PLAYING") return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        return Math.min(replayDurationSeconds, current + 0.25 * speed);
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [speed, status]);

  useEffect(() => {
    if (status === "PLAYING" && elapsed >= replayDurationSeconds)
      setStatus("COMPLETE");
  }, [elapsed, status]);

  const currentIndex = useMemo(() => {
    let index = 0;
    jaipurReplayEvents.forEach((event, eventIndex) => {
      if (event.offsetSeconds <= elapsed) index = eventIndex;
    });
    return index;
  }, [elapsed]);

  const currentEvent = jaipurReplayEvents[currentIndex];
  const visibleEvents = jaipurReplayEvents.slice(0, currentIndex + 1);
  const progress = Math.round((elapsed / replayDurationSeconds) * 100);

  const start = useCallback(() => {
    setElapsed(0);
    setStatus("PLAYING");
  }, []);
  const pause = useCallback(() => setStatus("PAUSED"), []);
  const resume = useCallback(() => setStatus("PLAYING"), []);
  const reset = useCallback(() => {
    setElapsed(0);
    setStatus("IDLE");
    setSpeed(1);
  }, []);
  const stepForward = useCallback(() => {
    const next = jaipurReplayEvents.find((event) => event.offsetSeconds > elapsed);
    if (!next) {
      setElapsed(replayDurationSeconds);
      setStatus("COMPLETE");
      return;
    }
    setElapsed(next.offsetSeconds);
    setStatus(next.offsetSeconds === replayDurationSeconds ? "COMPLETE" : "PAUSED");
  }, [elapsed]);

  return {
    elapsed,
    status,
    speed,
    setSpeed,
    currentIndex,
    currentEvent,
    visibleEvents,
    snapshot: currentEvent?.snapshot ?? initialReplaySnapshot,
    progress,
    scenarioTime: formatScenarioTime(elapsed),
    start,
    pause,
    resume,
    reset,
    stepForward,
  };
}
