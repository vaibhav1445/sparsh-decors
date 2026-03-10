import FadeIn from "./FadeIn";

const paintStyles = `
  .paints-section { background: var(--navy); }

  .paints-tabs {
    display: flex; gap: 4px; margin-top: 48px; flex-wrap: wrap;
  }
  .paints-tab {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    padding: 10px 22px; cursor: pointer; background: rgba(201,168,76,0.06);
    color: var(--muted); border: 1px solid rgba(201,168,76,0.1); transition: all 0.3s;
  }
  .paints-tab.active { background: var(--gold); color: var(--navy); border-color: var(--gold); }
  .paints-tab:hover:not(.active) { background: rgba(201,168,76,0.12); color: var(--gold-light); }

  .paints-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 32px;
  }

  .paint-card {
    background: var(--navy2); border: 1px solid rgba(201,168,76,0.1);
    overflow: hidden; transition: all 0.4s; cursor: pointer; position: relative;
  }
  .paint-card:hover { transform: translateY(-5px); border-color: rgba(201,168,76,0.3); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }

  .paint-card-img {
    width: 100%; height: 220px; object-fit: cover;
    display: block; transition: transform 0.5s ease;
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
  }
  .paint-card:hover .paint-card-img { transform: scale(1.05); }

  .paint-card-img-wrap { overflow: hidden; position: relative; }
  .paint-card-badge {
    position: absolute; top: 14px; left: 14px;
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    background: var(--gold); color: var(--navy);
    padding: 4px 12px;
  }

  .paint-card-body { padding: 24px; }
  .paint-card-title {
    font-family: var(--font-display); font-size: 19px; font-weight: 600;
    letter-spacing: 1px; color: var(--gold-light); margin-bottom: 10px;
  }
  .paint-card-desc {
    font-size: 14px; color: rgba(245,240,232,0.6);
    line-height: 1.8; font-style: italic; font-family: var(--font-body);
    margin-bottom: 16px;
  }
  .paint-card-features {
    display: flex; flex-wrap: wrap; gap: 8px;
  }
  .paint-chip {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    padding: 4px 10px; border: 1px solid rgba(201,168,76,0.2);
    color: var(--muted); background: rgba(201,168,76,0.04);
  }

  .paint-card-footer {
    padding: 14px 24px;
    border-top: 1px solid rgba(201,168,76,0.08);
    display: flex; justify-content: space-between; align-items: center;
  }
  .paint-finish-dot {
    width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 6px;
  }
  .paint-finish-label {
    font-family: var(--font-ui); font-size: 10px; color: var(--muted); letter-spacing: 1px;
  }
  .paint-learn-more {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: var(--gold);
    background: none; border: none; cursor: pointer; transition: color 0.3s;
  }
  .paint-learn-more:hover { color: var(--gold-light); }

  @media (max-width: 1024px) { .paints-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 768px) { .paints-grid { grid-template-columns: 1fr; } }
`;

const PAINT_CATEGORIES = ["All", "Interior", "Exterior", "Texture", "Waterproofing"];

const paints = [
  {
    badge: "Interior",
    title: "Luxury Emulsion",
    desc: "Premium smooth finish emulsion paint with superior coverage, washable surface and rich depth of colour for elegant interiors.",
    features: ["Washable", "Low Odour", "Anti-Fungal", "1000+ Shades"],
    finish: "#e8e0d0",
    finishLabel: "Smooth Matt Finish",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    badge: "Interior",
    title: "Silk Sheen Paint",
    desc: "Elegant silk-sheen finish that gives walls a subtle lustre, creating an atmosphere of refinement in any living space.",
    features: ["Moisture Resistant", "Easy Clean", "Durable", "Eco-Friendly"],
    finish: "#d4c9b0",
    finishLabel: "Silk Sheen Finish",
    img: "/images/img65.jpg",
  },
  {
    badge: "Exterior",
    title: "Weatherproof Emulsion",
    desc: "High-performance exterior paint with advanced weather resistance. Protects buildings from UV, rain, and moisture for years.",
    features: ["UV Resistant", "Waterproof", "Anti-Algae", "10yr Warranty"],
    finish: "#c8bfa8",
    finishLabel: "Matt Exterior Finish",
    img: "/images/img64.jpg",
  },
  {
    badge: "Texture",
    title: "Rustic Textured Finish",
    desc: "Silica-based modified acrylic product giving a wide range of innovative trowel-based patterns for dramatic wall character.",
    features: ["Interior/Exterior", "Crack Resistant", "Unique Patterns", "Durable"],
    finish: "#b8a888",
    finishLabel: "Rustic Texture",
    img: "/images/img66.jpg",
  },
  {
    badge: "Texture",
    title: "Superfine Texture",
    desc: "Ultra-fine granular texture finish creating a refined, sophisticated surface with subtle depth and dimension.",
    features: ["Smooth Grain", "Paintable", "Interior Use", "Custom Colours"],
    finish: "#a89878",
    finishLabel: "Fine Texture Finish",
    img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80",
  },
  {
    badge: "Waterproofing",
    title: "Waterproof Coating",
    desc: "Advanced elastomeric waterproof coating for roofs, terraces, and wet areas. Creates a seamless protective membrane.",
    features: ["Roof/Terrace", "Seamless", "Long-Lasting", "Crack-Bridging"],
    finish: "#8899aa",
    finishLabel: "Protective Coating",
    img: "/images/img67.jpg",
  },
];

export default function PaintProducts() {
  return (
    <>
      <style>{paintStyles}</style>
      <section id="products" className="section paints-section">
        <div className="section-inner">
          <FadeIn>
            <div style={{ maxWidth: 620 }}>
              <div className="section-label">Paint Range</div>
              <h2 className="section-title">
                Our <span className="gold">Paint Products</span>
              </h2>
              <div className="gold-line" />
              <p className="section-desc">
                Premium quality paints and finishes for every surface — interior, exterior, texture and waterproofing solutions all under one roof.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="paints-tabs">
              {PAINT_CATEGORIES.map((c, i) => (
                <button key={c} className={`paints-tab${i === 0 ? " active" : ""}`}>{c}</button>
              ))}
            </div>
          </FadeIn>

          <div className="paints-grid">
            {paints.map((p, i) => (
              <FadeIn key={p.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="paint-card">
                  <div className="paint-card-img-wrap">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="paint-card-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, #1a2a3a, #0d1520)';
                        e.target.parentNode.style.height = '220px';
                      }}
                    />
                    <span className="paint-card-badge">{p.badge}</span>
                  </div>
                  <div className="paint-card-body">
                    <div className="paint-card-title">{p.title}</div>
                    <p className="paint-card-desc">{p.desc}</p>
                    <div className="paint-card-features">
                      {p.features.map(f => (
                        <span key={f} className="paint-chip">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="paint-card-footer">
                    <span className="paint-finish-label">
                      <span className="paint-finish-dot" style={{ background: p.finish }} />
                      {p.finishLabel}
                    </span>
                    <button className="paint-learn-more">Learn More →</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
