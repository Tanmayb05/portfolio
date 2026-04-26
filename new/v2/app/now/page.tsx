const activityLog = [
  "Applications submitted this week: 14",
  "Referral outreach messages sent: 11",
  "Cold emails sent to hiring teams: 6",
  "Focused interview-prep blocks completed: 7"
];

export default function NowPage() {
  return (
    <section className="page container now-page">
      <h1>Now</h1>
      <p className="now-intro">
        This is my live execution board for Summer/Fall 2026 recruiting and current technical focus.
      </p>

      <section className="surface now-focus-grid">
        <article>
          <p className="eyebrow">Applying</p>
          <p>
            Targeting backend, distributed systems, and AI systems internships/co-ops where I can ship
            production-facing infrastructure and platform features.
          </p>
        </article>
        <article>
          <p className="eyebrow">Learning</p>
          <p>
            Running a structured prep cycle across system design, data structures, and algorithms:
            Backtracking, Sliding Window, Graphs, and 1D Dynamic Programming.
          </p>
        </article>
        <article>
          <p className="eyebrow">Building</p>
          <p>
            Expanding project depth with measurable outcomes, architecture tradeoffs, and implementation
            notes that are useful to engineering teams.
          </p>
        </article>
      </section>

      <section className="surface">
        <h2>Activity Log</h2>
        <p>
          Weekly operating metrics to keep recruiting and skill-growth execution honest and trackable.
        </p>
        <ul>
          {activityLog.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </section>

      <p className="now-updated">Last updated: April 18, 2026</p>
    </section>
  );
}
