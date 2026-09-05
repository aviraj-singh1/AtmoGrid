"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Check, CheckCircle2, FileImage, LocateFixed, MapPin, RotateCcw, Send, ShieldCheck, Upload, Video } from "lucide-react";
import { citizenDemoLocation, citizenEventTypes, citizenImpactOptions, citizenProcessingSteps } from "@/data/mock-citizen-submissions";
import { CitizenObservation, CitizenSubmissionState } from "@/types/domain";

const initialDraft = {
  description: "",
  eventType: "Auto Detect",
  location: "",
  locationProvenance: "NOT ATTACHED",
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,
  observedAt: "2026-09-05T17:33",
  impacts: [] as string[],
  directObservation: false,
  additionalNotes: "",
  mediaName: "",
  mediaType: "",
};

export function CitizenReport() {
  const [draft, setDraft] = useState(initialDraft);
  const [state, setState] = useState<CitizenSubmissionState>("DRAFT");
  const [processingStep, setProcessingStep] = useState(-1);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<CitizenObservation | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (state !== "PROCESSING") return;
    const timer = window.setTimeout(() => {
      if (processingStep < citizenProcessingSteps.length - 1) {
        setProcessingStep((current) => current + 1);
        return;
      }
      const category = draft.eventType === "Auto Detect" ? "Flooding · demo classification" : draft.eventType;
      setSubmitted({ id: "OBS-CIT-2026-0042", description: draft.description, eventType: category, location: draft.location, latitude: draft.latitude, longitude: draft.longitude, locationProvenance: draft.locationProvenance, observedAt: draft.observedAt, mediaName: draft.mediaName || undefined, mediaType: draft.mediaType || undefined, impacts: draft.impacts, directObservation: draft.directObservation, additionalNotes: draft.additionalNotes || undefined, verificationStatus: "UNVERIFIED" });
      setState("SUBMITTED");
    }, 420);
    return () => window.clearTimeout(timer);
  }, [draft, processingStep, state]);

  const useDemoLocation = () => setDraft((current) => ({ ...current, location: citizenDemoLocation.label, latitude: citizenDemoLocation.latitude, longitude: citizenDemoLocation.longitude, locationProvenance: citizenDemoLocation.provenance }));
  const toggleImpact = (impact: string) => setDraft((current) => ({ ...current, impacts: current.impacts.includes(impact) ? current.impacts.filter((item) => item !== impact) : [...current.impacts, impact] }));
  const selectMedia = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setDraft((current) => ({ ...current, mediaName: file.name, mediaType: file.type || "Local media file" }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = [];
    if (draft.description.trim().length < 10) nextErrors.push("Describe the observed condition in at least 10 characters.");
    if (!draft.location.trim()) nextErrors.push("Attach or enter an observation location.");
    setErrors(nextErrors);
    if (nextErrors.length) return;
    setProcessingStep(0);
    setState("PROCESSING");
  };
  const reset = () => {
    setDraft(initialDraft);
    setState("DRAFT");
    setProcessingStep(-1);
    setErrors([]);
    setSubmitted(null);
    setExpanded(false);
  };

  if (state === "SUBMITTED" && submitted) {
    return (
      <div className="citizen-page citizen-success">
        <header><div className="citizen-brand-mark"><ShieldCheck size={24} /></div><span>ATMOGRID CITIZEN OBSERVATION</span></header>
        <section className="citizen-success-card">
          <CheckCircle2 size={42} />
          <span>OBSERVATION RECEIVED</span>
          <h1>Observation submitted successfully.</h1>
          <p>Your report is now one unverified evidence item queued for AtmoGrid analysis.</p>
          <div className="citizen-trust-result"><strong>UNVERIFIED</strong><span>New citizen observations must be corroborated before contributing strongly to an incident.</span></div>
          <dl>
            <div><dt>Observation ID</dt><dd>{submitted.id}</dd></div>
            <div><dt>Submitted time</dt><dd>05 Sep 2026 · {submitted.observedAt.slice(11)} IST</dd></div>
            <div><dt>Event category</dt><dd>{submitted.eventType}</dd></div>
            <div><dt>Location</dt><dd>{submitted.location}</dd></div>
            <div><dt>Location provenance</dt><dd>{submitted.locationProvenance}</dd></div>
            <div><dt>Media attached</dt><dd>{submitted.mediaName || "None"}</dd></div>
            <div><dt>Impact tags</dt><dd>{submitted.impacts.join(" · ") || "None selected"}</dd></div>
            <div><dt>Next</dt><dd>Queued for AtmoGrid evidence analysis</dd></div>
          </dl>
          {expanded && <div className="citizen-submission-detail"><span>SUBMITTED OBSERVATION</span><blockquote>{submitted.description}</blockquote><p>Direct observation: {submitted.directObservation ? "Declared" : "Not declared"}</p></div>}
          <div className="citizen-success-actions"><button onClick={() => setExpanded(!expanded)}>{expanded ? "HIDE SUBMISSION" : "VIEW SUBMISSION"}</button><Link href="/">RETURN TO COMMAND CENTER</Link><button onClick={reset}>SUBMIT ANOTHER</button><Link href="/evidence-review">OPEN EVIDENCE REVIEW</Link></div>
        </section>
        <section className="citizen-next-flow"><span>Citizen observation</span><b>→</b><span>Unverified evidence</span><b>→</b><span>Deduplication</span><b>→</b><span>Source independence</span><b>→</b><span>Event matching</span><b>→</b><span>Corroboration</span></section>
      </div>
    );
  }

  return (
    <div className="citizen-page">
      <header className="citizen-page-heading"><div><div className="eyebrow">CITIZEN OBSERVATION / PHASE 05</div><h1>Report Ground Weather Condition</h1><p>Submit a location-aware observation to AtmoGrid for verification and incident correlation.</p></div><span className="demo-tag">LOCAL DEMO SUBMISSION</span></header>
      <div className="citizen-trust-note"><ShieldCheck size={18} /><div><strong>Citizen report ≠ verified incident</strong><p>Your observation becomes one evidence item. AtmoGrid checks duplication, provenance, geo-time consistency and independent corroboration before it affects incident verification.</p></div></div>
      {state === "PROCESSING" ? (
        <section className="citizen-processing" aria-live="polite"><span>PROCESSING LOCAL OBSERVATION</span><h2>Preparing evidence for review</h2><div>{citizenProcessingSteps.map((step, index) => <div className={index <= processingStep ? "complete" : ""} key={step}>{index < processingStep ? <Check size={15} /> : <i />}{step}</div>)}</div><p>No data leaves this browser in the prototype.</p></section>
      ) : (
        <form className="citizen-form" onSubmit={submit}>
          {errors.length > 0 && <div className="citizen-errors" role="alert">{errors.map((error) => <p key={error}>{error}</p>)}</div>}
          <section className="citizen-form-main">
            <label className="citizen-description"><span>WHAT IS HAPPENING? <b>REQUIRED</b></span><textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Water has entered the road near Tonk Road and vehicles are getting stuck..." /></label>
            <div className="citizen-two-fields"><label><span>EVENT TYPE <small>OPTIONAL</small></span><select value={draft.eventType} onChange={(event) => setDraft({ ...draft, eventType: event.target.value })}>{citizenEventTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label><span>OBSERVATION TIME</span><input type="datetime-local" value={draft.observedAt} onChange={(event) => setDraft({ ...draft, observedAt: event.target.value })} /></label></div>
            <fieldset className="citizen-location"><legend>LOCATION <b>REQUIRED</b></legend><div className="citizen-location-actions"><button type="button" onClick={useDemoLocation}><LocateFixed size={14} /> USE DEMO LOCATION</button><button type="button" onClick={() => setDraft({ ...draft, locationProvenance: "CITIZEN MAP PIN / DEMO" })}><MapPin size={14} /> SELECT ON MAP</button></div><input aria-label="Enter observation location" value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value, locationProvenance: "CITIZEN TEXT ENTRY" })} placeholder="Enter city, locality or landmark" />{draft.location && <div className="citizen-location-result"><MapPin size={15} /><div><strong>{draft.location}</strong><span>{draft.latitude ? `${draft.latitude.toFixed(2)} N · ${draft.longitude?.toFixed(2)} E · ` : ""}{draft.locationProvenance}</span></div></div>}</fieldset>
            <fieldset className="citizen-impacts"><legend>OBSERVED IMPACT <small>SELECT ALL THAT APPLY</small></legend><div>{citizenImpactOptions.map((impact) => <button type="button" className={draft.impacts.includes(impact) ? "selected" : ""} aria-pressed={draft.impacts.includes(impact)} onClick={() => toggleImpact(impact)} key={impact}>{draft.impacts.includes(impact) && <Check size={10} />}{impact}</button>)}</div></fieldset>
          </section>
          <aside className="citizen-form-aside">
            <section className="citizen-media"><span>PHOTO OR VIDEO <small>OPTIONAL</small></span><label><input type="file" accept="image/*,video/*" onChange={selectMedia} /><Upload size={21} /><strong>Choose local media</strong><p>Photo or video · retained only in this browser session</p></label><button type="button" onClick={() => setDraft({ ...draft, mediaName: "demo-tonk-road-waterlogging.jpg", mediaType: "image/jpeg · simulated attachment" })}><FileImage size={13} /> ATTACH DEMO PHOTO</button>{draft.mediaName && <div><span>{draft.mediaType.startsWith("video") ? <Video size={15} /> : <FileImage size={15} />}</span><p><strong>{draft.mediaName}</strong><small>{draft.mediaType} · local only</small></p></div>}</section>
            <label className="citizen-direct"><input type="checkbox" checked={draft.directObservation} onChange={(event) => setDraft({ ...draft, directObservation: event.target.checked })} /><span><strong>I am reporting what I directly observed.</strong><small>Optional provenance declaration</small></span></label>
            <label className="citizen-notes"><span>ADDITIONAL NOTES <small>OPTIONAL</small></span><textarea value={draft.additionalNotes} onChange={(event) => setDraft({ ...draft, additionalNotes: event.target.value })} placeholder="Direction of movement, access constraints or other useful context..." /></label>
            <div className="citizen-consent"><ShieldCheck size={15} /><p>Location and media may be used for weather-event verification and operational analysis. No name, phone or email is collected.</p></div>
            <button className="citizen-submit" type="submit"><Send size={15} /> SUBMIT OBSERVATION</button>
            <button className="citizen-clear" type="button" onClick={reset}><RotateCcw size={12} /> Clear form</button>
          </aside>
        </form>
      )}
    </div>
  );
}
