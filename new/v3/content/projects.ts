import type { Project } from "@/lib/content-types";

export const projects: Project[] = [
  {
    slug: "spendora",
    title: "Spendora - Conversational AI for Expense Insights",
    shortTitle: "Spendora",
    date: "Jun 2025",
    category: "AI Systems",
    summary:
      "I built an LLM-powered finance assistant for conversational expense insights using LangChain, HuggingFace, RAG, memory, and tool use.",
    proofPoints: [
      "Implemented RAG with custom toolchains for financial data.",
      "Deployed conversational agents with memory and tool use for spending analysis.",
      "Evolved the project direction from text input toward voice-based interaction."
    ],
    metrics: [],
    techStack: ["HuggingFace", "LangChain", "Mistral", "Gemma"],
    source: ["resume.json", "readme_portfolio.md"]
  },
  {
    slug: "news-headline-classification",
    title: "News Headline Classification",
    shortTitle: "Headline Classification",
    date: "Mar 2025",
    category: "Deep Learning",
    summary:
      "I trained an LSTM-based deep learning model on 400K+ news headlines and optimized the preprocessing and training pipeline.",
    proofPoints: [
      "Built the model with Python, PyTorch, and spaCy.",
      "Optimized preprocessing and training for better pipeline efficiency.",
      "Compared the model against baseline approaches."
    ],
    metrics: ["93.28% accuracy", "400K+ headline dataset", "25% pipeline efficiency improvement"],
    techStack: ["Python", "PyTorch", "spaCy"],
    source: ["resume.json", "readme_portfolio.md"]
  },
  {
    slug: "media-recommender",
    title: "Media Recommender",
    shortTitle: "Media Recommender",
    date: "Mar 2022",
    category: "Recommendation Systems",
    summary:
      "I developed a personalized media recommendation system across movies, music, and books using multiple recommendation algorithms.",
    proofPoints: [
      "Implemented content-based filtering, collaborative filtering, K-means, and TF-IDF.",
      "Built the system with React, Flask, Python, and the Spotify API.",
      "Published the work under paper ID IJRASET42927."
    ],
    metrics: ["Published paper ID IJRASET42927"],
    techStack: ["React", "Flask", "Python", "Spotify API"],
    source: ["resume.json", "readme_portfolio.md"]
  },
  {
    slug: "soundscape",
    title: "SoundScape: Android Music App",
    shortTitle: "SoundScape",
    date: "Dec 2021",
    category: "Android",
    summary:
      "I built an end-to-end Android music streaming app with API integration, local caching, playback, notifications, and file operations.",
    proofPoints: [
      "Integrated the Musixmatch API with a Room caching layer.",
      "Implemented playback, notification, and file-operation services.",
      "Built the app with Android SDK, Java, REST APIs, MediaPlayer, Gradle, and Git."
    ],
    metrics: ["70% reduction in API calls"],
    techStack: ["Android SDK", "Java", "REST APIs", "MediaPlayer", "Gradle", "Git"],
    source: ["resume.json", "readme_portfolio.md"]
  }
];

export const featuredProjects = projects.slice(0, 3);
