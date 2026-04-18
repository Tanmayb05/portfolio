const stats = [
  "50% deployment downtime reduction",
  "44 production upgrades with zero downtime",
  "40% deployment effectiveness improvement",
  "200% code coverage increase",
  "30% AWS provisioning time reduction",
  "95% infra misconfiguration catch rate"
];

export function StatsBar() {
  return (
    <section className="stats-wrapper" aria-label="Key wins and metrics">
      {stats.map((stat) => (
        <div key={stat} className="stats-item">
          {stat}
        </div>
      ))}
    </section>
  );
}
