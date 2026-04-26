import Link from "next/link";

import { resumeDownload } from "@/lib/resume";

export function ResumeDownload() {
  return (
    <Link
      className="motion-focus inline-flex rounded-full bg-[var(--accent-teal)] px-5 py-3 text-sm font-semibold text-[#071018] transition duration-200 hover:brightness-110"
      href={resumeDownload.href}
    >
      {resumeDownload.label}
    </Link>
  );
}
