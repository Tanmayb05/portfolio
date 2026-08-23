export type SourceDocument =
  | "content-intake.json"
  | "readme_portfolio.md"
  | "resume.json"
  | "master-resume"
  | "homepage.json"
  | "1-experience.json"
  | "2-projects.json";

export type Accent = "blue" | "purple" | "yellow" | "green" | "red";

export type Metric = {
  value: string;
  label: string;
  context?: string;
  source?: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
  kind?: "input" | "process" | "storage" | "external" | "output";
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type Architecture = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export type Asset = {
  kind:
    | "product-screenshot"
    | "architecture-diagram"
    | "terminal-snapshot"
    | "code-snapshot"
    | "dataset-visualization"
    | "before-after"
    | "demo-video"
    | "demo-gif"
    | "mobile-screenshot"
    | "result-chart"
    | "system-graphic";
  src?: string;
  label: string;
  alt: string;
  status: "available" | "planned" | "missing";
  source?: string;
  notes?: string;
};

export type ProjectCategory =
  | "AI Systems"
  | "Deep Learning"
  | "Recommendation Systems"
  | "Android"
  | "Data & ML Systems"
  | "Full-Stack Systems";

export type ResumeContact = {
  linkedin: string;
  github: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  website: string;
  location: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  gpa: string;
  start_date: string;
  end_date: string;
  coursework: string[];
  activities: string[];
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
  summary: string;
  contact: ResumeContact;
  education: EducationItem[];
  technical_skills: {
    programming: string[];
    frameworks: string[];
    developer_tools: string[];
    libraries: string[];
    methodologies: string[];
    specializedSkills: string[];
  };
  work_experience: WorkExperienceItem[];
  projects_and_research: ResumeProjectItem[];
  extracurricular: string[];
};

export type Project = {
  slug: string;
  name: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  date: string;
  summary: string;
  accent: Accent;
  problem: string;
  built: string;
  outcome?: string;
  context: string;
  architecture: Architecture;
  architectureSummary: string[];
  ownership: {
    model: string;
    exactOwnership: string[];
    whatExistedBefore: string;
    personallyDesigned: string[];
    collaboratorsOwned: string;
  };
  decisions: string[];
  tradeoffs: string[];
  implementation: string[];
  failureNotes: string[];
  nextImprovements: string[];
  proofPoints: string[];
  askMeAbout: string[];
  metrics: Metric[];
  techStack: string[];
  stack: string[];
  category: ProjectCategory;
  featured: boolean;
  featuredOrder?: number;
  github?: string;
  demo?: string;
  visuals: Asset[];
  primaryVisual?: Asset;
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
  source?: SourceDocument[];
};
