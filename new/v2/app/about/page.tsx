import { Reveal } from "@/components/motion/Reveal";

const nonNegotiables = [
  {
    title: "Ownership & Accountability",
    description:
      "I own outcomes end-to-end: problem framing, implementation, rollout, and post-launch reliability.",
    marker: "OA"
  },
  {
    title: "Deep Work Over Shallow Effort",
    description:
      "I optimize for uninterrupted execution blocks that ship durable systems, not visible busyness.",
    marker: "DW"
  },
  {
    title: "Simplicity Over Complexity",
    description:
      "I remove unnecessary complexity first so teams can move faster, debug faster, and onboard faster.",
    marker: "SC"
  },
  {
    title: "Trust Is Earned",
    description:
      "I treat reliability and delivery discipline as a professional baseline, especially under production pressure.",
    marker: "TE"
  }
];

const operatingPrinciples = [
  "Design for failure before scale so on-call load stays predictable.",
  "Ship measurable improvements with explicit latency, reliability, and cost targets.",
  "Document decisions while context is fresh to improve future execution speed.",
  "Prefer reproducible systems over heroics and one-time fixes."
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
            <h1>Backend and AI systems engineer focused on scalable, production-grade execution.</h1>
            <p>
              I build services, pipelines, and deployment workflows that reduce failure risk while
              increasing shipping velocity. My work sits at the intersection of backend architecture,
              distributed systems, and applied AI.
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
            I am targeting teams where engineering quality and business outcomes are tightly coupled. I
            care about designing systems that are observable, resilient, and easy to evolve, so teams can
            ship faster without increasing operational risk. I bring a pragmatic execution style:
            high-signal scoping, disciplined delivery, and clear ownership of production outcomes.
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
            <strong>MLOps and Applied AI Systems:</strong> I focus on reliable paths from experimentation
            to production, including retrieval quality, model/version traceability, and safe rollout
            strategies.
          </p>
          <p>
            <strong>Distributed Systems:</strong> I focus on service boundaries, failure isolation,
            observability, and cost-aware scaling so systems remain stable as complexity grows.
          </p>
          <p className="about-signoff">- Tanmay</p>
        </section>
      </Reveal>
    </section>
  );
}
