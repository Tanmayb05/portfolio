const techGroups = [
  {
    title: "Production",
    items: ["AWS", "Python", "Ansible", "GitLab CI/CD", "Kubernetes", "ArgoCD", "Vault"]
  },
  {
    title: "Strong",
    items: [
      "Java",
      "Python",
      "C/C++",
      "SQL",
      "React",
      "Node.js",
      "FastAPI",
      "PyTorch",
      "HuggingFace",
      "LangChain",
      "Docker"
    ]
  },
  {
    title: "Exploring",
    items: ["Go", "Rust", "Advanced LLM Systems"]
  }
] as const;

export function TechGrid() {
  return (
    <section>
      <div className="section-head">
        <h2>Tech Stack</h2>
      </div>
      <div className="tech-grid-wrap">
        {techGroups.map((group) => (
          <article key={group.title} className="surface tech-group-card">
            <p className="eyebrow">{group.title}</p>
            <div className="tech-chip-grid" aria-label={`${group.title} technology list`}>
              {group.items.map((item) => (
                <span key={item} className="tech-chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
