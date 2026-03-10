import FadeIn from "./FadeIn";
import { SERVICES } from "../data/content";

const servicesStyles = `
  .services-section { background: var(--navy); }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 60px; }
  .service-card {
    background: var(--navy2); padding: 48px 36px;
    position: relative; overflow: hidden; cursor: pointer;
    transition: all 0.4s ease; border: 1px solid rgba(201,168,76,0.08);
  }
  .service-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .service-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .service-card:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.2); }
  .service-card:hover::before, .service-card:hover::after { opacity: 1; }
  .service-number {
    font-family: var(--font-display); font-size: 64px; font-weight: 700;
    color: rgba(201,168,76,0.08); position: absolute; top: 20px; right: 24px; line-height: 1;
  }
  .service-icon { font-size: 36px; margin-bottom: 20px; display: block; }
  .service-title {
    font-family: var(--font-display); font-size: 22px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: var(--gold-light); margin-bottom: 16px;
  }
  .service-desc { font-size: 15px; font-weight: 300; color: rgba(245,240,232,0.6); line-height: 1.8; font-style: italic; }
  .service-tag {
    display: inline-block; margin-top: 20px; font-family: var(--font-ui);
    font-size: 9px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 2px;
  }
  @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .services-grid { grid-template-columns: 1fr; } }
`;

export default function Services() {
  return (
    <>
      <style>{servicesStyles}</style>
      <section id="services" className="section services-section">
        <div className="section-inner">
          <FadeIn>
            <div style={{ maxWidth: 600 }}>
              <div className="section-label">What We Offer</div>
              <h2 className="section-title">
                Our <span className="gold">Services</span>
              </h2>
              <div className="gold-line" />
              <p className="section-desc">
                From elegant interiors to stunning exterior finishes — we handle it all with
                precision and artistry.
              </p>
            </div>
          </FadeIn>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="service-card">
                  <div className="service-number">0{i + 1}</div>
                  <span className="service-icon">{s.icon}</span>
                  <div className="service-title">{s.title}</div>
                  <p className="service-desc">{s.desc}</p>
                  <span className="service-tag">{s.tag}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
