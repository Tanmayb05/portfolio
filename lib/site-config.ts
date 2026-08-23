export const siteConfig = {
  name: "Tanmay Bhuskute",
  title: "Tanmay Bhuskute | Software Engineer",
  description:
    "Software engineer building cloud infrastructure, AI systems, and reliable software.",
  url: "https://tanmayb05.github.io/portfolio",
  navItems: [
    {
      label: "War Stories",
      href: "/experience",
      realName: "Experience",
      accent: "purple"
    },
    {
      label: "Things I Built",
      href: "/projects",
      realName: "Projects",
      accent: "blue"
    },
    {
      label: "Brain Dump",
      href: "/thinking",
      realName: "Thinking",
      accent: "yellow"
    },
    {
      label: "Life, Offline",
      href: "/travel-life",
      realName: "Travel & Life",
      accent: "green"
    },
    {
      label: "Say Hi",
      href: "/contact",
      realName: "Contact",
      accent: "red"
    }
  ],
  social: {
    github: "https://github.com/Tanmayb05",
    linkedin: "https://linkedin.com/in/tanmaybhuskute",
    email: "mailto:tanmay.v.bhuskute@gmail.com"
  },
  resume: "/resume.pdf"
} as const;
