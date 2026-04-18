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
    summary: "Conversational AI expense insights with retrieval and tool reasoning.",
    detail: "LangChain + HuggingFace with retrieval pipelines for financial Q&A and workflow automation.",
    tags: ["LangChain", "HuggingFace", "RAG", "FastAPI"],
    impact: "High-signal foundation for AI-first financial workflows."
  },
  {
    slug: "news-headline-classifier",
    title: "News Headline Classifier",
    year: "2025",
    category: "ML",
    summary: "LSTM model trained on 400K+ samples achieving 93.28% accuracy.",
    detail: "Production-ready text classification experiments with measurable benchmark reporting.",
    tags: ["Python", "LSTM", "NLP", "PyTorch"],
    impact: "93.28% validation accuracy on multiclass headlines."
  },
  {
    slug: "media-recommendation-system",
    title: "Media Recommendation System",
    year: "2025",
    category: "Research",
    summary: "Hybrid recommendation engine with content, collaborative, and clustering methods.",
    detail: "Published research workflow combining TF-IDF, K-means, and user-behavior modeling.",
    tags: ["TF-IDF", "K-means", "Collaborative Filtering", "Research"],
    impact: "Published methodology with explainable ranking strategy."
  },
  {
    slug: "soundscape",
    title: "SoundScape",
    year: "2024",
    category: "Android",
    summary: "Android music streaming app with API caching and optimized playback calls.",
    detail: "End-to-end mobile architecture with resilient data caching and efficient request patterns.",
    tags: ["Android", "Kotlin", "Caching", "REST APIs"],
    impact: "Reduced external API calls by 70%."
  }
];

export const caseStudies: Partial<Record<Project["slug"], CaseStudy>> = {
  spendora: {
    intro:
      "Spendora is an AI copilot for personal expense analysis designed to answer natural-language finance questions with traceable evidence.",
    role: "System design, backend implementation, and retrieval pipeline engineering.",
    duration: "Jan 2026 - Present",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Users can see transactions but cannot ask high-level questions without manual filtering.",
          "Traditional dashboards hide causality across categories, merchants, and time windows."
        ]
      },
      {
        title: "Architecture",
        bullets: [
          "FastAPI service orchestrates query understanding, tool routing, and response assembly.",
          "Retrieval layer combines semantic embeddings with deterministic SQL filters for factual grounding.",
          "Response chain returns both summary insight and evidence snippets to keep outputs auditable."
        ]
      },
      {
        title: "Key Decisions",
        bullets: [
          "Used tool-based reasoning instead of pure prompting to force structured intermediate steps.",
          "Separated retrieval from generation so model upgrades do not require data pipeline rewrites.",
          "Built reusable query templates for recurring asks like monthly burn and category spikes."
        ]
      }
    ],
    outcomes: [
      "Delivered a high-signal workflow that can answer transaction and trend questions in one prompt.",
      "Created architecture that is ready for voice-interface extension in the next phase.",
      "Established clear observability points for retrieval precision and response latency."
    ],
    stack: ["FastAPI", "LangChain", "HuggingFace", "Vector Search", "PostgreSQL"]
  },
  "news-headline-classifier": {
    intro:
      "A multiclass NLP classification system that predicts news categories from headlines using an LSTM-based sequence model.",
    role: "Modeling, data pipeline design, and evaluation reporting.",
    duration: "2025",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Need a robust classifier that handles high-volume, noisy headline text across multiple topics.",
          "Baseline models underperformed on short and ambiguous headlines."
        ]
      },
      {
        title: "Modeling Approach",
        bullets: [
          "Prepared 400K+ labeled samples with normalization, tokenization, and sequence padding.",
          "Trained an LSTM architecture tuned for balanced recall across classes.",
          "Used stratified splits and repeated validation checks to avoid metric inflation."
        ]
      },
      {
        title: "Evaluation",
        bullets: [
          "Tracked per-class precision and recall rather than only aggregate accuracy.",
          "Compared learning curves to identify overfitting windows and adjust regularization.",
          "Packaged training outputs so experiments can be repeated with consistent seeds."
        ]
      }
    ],
    outcomes: [
      "Reached 93.28% accuracy on validation benchmark.",
      "Improved class stability for shorter headlines through better preprocessing.",
      "Produced a reproducible experiment pipeline suitable for future transformer baseline comparisons."
    ],
    stack: ["Python", "PyTorch", "LSTM", "NLP Preprocessing", "Experiment Tracking"]
  },
  "media-recommendation-system": {
    intro:
      "A hybrid recommender system designed to improve relevance across movies, music, and books by combining multiple ranking strategies instead of relying on a single heuristic.",
    role: "Research implementation, algorithm design, and evaluation reporting.",
    duration: "2022 - 2025",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Single-method recommenders produced narrow suggestions and low novelty for mixed-content users.",
          "Need a method that balances relevance, diversity, and cold-start behavior across content categories."
        ]
      },
      {
        title: "Methodology",
        bullets: [
          "Built a multi-algorithm pipeline combining content-based similarity, collaborative filtering, K-means clustering, and TF-IDF vectors.",
          "Used user-item interaction signals to capture preference drift while preserving deterministic fallback behavior.",
          "Applied weighted ranking fusion to blend scores from each strategy into a final recommendation list."
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
      "Published a research-backed recommendation methodology with practical implementation details.",
      "Improved recommendation coverage across different media categories through hybrid scoring.",
      "Created a modular architecture that allows algorithm weighting updates without full rewrites."
    ],
    stack: ["Python", "Flask", "TF-IDF", "K-means", "Collaborative Filtering", "React"]
  },
  soundscape: {
    intro:
      "SoundScape is an Android streaming application focused on efficient API usage, responsive playback, and stable on-device media experiences.",
    role: "Mobile architecture, API integration, caching strategy, and playback flow implementation.",
    duration: "2021 - 2022",
    sections: [
      {
        title: "Problem",
        bullets: [
          "Frequent external API requests increased latency and quota pressure during playback and discovery.",
          "Need smoother music interaction without sacrificing metadata freshness and responsiveness."
        ]
      },
      {
        title: "Architecture",
        bullets: [
          "Built modular Android components for playback, notifications, and file/media operations.",
          "Integrated Musixmatch API with local Room cache to reduce repeated network lookups.",
          "Separated network retrieval and UI rendering paths to keep playback interactions fast under variable connectivity."
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
      "Improved playback stability and perceived speed for core user actions.",
      "Delivered a maintainable Android codebase with clear component boundaries."
    ],
    stack: ["Android SDK", "Java/Kotlin", "Room", "REST APIs", "MediaPlayer", "Gradle"]
  }
};

export const workFilters = ["All", "ML", "Backend", "Android", "Research", "DevOps"] as const;

export type WorkFilter = (typeof workFilters)[number];
