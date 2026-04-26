"use client";

import { useState } from "react";
import type { ResumeData } from "@/lib/resume-data";

export function ResumeView({ data }: { data: ResumeData }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="page container resume-page">
      <header className="resume-header surface">
        <div>
          <p className="eyebrow">Interactive Resume</p>
          <h1>{data.name}</h1>
          <p>Backend · Distributed Systems · AI Systems</p>
        </div>
        <a href="/resume.pdf" download className="accent-button resume-download">
          Download PDF
        </a>
      </header>

      <section className="stats-wrapper" aria-label="Career wins">
        {data.wins.map((win) => (
          <div key={win} className="stats-item">
            {win}
          </div>
        ))}
      </section>

      <section className="surface resume-section">
        <h2>Experience</h2>
        <div className="resume-experience-list">
          {data.experience.map((role, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={`${role.company}-${role.startDate}`} className="resume-role-card">
                <button
                  type="button"
                  className="resume-role-toggle"
                  aria-expanded={isOpen}
                  aria-controls={`experience-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <div>
                    <h3>{role.title}</h3>
                    <p className="resume-role-meta">
                      {role.company} · {role.startDate} - {role.endDate}
                    </p>
                  </div>
                  <span className="resume-toggle-indicator" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div id={`experience-panel-${index}`} hidden={!isOpen}>
                  <div className="tag-row">
                    {role.techStack.map((item) => (
                      <span key={item} className="tag-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <ul className="resume-bullets">
                    {role.achievements.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="surface resume-section">
        <h2>Projects</h2>
        <div className="resume-project-list">
          {data.projects.map((project) => (
            <article key={project.title} className="resume-project-card">
              <h3>{project.title}</h3>
              <p className="resume-role-meta">{project.date}</p>
              <div className="tag-row">
                {project.techStack.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
              <ul className="resume-bullets">
                {project.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="surface resume-section">
        <h2>Skills</h2>
        <div className="resume-skill-grid">
          {data.skills.map((group) => (
            <article key={group.label} className="resume-skill-card">
              <h3>{group.label}</h3>
              <div className="tag-row">
                {group.items.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface resume-section">
        <h2>Education</h2>
        <div className="resume-education-list">
          {data.education.map((entry) => (
            <article key={`${entry.institution}-${entry.startDate}`} className="resume-edu-card">
              <h3>{entry.degree}</h3>
              <p className="resume-role-meta">
                {entry.institution} · {entry.startDate} - {entry.endDate}
              </p>
              <p>Coursework: {entry.coursework.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
