export type Project = {
  slug: string;
  title: string;
  year: string;
  category: "ML" | "Backend" | "Android" | "Research" | "DevOps";
  summary: string;
  detail: string;
  tags: string[];
  impact: string;
};

export type CaseStudy = {
  intro: string;
  role: string;
  duration: string;
  sections: {
    title: string;
    bullets: string[];
  }[];
  outcomes: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "spendora",
    title: "Spendora",
    year: "2026",
    category: "Backend",
    summary:
      "AI expense copilot that answers natural-language finance questions with traceable, source-backed responses.",
    detail:
      "Built with FastAPI, LangChain, and retrieval pipelines that combine semantic search with deterministic SQL tools.",
    tags: ["LangChain", "HuggingFace", "RAG", "FastAPI"],
    impact: "Reduced time-to-insight from manual filtering to one prompt + evidence."
  },
  {
    slug: "news-headline-classifier",
    title: "News Headline Classifier",
    year: "2025",
    category: "ML",
    summary: "Multiclass headline classifier trained on 400K+ samples with 93.28% validation accuracy.",
    detail:
      "Implemented a reproducible NLP training pipeline with robust preprocessing, stratified evaluation, and per-class analysis.",
    tags: ["Python", "LSTM", "NLP", "PyTorch"],
    impact: "93.28% validation accuracy on multiclass headlines."
  },
  {
    slug: "media-recommendation-system",
    title: "Media Recommendation System",
    year: "2025",
    category: "Research",
    summary:
      "Hybrid recommender blending content similarity, collaborative filtering, and clustering for better coverage.",
    detail:
      "Published research implementation combining TF-IDF, K-means, and interaction-driven ranking fusion.",
    tags: ["TF-IDF", "K-means", "Collaborative Filtering", "Research"],
    impact: "Published methodology with explainable ranking strategy."
  },
  {
    slug: "soundscape",
    title: "SoundScape",
    year: "2024",
    category: "Android",
    summary:
      "Android music streaming app with cache-first metadata strategy and stable playback-oriented architecture.",
    detail:
      "Designed modular Android components and request controls that cut redundant network traffic and improved UX responsiveness.",
    tags: ["Android", "Kotlin", "Caching", "REST APIs"],
    impact: "Reduced external API calls by 70%."
  }
];

export const caseStudies: Record<Project["slug"], CaseStudy> = {
  spendora: {
    intro:
      "Spendora is an AI copilot for expense analysis that turns raw transaction history into auditable answers, trend narratives, and actionable budgeting insights.",
    role: "Backend and retrieval systems engineer: architecture, pipeline design, and API delivery.",
    duration: "Jan 2026 - Present",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Raw transaction exports are difficult to query when users need high-level questions answered quickly.",
          "Traditional dashboards force filter-heavy workflows and make cross-category root-cause analysis slow."
        ]
      },
      {
        title: "Architecture",
        bullets: [
          "FastAPI orchestrator handles intent detection, tool routing, and response composition.",
          "Retrieval combines embedding search with deterministic SQL aggregation so responses remain grounded.",
          "Response layer returns concise insights and supporting evidence snippets for auditability."
        ]
      },
      {
        title: "Key Decisions",
        bullets: [
          "Used tool-based reasoning instead of prompt-only generation to enforce structured intermediate steps.",
          "Decoupled retrieval from generation so model upgrades do not require pipeline rewrites.",
          "Added reusable query templates for recurring asks such as monthly burn and merchant-level anomalies."
        ]
      }
    ],
    outcomes: [
      "Converted finance analysis from manual filtering into one-prompt workflows with verifiable evidence.",
      "Established instrumentation points for retrieval precision, latency, and tool-call reliability.",
      "Prepared the system for voice-first interaction without changing core backend primitives."
    ],
    stack: ["FastAPI", "LangChain", "HuggingFace", "Vector Search", "PostgreSQL"]
  },
  "news-headline-classifier": {
    intro:
      "A production-style NLP pipeline that predicts headline categories at scale using an LSTM sequence model and reproducible experiment controls.",
    role: "Modeling, data pipeline design, and evaluation reporting.",
    duration: "2025",
    sections: [
      {
        title: "Problem",
        bullets: [
          "News headlines are short, noisy, and ambiguous, which makes class boundaries harder to separate.",
          "Initial baselines struggled with class imbalance and underperformed on low-context headlines."
        ]
      },
      {
        title: "Modeling Approach",
        bullets: [
          "Prepared 400K+ labeled samples with normalization, tokenization, and sequence padding.",
          "Trained and tuned an LSTM architecture to improve minority-class recall without collapsing precision.",
          "Used stratified splits and repeated validation checks to prevent metric inflation."
        ]
      },
      {
        title: "Evaluation",
        bullets: [
          "Tracked per-class precision and recall instead of relying only on aggregate accuracy.",
          "Used learning-curve analysis to identify overfitting windows and tune regularization.",
          "Packaged configurations and seeds so benchmarks can be repeated consistently."
        ]
      }
    ],
    outcomes: [
      "Reached 93.28% validation accuracy on a 400K+ sample benchmark.",
      "Improved stability on short headlines through stronger preprocessing and split discipline.",
      "Produced a repeatable experiment setup that supports future transformer baseline comparisons."
    ],
    stack: ["Python", "PyTorch", "LSTM", "NLP Preprocessing", "Experiment Tracking"]
  },
  "media-recommendation-system": {
    intro:
      "A hybrid recommendation system that improves relevance and novelty across media types by combining multiple scoring methods instead of a single heuristic.",
    role: "Research implementation, algorithm design, and evaluation reporting.",
    duration: "2022 - 2025",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Single-method recommenders produced narrow, repetitive suggestions for mixed-interest users.",
          "The system needed to balance relevance, diversity, and cold-start behavior across media categories."
        ]
      },
      {
        title: "Methodology",
        bullets: [
          "Combined content-based similarity, collaborative filtering, K-means clustering, and TF-IDF vectors.",
          "Used interaction signals to capture preference drift while preserving deterministic fallback behavior.",
          "Applied weighted ranking fusion to blend strategy scores into a single ranked output."
        ]
      },
      {
        title: "Research Output",
        bullets: [
          "Structured experiments and findings for publication (IJRASET42927).",
          "Documented tradeoffs between explainability and personalization depth for each algorithm path.",
          "Defined repeatable evaluation flow for comparing precision and relevance across media types."
        ]
      }
    ],
    outcomes: [
      "Published a research-backed recommendation methodology with implementation-level detail.",
      "Improved recommendation coverage and novelty through hybrid score fusion.",
      "Created a modular scoring pipeline where algorithm weights can be tuned without full rewrites."
    ],
    stack: ["Python", "Flask", "TF-IDF", "K-means", "Collaborative Filtering", "React"]
  },
  soundscape: {
    intro:
      "SoundScape is an Android streaming application built for reliable playback and efficient network usage under real mobile constraints.",
    role: "Mobile architecture, API integration, caching strategy, and playback flow implementation.",
    duration: "2021 - 2022",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Frequent third-party API calls increased latency, quota pressure, and playback friction.",
          "Users needed fast, stable interaction without sacrificing metadata freshness."
        ]
      },
      {
        title: "Architecture",
        bullets: [
          "Built modular Android components for playback, notifications, and media operations.",
          "Integrated Musixmatch APIs with Room-backed local caching to avoid repeated lookups.",
          "Separated network retrieval from UI rendering to keep playback interactions responsive."
        ]
      },
      {
        title: "Key Decisions",
        bullets: [
          "Cached high-frequency metadata and results at strategic points rather than caching all payloads blindly.",
          "Used service-oriented internal modules to isolate playback logic from UI state management.",
          "Optimized request timing to avoid redundant calls on repeated user interactions."
        ]
      }
    ],
    outcomes: [
      "Reduced external API calls by 70% through targeted caching and request controls.",
      "Improved playback responsiveness and reduced network-dependent UI stalls.",
      "Delivered a maintainable Android architecture with clear module boundaries."
    ],
    stack: ["Android SDK", "Java/Kotlin", "Room", "REST APIs", "MediaPlayer", "Gradle"]
  }
};

export const workFilters = ["All", "ML", "Backend", "Android", "Research", "DevOps"] as const;

export type WorkFilter = (typeof workFilters)[number];
