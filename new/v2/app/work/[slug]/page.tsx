import { notFound } from "next/navigation";
import { caseStudies, projects } from "@/lib/projects";

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((entry) => entry.slug === params.slug);

  if (!project) {
    notFound();
  }

  const caseStudy = caseStudies[project.slug];
  if (!caseStudy) {
    notFound();
  }

  return (
    <section className="page container work-detail-stack">
      <p className="eyebrow">
        {project.year} · {project.category}
      </p>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>

      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>

      <section className="surface case-study-meta">
        <div>
          <p className="meta-label">Role</p>
          <p>{caseStudy.role}</p>
        </div>
        <div>
          <p className="meta-label">Duration</p>
          <p>{caseStudy.duration}</p>
        </div>
      </section>

      <section className="surface">
        <h2>Overview</h2>
        <p>{caseStudy.intro}</p>
      </section>

      {caseStudy.sections.map((section) => (
        <section key={section.title} className="surface">
          <h2>{section.title}</h2>
          <ul>
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className="surface">
        <h2>Outcomes</h2>
        <ul>
          {caseStudy.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <section className="surface">
        <h2>Technology</h2>
        <div className="tag-row">
          {caseStudy.stack.map((item) => (
            <span key={item} className="tag-chip">
              {item}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}
