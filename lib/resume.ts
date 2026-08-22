import experienceJson from "@/data/source/experience.json";
import projectsJson from "@/data/source/projects.json";
import contactJson from "@/data/source/contact.json";
import type { ResumeData } from "@/lib/content-types";

// Extract resume data from data/source/*.json
const resumeData: ResumeData = {
  name: "Tanmay Bhuskute",
  contact: {
    email: contactJson.preferredEmail,
    github: contactJson.preferredGitHub,
    linkedin: contactJson.preferredLinkedIn
  },
  education: [], // Not yet in data/source structure
  technical_skills: {
    programming: [],
    frameworks: [],
    developer_tools: [],
    libraries: []
  },
  work_experience: experienceJson.map(exp => ({
    title: exp.role,
    company: exp.company,
    start_date: "TBD",
    end_date: "TBD",
    tech_stack: [],
    achievements: exp.mostImportantImpact
  })),
  projects_and_research: projectsJson.map(proj => ({
    title: proj.title,
    date: proj.context.whenDidYouBuildIt,
    tech_stack: proj.techStack,
    details: proj.whatIWouldImproveNext
  })),
  extracurricular: []
};

export const resume = resumeData satisfies ResumeData;

export const contactLinks = {
  email: `mailto:${contactJson.preferredEmail}`,
  github: `https://${contactJson.preferredGitHub}`,
  linkedin: `https://${contactJson.preferredLinkedIn}`
} as const;

export const resumeDownload = {
  label: "Download Resume",
  href: "/resume.pdf"
} as const;
