import summaryJson from "@/data/source/1.0-professional-summary.json";
import experienceJson from "@/data/source/1-experience.json";
import technicalSkillsJson from "@/data/source/1.1-technical-skills.json";
import educationJson from "@/data/source/1.2-education.json";
import extracurricularJson from "@/data/source/1.3-extracurricular.json";
import projectsJson from "@/data/source/2-projects.json";
import contactJson from "@/data/source/5-contact.json";
import type { ResumeData } from "@/lib/content-types";

// Extract resume data from data/source/*.json
const resumeData: ResumeData = {
  name: "Tanmay Bhuskute",
  summary: summaryJson.summary,
  contact: {
    email: contactJson.preferredEmail,
    github: contactJson.preferredGitHub,
    linkedin: contactJson.preferredLinkedIn,
    secondaryEmail: contactJson.secondaryEmail,
    phone: contactJson.phone,
    website: contactJson.website,
    location: contactJson.location
  },
  education: educationJson,
  technical_skills: technicalSkillsJson,
  work_experience: experienceJson.map(exp => ({
    title: exp.role,
    company: exp.company,
    start_date: exp.startDate,
    end_date: exp.endDate,
    tech_stack: exp.techStack,
    achievements: exp.mostImportantImpact
  })),
  projects_and_research: projectsJson.map(proj => ({
    title: proj.title,
    date: proj.context.whenDidYouBuildIt,
    tech_stack: proj.techStack,
    details: proj.whatIWouldImproveNext
  })),
  extracurricular: extracurricularJson
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
