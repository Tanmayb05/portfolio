import contentIntakeJson from "@/docs/content-intake.json";
import type { ResumeData } from "@/lib/content-types";

// Extract resume data from content-intake.json
const resumeData: ResumeData = {
  name: "Tanmay Bhuskute",
  contact: {
    email: contentIntakeJson.contact.preferredEmail,
    github: contentIntakeJson.contact.preferredGitHub,
    linkedin: contentIntakeJson.contact.preferredLinkedIn
  },
  education: [], // Not yet in content-intake.json structure
  technical_skills: {
    programming: [],
    frameworks: [],
    developer_tools: [],
    libraries: []
  },
  work_experience: contentIntakeJson.experience.map(exp => ({
    title: exp.role,
    company: exp.company,
    start_date: "TBD",
    end_date: "TBD",
    tech_stack: [],
    achievements: exp.mostImportantImpact
  })),
  projects_and_research: contentIntakeJson.projects.map(proj => ({
    title: proj.title,
    date: proj.context.whenDidYouBuildIt,
    tech_stack: proj.techStack,
    details: proj.whatIWouldImproveNext
  })),
  extracurricular: []
};

export const resume = resumeData satisfies ResumeData;

export const contactLinks = {
  email: `mailto:${contentIntakeJson.contact.preferredEmail}`,
  github: `https://${contentIntakeJson.contact.preferredGitHub}`,
  linkedin: `https://${contentIntakeJson.contact.preferredLinkedIn}`
} as const;

export const resumeDownload = {
  label: "Download Resume",
  href: "/resume.pdf"
} as const;
