export type SourceDocument = "content-intake.json" | "readme_portfolio.md" | "resume.json";

export type ResumeContact = {
  linkedin: string;
  github: string;
  email: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  coursework: string[];
};

export type WorkExperienceItem = {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  tech_stack: string[];
  achievements: string[];
};

export type ResumeProjectItem = {
  title: string;
  date: string;
  tech_stack: string[];
  details: string[];
};

export type ResumeData = {
  name: string;
  contact: ResumeContact;
  education: EducationItem[];
  technical_skills: {
    programming: string[];
    frameworks: string[];
    developer_tools: string[];
    libraries: string[];
  };
  work_experience: WorkExperienceItem[];
  projects_and_research: ResumeProjectItem[];
  extracurricular: string[];
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  date: string;
  summary: string;
  problem: string;
  context: string;
  architecture: string[];
  decisions: string[];
  tradeoffs: string[];
  nextImprovements: string[];
  proofPoints: string[];
  metrics: string[];
  techStack: string[];
  category: "AI Systems" | "Deep Learning" | "Recommendation Systems" | "Android";
  source: SourceDocument[];
};

export type ThinkingCategory =
  | "Problem Breakdowns"
  | "Technical Evaluation & Judging"
  | "Career & Job Search"
  | "What I'm Learning Now"
  | "Mental Models"
  | "Research Notes";

export type ThinkingEntry = {
  slug: string;
  title: string;
  category: ThinkingCategory;
  status: "planned" | "active" | "draft";
  summary: string;
  focusPoints: string[];
  tags: string[];
  source: SourceDocument[];
};

export type NowItem = {
  label: string;
  items: string[];
  source: SourceDocument[];
};

export type TravelRegion = "USA" | "India" | "China";

export type TravelPlace = {
  id: string;
  title: string;
  note?: string | null;
  url: string;
  tags: string[];
  comment?: string | null;
  googleMapsPlaceId?: string | null;
  coordinates?: { lat: number; lng: number } | null;
};

export type TravelTrip = {
  id: string;
  title: string;
  sourceFile: string;
  country: string;
  primaryCity: string;
  stateCodes: string[];
  stateNames: string[];
  dateRange: {
    start: string;
    end: string;
  };
  preambleNotes: string[];
  placeCount: number;
  places: TravelPlace[];
};

export type TravelEntry = {
  slug: string;
  title: string;
  region: TravelRegion;
  status: "placeholder" | "real";
  placeLabel: string;
  timeVisited: string;
  tags: string[];
  notes: string[];
  // Geographic (for choropleth map)
  stateCode?: string;
  stateName?: string;
  // Statistics
  placeCount?: number;
  tripCount?: number;
  hiddenPlaceCount?: number;
  // Deprecated - kept for backwards compatibility
  mapPosition?: {
    x: number;
    y: number;
  };
  googleMapsUrl?: string;
  // Associated data
  trips?: TravelTrip[];
  source: SourceDocument[];
};
