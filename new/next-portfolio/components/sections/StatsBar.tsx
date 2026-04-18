const timelineItems = [
  { date: "Aug 2024", title: "MS Comp Sci, UC", position: "top" },
  { date: "Mar 2022", title: "Siemens Internship", position: "top" },
  { date: "Ongoing", title: "Key Achievements", position: "bottom" },
  { date: "Jul 2022", title: "Siemens Software Dev", position: "bottom" },
  { date: "Aug 2018", title: "BE Comp Eng, AISSMS", position: "bottom" }
] as const;

export function StatsBar() {
  return (
    <section className="deck-section timeline-section" aria-label="Career timeline">
      <h2 className="deck-title">Timeline</h2>
      <div className="timeline-track">
        {timelineItems.map((item) => (
          <article key={`${item.date}-${item.title}`} className={`timeline-node ${item.position}`}>
            <p className="timeline-date">{item.date}</p>
            <p className="timeline-title">{item.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
