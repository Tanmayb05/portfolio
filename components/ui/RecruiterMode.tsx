"use client";

import { useEffect, useRef, useState } from "react";

import { BrutalButton } from "@/components/ui/BrutalButton";
import { StickerBadge } from "@/components/ui/StickerBadge";
import type { Metric } from "@/lib/content-types";

function useEmailCopy(emailHref: string) {
  const email = emailHref.replace(/^mailto:/, "");
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(resetTimeout.current);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = emailHref;
      return;
    }

    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setCopied(false), 1400);
  }

  return { copied, copyEmail, email };
}

type RecruiterModeProps = {
  name: string;
  role: string;
  focus: string;
  metrics: Metric[];
  resumeHref: string;
  linkedinHref: string;
  emailHref: string;
  projectHref?: string;
  className?: string;
};

export function RecruiterMode({
  name,
  role,
  focus,
  metrics,
  resumeHref,
  linkedinHref,
  emailHref,
  projectHref = "/projects",
  className = ""
}: RecruiterModeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { copied, copyEmail } = useEmailCopy(emailHref);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function closeDialog() {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <aside
        className={`min-w-0 border-[3px] border-[var(--ink)] bg-[var(--white)] p-3 shadow-[var(--shadow-md)] sm:p-4 ${className}`}
        aria-labelledby="recruiter-shortcut-title"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StickerBadge tone="white">Recruiter Shortcut</StickerBadge>
          <span className="font-mono text-xs font-black uppercase text-[var(--purple)]">
            Engineer mode
          </span>
        </div>
        <h2
          className="mt-4 text-[length:var(--text-h3)] font-black uppercase leading-none"
          id="recruiter-shortcut-title"
        >
          30 sec version
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <BrutalButton
            className="min-h-20 flex-col gap-1"
            href={resumeHref}
            analyticsEvent="resume_download"
            analyticsPayload={{ surface: "recruiter_shortcut" }}
          >
            <span>Resume</span>
            <span className="text-[0.65rem]">/resume</span>
          </BrutalButton>
          <BrutalButton
            className="min-h-20 flex-col gap-1"
            href={linkedinHref}
            variant="outline"
            analyticsEvent="linkedin_click"
            analyticsPayload={{ surface: "recruiter_shortcut" }}
          >
            <span>LinkedIn</span>
            <span className="text-[0.65rem]">/in/tanmay</span>
          </BrutalButton>
          <BrutalButton
            aria-label="Copy email address"
            className="copy-stamp min-h-20 flex-col gap-1"
            data-copied={copied}
            onClick={copyEmail}
            variant="outline"
            analyticsEvent="email_click"
            analyticsPayload={{ surface: "recruiter_shortcut" }}
          >
            <span>{copied ? "Copied!" : "Email"}</span>
            <span className="text-[0.65rem]">
              {copied ? "in clipboard" : "/email"}
            </span>
          </BrutalButton>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? "Email address copied." : ""}
        </span>
        <button
          className="motion-focus mt-4 w-full border-[3px] border-[var(--ink)] bg-[var(--purple)] px-4 py-3 font-mono text-sm font-black uppercase text-white shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
          type="button"
          ref={triggerRef}
          data-analytics-event="recruiter_mode_open"
          data-analytics-payload={JSON.stringify({ surface: "homepage" })}
          onClick={() => setIsOpen(true)}
        >
          Open recruiter mode
        </button>
      </aside>
      <dialog
        aria-labelledby="recruiter-dialog-title"
        className="w-[min(92vw,42rem)] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-0 text-[var(--ink)] shadow-[var(--shadow-md)] backdrop:bg-black/45"
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => setIsOpen(false)}
      >
        <div className="border-b-[3px] border-[var(--ink)] bg-[var(--purple)] p-4 text-white">
          <StickerBadge tone="white">Recruiter Shortcut</StickerBadge>
          <h2
            className="mt-4 text-[length:var(--text-h3)] font-black uppercase leading-none"
            id="recruiter-dialog-title"
          >
            {name}
          </h2>
          <p className="mt-2 font-mono text-sm font-black uppercase">
            {role}
          </p>
          <p className="mt-3 text-sm font-semibold">{focus}</p>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div
              className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-3 shadow-[var(--shadow-sm)]"
              key={`${metric.value}-${metric.label}`}
            >
              <strong className="block text-3xl font-black text-[var(--purple)]">
                {metric.value}
              </strong>
              <span className="mt-1 block text-sm font-black">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 border-t-[3px] border-[var(--ink)] bg-[var(--white)] p-4">
          <BrutalButton
            href={resumeHref}
            analyticsEvent="resume_download"
            analyticsPayload={{ surface: "recruiter_dialog" }}
          >
            Resume
          </BrutalButton>
          <BrutalButton
            href={linkedinHref}
            variant="outline"
            analyticsEvent="linkedin_click"
            analyticsPayload={{ surface: "recruiter_dialog" }}
          >
            LinkedIn
          </BrutalButton>
          <BrutalButton
            aria-label="Copy email address"
            className="copy-stamp"
            data-copied={copied}
            onClick={copyEmail}
            variant="outline"
            analyticsEvent="email_click"
            analyticsPayload={{ surface: "recruiter_dialog" }}
          >
            {copied ? "Copied!" : "Email"}
          </BrutalButton>
          <BrutalButton
            href={projectHref}
            variant="outline"
            analyticsEvent="project_open"
            analyticsPayload={{ surface: "recruiter_dialog" }}
          >
            Projects
          </BrutalButton>
          <BrutalButton variant="ghost" onClick={closeDialog}>
            Close
          </BrutalButton>
        </div>
      </dialog>
    </>
  );
}
