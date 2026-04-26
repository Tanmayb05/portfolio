import Link from "next/link";
import { projects } from "@/lib/projects";

export function HorizontalGallery() {
  return (
    <section className="deck-section" aria-label="Project details">
      <div className="section-head deck-section-head">
        <h2 className="deck-title">Project Details</h2>
        <Link href="/work" className="inline-link">
          See all projects →
        </Link>
      </div>

      <div className="project-detail-grid">
        {projects.slice(0, 4).map((project, index) => (
          <article key={project.slug} className="project-detail-card">
            <p className="project-detail-index">{index + 1}</p>
            <h3>{project.title}</h3>
            <p>{project.detail}</p>
            <div className="tag-row">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/work/${project.slug}`} className="inline-link">
              Project Link →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
