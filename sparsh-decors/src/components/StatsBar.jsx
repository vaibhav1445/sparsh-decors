import { STATS } from "../data/content";

const statsStyles = `
  .stats-bar {
    background: linear-gradient(135deg, var(--navy2), var(--navy3));
    border-top: 1px solid rgba(201,168,76,0.15);
    border-bottom: 1px solid rgba(201,168,76,0.15);
    padding: 50px 60px;
  }
  .stats-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: var(--font-display); font-size: 48px; font-weight: 700;
    color: var(--gold-light); line-height: 1; margin-bottom: 8px;
  }
  .stat-label {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
  }
  @media (max-width: 1024px) { .stats-inner { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .stats-bar { padding: 40px 24px; } .stats-inner { gap: 24px; } }
`;

export default function StatsBar() {
  return (
    <>
      <style>{statsStyles}</style>
      <div className="stats-bar">
        <div className="stats-inner">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
