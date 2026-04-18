import { Reveal } from "@/components/motion/Reveal";

const nonNegotiables = [
  {
    title: "Ownership & Accountability",
    description: "Own outcomes end-to-end, communicate risks early, and close loops without handoff gaps.",
    marker: "OA"
  },
  {
    title: "Deep Work Over Shallow Effort",
    description: "Prioritize high-leverage focus blocks over activity theater and fragmented task switching.",
    marker: "DW"
  },
  {
    title: "Simplicity Over Complexity",
    description: "Default to clear architecture and maintainable systems before introducing advanced abstractions.",
    marker: "SC"
  },
  {
    title: "Trust Is Earned",
    description: "Reliability, consistency, and delivery discipline are the baseline for long-term collaboration.",
    marker: "TE"
  }
];

const operatingPrinciples = [
  "Design for failure before scale.",
  "Measure impact, not only output.",
  "Document decisions while context is fresh.",
  "Prefer reproducible systems over heroic debugging."
];

const strengths = [
  "Backend Architecture",
  "Distributed Systems Thinking",
  "CI/CD and Reliability",
  "Applied NLP/LLM Systems",
  "Technical Communication",
  "Execution Under Ambiguity"
];

export default function AboutPage() {
  return (
    <section className="page container about-page">
      <Reveal>
        <section className="about-hero surface">
          <div>
            <p className="eyebrow">About</p>
            <h1>Building systems that ship fast, stay stable, and scale with intent.</h1>
            <p>
              I am focused on backend, distributed systems, and AI systems where architectural choices
              directly influence product velocity and reliability.
            </p>
          </div>
          <div className="about-hero-art" aria-hidden="true">
            <div className="about-orb" />
            <div className="about-grid" />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="surface about-statement">
          <h2>Personal Statement</h2>
          <p>
            My core philosophy is simple: systems should be clear enough to evolve, robust enough to
            survive production pressure, and measurable enough to justify every tradeoff. I care about
            engineering that is composable, observable, and built for iteration, not one-off demos.
          </p>
        </section>
      </Reveal>

      <section className="about-section">
        <h2>Non-Negotiables</h2>
        <div className="about-card-grid">
          {nonNegotiables.map((item) => (
            <Reveal key={item.title}>
              <article className="surface about-card">
                <p className="about-card-marker" aria-hidden="true">
                  {item.marker}
                </p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Operating Principles</h2>
        <div className="surface">
          <ul className="about-principles">
            {operatingPrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>
      </section>

      <Reveal>
        <section className="surface about-section">
          <h2>Strengths</h2>
          <div className="tag-row">
            {strengths.map((strength) => (
              <span key={strength} className="tag-chip strength-chip">
                {strength}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="surface about-section">
          <h2>What I Care About</h2>
          <p>
            <strong>MLOps:</strong> I care about the path from model experimentation to production
            reliability, including reproducible pipelines, model versioning, and rollback safety.
          </p>
          <p>
            <strong>Distributed Systems:</strong> I care about designing services that remain observable,
            resilient, and cost-aware as load and complexity increase.
          </p>
          <p className="about-signoff">- Tanmay</p>
        </section>
      </Reveal>
    </section>
  );
}
