import Link from "next/link";

import { resumeDownload } from "@/lib/resume";

export function ResumeDownload() {
  return (
    <Link
      className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
      data-analytics-event="resume_download"
      data-analytics-payload={JSON.stringify({ surface: "resume_download" })}
      href={resumeDownload.href}
    >
      {resumeDownload.label}
    </Link>
  );
}
