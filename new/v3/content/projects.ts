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
    problem:
      "I wanted expense analysis to feel conversational instead of forcing users to manually inspect financial data.",
    context:
      "The source material defines Spendora as a conversational AI project for expense insights that uses LangChain, HuggingFace, RAG, and tool-based reasoning.",
    architecture: [
      "Financial data enters the assistant as the retrieval and tool-use context.",
      "A RAG layer grounds responses in the available financial data.",
      "LangChain coordinates memory, custom toolchains, and model calls.",
      "Mistral and Gemma are part of the model exploration path."
    ],
    decisions: [
      "I used RAG so the assistant could ground spending analysis in available financial data.",
      "I used custom toolchains because financial questions need operations beyond plain text generation.",
      "I explored conversational memory so the assistant could support follow-up questions."
    ],
    tradeoffs: [
      "The source notes do not publish detailed latency, cost, or evaluation tradeoffs yet.",
      "I am keeping deeper voice-interaction tradeoffs for the project case study expansion."
    ],
    nextImprovements: [
      "Evolve the interaction model from text input toward voice-based interaction.",
      "Add more evidence around evaluation, tool reliability, and spending-insight quality."
    ],
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
    problem:
      "I wanted to classify news headlines at scale with a deep learning pipeline that could outperform baseline models.",
    context:
      "The project used a 400K+ headline dataset and focused on model accuracy plus preprocessing and training efficiency.",
    architecture: [
      "A 400K+ headline dataset feeds the preprocessing pipeline.",
      "The preprocessing layer prepares text features for model training.",
      "An LSTM-based deep learning model performs classification.",
      "The training pipeline tracks accuracy and efficiency improvements."
    ],
    decisions: [
      "I used an LSTM model because the task depends on sequence patterns in headline text.",
      "I used Python, PyTorch, and spaCy for model development and text preprocessing.",
      "I optimized preprocessing and training instead of treating the model as the only performance lever."
    ],
    tradeoffs: [
      "The source notes do not publish the full baseline comparison table yet.",
      "The source notes do not include deployment constraints for this model."
    ],
    nextImprovements: [
      "Add the baseline comparison details to the case study.",
      "Document preprocessing decisions and failure examples more deeply."
    ],
    proofPoints: [
      "Built the model with Python, PyTorch, and spaCy.",
      "Optimized preprocessing and training for better pipeline efficiency.",
      "Compared the model against baseline approaches."
    ],
    metrics: [
      "93.28% accuracy",
      "400K+ headline dataset",
      "25% pipeline efficiency improvement"
    ],
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
    problem:
      "I wanted to recommend media across movies, music, and books with more than one recommendation strategy.",
    context:
      "The work became a published media recommender project and used React, Flask, Python, and the Spotify API.",
    architecture: [
      "Media data and user preference signals enter the recommendation layer.",
      "Multiple algorithms generate candidates and relevance signals.",
      "The system combines content-based filtering, collaborative filtering, K-means, and TF-IDF.",
      "A React and Flask application presents recommendations to users."
    ],
    decisions: [
      "I used multiple algorithms because media recommendation quality depends on different signal types.",
      "I included content-based and collaborative approaches to compare preference and item-similarity signals.",
      "I used React and Flask to separate the user interface from the recommendation backend."
    ],
    tradeoffs: [
      "The source notes do not publish offline evaluation metrics beyond the published paper reference.",
      "The source notes do not include production-scale serving constraints."
    ],
    nextImprovements: [
      "Add a clearer architecture diagram for the algorithm pipeline.",
      "Document evaluation criteria for recommendation relevance."
    ],
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
    problem:
      "I wanted to build a complete Android music streaming experience with reliable playback and fewer repeated API calls.",
    context:
      "SoundScape integrated the Musixmatch API, used Room caching, and implemented app services for playback, notifications, and file operations.",
    architecture: [
      "The Android app requests music data through REST APIs.",
      "A Room caching layer stores API results locally.",
      "Playback, notification, and file-operation services support the listening experience.",
      "The app uses Android SDK, Java, MediaPlayer, Gradle, and Git."
    ],
    decisions: [
      "I added Room caching to reduce repeated API calls.",
      "I split playback, notification, and file operations into service-oriented app layers.",
      "I used Java and the Android SDK for the end-to-end mobile implementation."
    ],
    tradeoffs: [
      "The source notes do not publish detailed cache invalidation tradeoffs yet.",
      "The source notes do not include user-retention or playback reliability metrics."
    ],
    nextImprovements: [
      "Document the caching strategy and invalidation behavior.",
      "Add screenshots or interaction traces for the Android app flow."
    ],
    proofPoints: [
      "Integrated the Musixmatch API with a Room caching layer.",
      "Implemented playback, notification, and file-operation services.",
      "Built the app with Android SDK, Java, REST APIs, MediaPlayer, Gradle, and Git."
    ],
    metrics: ["70% reduction in API calls"],
    techStack: [
      "Android SDK",
      "Java",
      "REST APIs",
      "MediaPlayer",
      "Gradle",
      "Git"
    ],
    source: ["resume.json", "readme_portfolio.md"]
  }
];

export const featuredProjects = projects.slice(0, 3);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const projectCategories = Array.from(
  new Set(projects.map((project) => project.category))
);
