import FadeIn from "./FadeIn";

const featuresStyles = `
  .features-section {
    background: var(--navy);
    position: relative; overflow: hidden;
  }
  .features-section::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.05), transparent 70%);
    pointer-events: none;
  }

  .features-top {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; margin-bottom: 80px;
  }

  .features-big-number {
    font-family: var(--font-display); font-size: 120px; font-weight: 700;
    color: rgba(201,168,76,0.07); line-height: 1;
    position: absolute; top: -20px; right: -10px;
    pointer-events: none;
  }
  .features-text-wrap { position: relative; }

  .features-img-collage {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; position: relative;
  }
  .fcol-img {
    width: 100%; object-fit: cover; display: block;
    border: 1px solid rgba(201,168,76,0.1);
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
  }
  .fcol-img.tall { grid-row: span 2; height: 350px; }
  .fcol-img.short { height: 170px; }

  /* Main features grid */
  .features-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
  }
  .feature-card {
    padding: 36px 28px; background: var(--navy2);
    border: 1px solid rgba(201,168,76,0.08);
    position: relative; overflow: hidden; transition: all 0.3s;
  }
  .feature-card:hover {
    background: rgba(26, 42, 58, 0.95);
    border-color: rgba(201,168,76,0.22);
    transform: translateY(-3px);
  }
  .feature-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .feature-card:hover::after { opacity: 1; }

  .feature-icon-wrap {
    width: 56px; height: 56px; margin-bottom: 20px;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; transition: all 0.3s;
  }
  .feature-card:hover .feature-icon-wrap {
    background: rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.4);
  }
  .feature-title {
    font-family: var(--font-display); font-size: 16px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 1px; margin-bottom: 10px;
    text-transform: uppercase;
  }
  .feature-desc {
    font-family: var(--font-ui); font-size: 13px; color: var(--muted);
    line-height: 1.7;
  }

  /* Why Choose Us Bar */
  .why-bar {
    margin-top: 60px; padding: 48px 40px;
    background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03));
    border: 1px solid rgba(201,168,76,0.2);
    display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    gap: 20px; align-items: center;
  }
  .why-item { text-align: center; }
  .why-number {
    font-family: var(--font-display); font-size: 40px; font-weight: 700;
    color: var(--gold-light); margin-bottom: 6px; line-height: 1;
  }
  .why-label {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
  }
  .why-divider {
    width: 1px; height: 60px; align-self: center;
    background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
  }

  @media (max-width: 1024px) {
    .features-top { grid-template-columns: 1fr; gap: 40px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .why-bar { grid-template-columns: repeat(2, 1fr); }
    .why-divider { display: none; }
  }
  @media (max-width: 768px) {
    .features-grid { grid-template-columns: 1fr 1fr; }
    .why-bar { grid-template-columns: 1fr 1fr; padding: 32px 24px; }
  }
`;

const features = [
  { icon: "🛡️", title: "UV Protection", desc: "Advanced UV-resistant formulas prevent fading and discolouration, keeping your walls looking fresh for years." },
  { icon: "💧", title: "Water Resistant", desc: "Superior moisture resistance protects walls from humidity, rain, and seepage in all weather conditions." },
  { icon: "🌿", title: "Eco-Friendly", desc: "Low VOC, non-toxic formulations that are safe for your family and kind to the environment." },
  { icon: "🧹", title: "Easy to Clean", desc: "Washable surfaces that resist stains and dirt. Simply wipe clean without damaging the finish." },
  { icon: "🦠", title: "Anti-Fungal", desc: "Built-in anti-fungal and anti-bacterial properties prevent mould and mildew growth on walls." },
  { icon: "🎨", title: "1000+ Shades", desc: "Unlimited colour options with precision tinting technology to match any vision or design theme." },
  { icon: "⏱️", title: "Long Lasting", desc: "Premium quality binders ensure exceptional durability with finishes lasting 10+ years without fading." },
  { icon: "🔇", title: "Low Odour", desc: "Advanced water-based formulas with minimal odour, allowing you to stay comfortable during application." },
];

const whyUs = [
  { number: "20+", label: "Years Experience" },
  { number: "500+", label: "Projects Done" },
  { number: "50+", label: "Paint Varieties" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function KeyFeatures() {
  return (
    <>
      <style>{featuresStyles}</style>
      <section id="features" className="section features-section">
        <div className="section-inner">

          <div className="features-top">
            <FadeIn>
              <div className="features-text-wrap">
                <div className="features-big-number">8</div>
                <div className="section-label">Why Choose Us</div>
                <h2 className="section-title">
                  Key <span className="gold">Features</span>
                </h2>
                <div className="gold-line" />
                <p className="section-desc" style={{ marginBottom: 24 }}>
                  Every paint and finish we use is carefully selected for quality, durability, and aesthetic excellence.
                </p>
                <p style={{ fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.8, fontStyle: "italic", fontFamily: "var(--font-body)" }}>
                  We only work with premium brands like Sirca, which brings Italian craftsmanship and innovation to every project. The quality of our materials combined with our expert application ensures results that stand the test of time.
                </p>
              </div>
            </FadeIn>

            <FadeIn style={{ transitionDelay: "0.2s" }}>
              <div className="features-img-collage">
                <img
                  src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=400&q=80"
                  alt="Premium Finish"
                  className="fcol-img tall"
                  onError={(e) => { e.target.style.background = "linear-gradient(135deg, #1a3a5c, #0d2035)"; }}
                />
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                  alt="Wall Texture"
                  className="fcol-img short"
                  onError={(e) => { e.target.style.background = "linear-gradient(135deg, #2a1a0e, #1a1205)"; }}
                />
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80"
                  alt="Interior Design"
                  className="fcol-img short"
                  onError={(e) => { e.target.style.background = "linear-gradient(135deg, #1a2a1a, #0d1f0d)"; }}
                />
              </div>
            </FadeIn>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((f, i) => (
              <FadeIn key={f.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="feature-card">
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Why Bar */}
          <FadeIn>
            <div className="why-bar">
              {whyUs.map((w, i) => (
                <>
                  <div key={w.label} className="why-item">
                    <div className="why-number">{w.number}</div>
                    <div className="why-label">{w.label}</div>
                  </div>
                  {i < whyUs.length - 1 && <div key={`div-${i}`} className="why-divider" />}
                </>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
