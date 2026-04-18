const activityLog = [
  "Applications submitted this week: 12",
  "Referral outreach sent: 8",
  "Cold emails sent: 5",
  "Interview prep blocks completed: 6"
];

export default function NowPage() {
  return (
    <section className="page container now-page">
      <h1>Now</h1>
      <p className="now-intro">
        This page is a live status board for what I am applying to, learning, and building right now.
      </p>

      <section className="surface now-focus-grid">
        <article>
          <p className="eyebrow">Applying</p>
          <p>Summer / Fall 2026 Backend, Distributed Systems, and AI Systems roles.</p>
        </article>
        <article>
          <p className="eyebrow">Learning</p>
          <p>System design and DSA progression: Backtracking, Sliding Window, Graphs, 1D DP.</p>
        </article>
        <article>
          <p className="eyebrow">Building</p>
          <p>High-signal projects with measurable outcomes and production-minded architecture.</p>
        </article>
      </section>

      <section className="surface">
        <h2>Activity Log</h2>
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
