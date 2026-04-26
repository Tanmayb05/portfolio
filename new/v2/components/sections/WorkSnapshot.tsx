import Link from "next/link";
import { projects } from "@/lib/projects";

export function WorkSnapshot() {
  return (
    <section>
      <div className="section-head">
        <h2>Work Snapshot</h2>
        <Link href="/work" className="inline-link">
          See all projects →
        </Link>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.slug} className="project-card">
            <p className="project-meta">
              {project.year} · {project.category}
            </p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="tag-row">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/work/${project.slug}`} className="inline-link">
              Deep Dive →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
