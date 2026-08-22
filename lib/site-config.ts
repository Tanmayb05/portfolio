export const siteConfig = {
  name: "Tanmay Bhuskute",
  title: "Tanmay Bhuskute | Portfolio",
  description:
    "A calm technical portfolio for systems, engineering notes, experience, travel, and contact.",
  url: "",
  navItems: [
    { label: "War Stories", href: "/experience", realName: "Experience" },
    { label: "Things I Built", href: "/projects", realName: "Projects" },
    { label: "Brain Dump", href: "/thinking", realName: "Thinking" },
    { label: "Life, Offline", href: "/travel-life", realName: "Travel & Life" },
    { label: "Say Hi", href: "/contact", realName: "Contact" }
  ],
  social: {
    github: "https://github.com/Tanmayb05",
    linkedin: "https://linkedin.com/in/tanmay-bhuskute",
    email: "mailto:tanmay.v.bhuskute@gmail.com"
  },
  resume: "/resume.pdf"
} as const;
