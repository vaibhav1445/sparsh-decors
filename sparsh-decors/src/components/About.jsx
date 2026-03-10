import FadeIn from "./FadeIn";
import { VALUES } from "../data/content";

const aboutStyles = `
  .about-section { background: var(--navy3); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-image-box { position: relative; }
  .about-img-main {
    width: 100%; aspect-ratio: 4/5;
    background: linear-gradient(135deg, #1a2a3a, #0d2035);
    border: 1px solid rgba(201,168,76,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 80px; position: relative; overflow: hidden;
  }
  .about-img-main::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.05), transparent);
  }
  .about-img-accent {
    position: absolute; bottom: -20px; right: -20px; width: 60%; aspect-ratio: 1;
    background: linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04));
    border: 1px solid rgba(201,168,76,0.25);
    display: flex; align-items: center; justify-content: center; font-size: 40px;
  }
  .about-corner {
    position: absolute; top: -12px; left: -12px; width: 40px; height: 40px;
    border-top: 2px solid var(--gold); border-left: 2px solid var(--gold);
  }
  .about-text p {
    font-size: 17px; font-weight: 300; color: rgba(245,240,232,0.72);
    line-height: 1.9; margin-bottom: 20px; font-style: italic;
  }
  .about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
  .value-item {
    display: flex; align-items: flex-start; gap: 12px; padding: 16px;
    border: 1px solid rgba(201,168,76,0.1); background: rgba(201,168,76,0.03); transition: all 0.3s;
  }
  .value-item:hover { border-color: rgba(201,168,76,0.25); background: rgba(201,168,76,0.06); }
  .value-icon { font-size: 20px; margin-top: 2px; }
  .value-title {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 4px;
  }
  .value-desc { font-size: 13px; color: var(--muted); line-height: 1.5; font-family: var(--font-ui); }
  @media (max-width: 1024px) { .about-grid { grid-template-columns: 1fr; gap: 50px; } }
  @media (max-width: 768px) { .about-values { grid-template-columns: 1fr; } }
`;

export default function About() {
  return (
    <>
      <style>{aboutStyles}</style>
      <section id="about" className="section about-section">
        <div className="section-inner">
          <div className="about-grid">
            <FadeIn>
              <div className="about-image-box">
                <div className="about-corner" />
                <div className="about-img-main">
                  <span style={{ fontSize: 90, filter: "drop-shadow(0 0 20px rgba(201,168,76,0.3))" }}>
                    <img src="/images/img63.jpg" alt="About Us" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                </div>
                
              </div>
            </FadeIn>
            <FadeIn style={{ transitionDelay: "0.2s" }}>
              <div className="about-text">
                <div className="section-label">Who We Are</div>
                <h2 className="section-title">
                  Crafting Spaces With <span className="gold">Purpose</span>
                </h2>
                <div className="gold-line" />
                <p>
                  We are a professional design and surface finishing service provider based in Delhi.
                  With deep expertise in interior and exterior design, we transform ordinary spaces
                  into beautiful, functional, and long-lasting environments.
                </p>
                <p>
                  Our commitment is to deliver reliable service, superior quality, and complete
                  customer satisfaction. Every project is handled with a focus on durability,
                  design excellence, and timely completion.
                </p>
                <div className="about-values">
                  {VALUES.map((v) => (
                    <div key={v.title} className="value-item">
                      <span className="value-icon">{v.icon}</span>
                      <div>
                        <div className="value-title">{v.title}</div>
                        <div className="value-desc">{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
