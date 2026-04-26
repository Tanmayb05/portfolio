export type ResumeData = {
  name: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  wins: string[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    techStack: string[];
    achievements: string[];
  }[];
  projects: {
    title: string;
    date: string;
    techStack: string[];
    details: string[];
  }[];
  skills: {
    label: string;
    items: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    coursework: string[];
  }[];
};

export const resumeData: ResumeData = {
  name: "Tanmay Bhuskute",
  contact: {
    email: "tanmay.v.bhuskute@gmail.com",
    github: "https://github.com/Tanmayb05",
    linkedin: "https://linkedin.com/in/tanmay-bhuskute"
  },
  wins: [
    "50% deployment downtime reduction",
    "44 production upgrades with zero downtime",
    "40% deployment effectiveness improvement",
    "200% code coverage increase",
    "30% AWS provisioning time reduction",
    "95% infra misconfiguration catch rate"
  ],
  experience: [
    {
      title: "Software Developer Engineer",
      company: "Siemens Industry Software",
      startDate: "Jul 2022",
      endDate: "Jun 2024",
      techStack: [
        "AWS",
        "Python",
        "Boto3",
        "REST APIs",
        "Hashicorp Vault",
        "Ansible",
        "GitLab CI/CD",
        "Shell",
        "Kubernetes",
        "ArgoCD"
      ],
      achievements: [
        "Automated AWS workflows with Python (Boto3), replacing Ruby scripts.",
        "Developed reusable Python packages for patching, boosting deployment effectiveness by 40%.",
        "Led Blue-Green deployments with Ansible, reducing upgrade downtime by 50%.",
        "Mentored 5 junior engineers with documentation and training.",
        "Enhanced code coverage by 200% as Quality Coach and SonarQube Specialist.",
        "Deployed 44 production upgrades in 4 months without service interruptions."
      ]
    },
    {
      title: "Software Developer Intern",
      company: "Siemens Industry Software",
      startDate: "Mar 2022",
      endDate: "Jun 2022",
      techStack: ["AWS", "Terraform", "Ansible", "Terratest", "Go"],
      achievements: [
        "Automated provisioning of AWS resources with Terraform, reducing deployment time by 30%.",
        "Developed Go + Terratest framework, catching 95% of misconfigurations pre-production.",
        "Optimized DevOps workflows with Ansible, reducing environment setup time from hours to minutes.",
        "Enhanced infrastructure validation with Terragrunt ensuring 100% successful Terraform runs."
      ]
    },
    {
      title: "Software Developer Intern",
      company: "Government of Maharashtra, Water Resource Department",
      startDate: "Sep 2021",
      endDate: "Dec 2021",
      techStack: ["React.js", "MySQL", "Full-Stack Development", "UI/UX Design", "Process Automation"],
      achievements: [
        "Developed a full-stack inward/outward register app with React and MySQL.",
        "Digitized record management, improving efficiency by 40%.",
        "Deployed system improving transparency and accuracy of records."
      ]
    }
  ],
  projects: [
    {
      title: "Spendora - Conversational AI for Expense Insights",
      date: "Jun 2025",
      techStack: ["HuggingFace", "LangChain", "Mistral", "Gemma"],
      details: [
        "Developed LLM-powered finance assistant with LangChain.",
        "Implemented RAG with custom toolchains for financial data.",
        "Deployed conversational agents with memory and tool use for spending analysis."
      ]
    },
    {
      title: "News Headline Classification",
      date: "Mar 2025",
      techStack: ["Python", "PyTorch", "spaCy"],
      details: [
        "Built LSTM-based deep learning model on 400K+ headlines.",
        "Achieved 93.28% accuracy outperforming baseline models.",
        "Optimized preprocessing and training pipeline improving efficiency by 25%."
      ]
    },
    {
      title: "Media Recommender (Published Paper ID - IJRASET42927)",
      date: "Mar 2022",
      techStack: ["React", "Flask", "Python", "Spotify API"],
      details: [
        "Developed personalized recommendation system for media.",
        "Implemented multiple algorithms: content-based, collaborative, K-means, TF-IDF.",
        "Delivered relevant recommendations across movies, music, and books."
      ]
    },
    {
      title: "SoundScape: Android Music App",
      date: "Dec 2021",
      techStack: ["Android SDK", "Java", "REST APIs", "MediaPlayer", "Gradle", "Git"],
      details: [
        "Developed end-to-end Android music streaming app.",
        "Integrated Musixmatch API with Room caching, reducing API calls by 70%.",
        "Implemented microservices for playback, notifications, and file operations."
      ]
    }
  ],
  skills: [
    { label: "Programming", items: ["Java", "Python", "C/C++", "SQL", "JavaScript", "Go", "Rust"] },
    { label: "Frameworks", items: ["React", "Node.js", "FastAPI", "Flask", "Django", "Streamlit"] },
    {
      label: "Developer Tools",
      items: ["Git", "Docker", "AWS", "Kubernetes", "ArgoCD", "Jenkins", "Postman", "Linux"]
    },
    {
      label: "ML/AI Libraries",
      items: ["PyTorch", "scikit-learn", "HuggingFace", "LangChain", "OpenAI", "spaCy"]
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Cincinnati",
      startDate: "Aug 2024",
      endDate: "May 2026",
      coursework: ["Advanced Algorithms", "Deep Learning", "Intelligent Data Analysis", "Database Theory"]
    },
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "AISSMS College of Engineering",
      startDate: "Aug 2018",
      endDate: "Jul 2022",
      coursework: ["Data Mining", "Data Analytics", "Machine Learning", "Object-Oriented Programming"]
    }
  ]
};
