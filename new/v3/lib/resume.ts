import resumeJson from "@/docs/resume.json";
import type { ResumeData } from "@/lib/content-types";

export const resume = resumeJson satisfies ResumeData;

export const contactLinks = {
  email: `mailto:${resume.contact.email}`,
  github: `https://${resume.contact.github}`,
  linkedin: `https://${resume.contact.linkedin}`
} as const;

export const resumeDownload = {
  label: "Download Resume",
  href: "/resume.pdf"
} as const;
