import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

const textureStyles = `
  .texture-section { background: var(--navy3); }

  .texture-hero {
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
    align-items: center; margin-bottom: 80px;
  }
  .texture-hero-img {
    width: 100%; aspect-ratio: 16/10; object-fit: cover;
    border: 1px solid rgba(201,168,76,0.15);
    display: block;
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
  }
  .texture-hero-corner {
    position: absolute; bottom: -12px; right: -12px;
    width: 36px; height: 36px;
    border-bottom: 2px solid var(--gold); border-right: 2px solid var(--gold);
  }
  .texture-hero-wrap { position: relative; }

  /* Filter Bar */
  .texture-filter-bar {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-bottom: 36px; align-items: center;
  }
  .texture-filter-label {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
    margin-right: 4px;
  }
  .texture-filter-btn {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 7px 16px; background: none;
    border: 1px solid rgba(201,168,76,0.15);
    color: var(--muted); cursor: pointer; transition: all 0.25s;
  }
  .texture-filter-btn:hover { border-color: rgba(201,168,76,0.35); color: var(--gold-light); }
  .texture-filter-btn.active {
    background: rgba(201,168,76,0.1); border-color: var(--gold); color: var(--gold);
  }

  .texture-types-label {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase; color: var(--gold);
    margin-bottom: 24px; display: flex; align-items: center; gap: 12px;
  }
  .texture-types-label::after {
    content: ''; height: 1px; flex: 1; max-width: 60px; background: var(--gold-dim);
  }

  .texture-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
    min-height: 200px;
  }

  .texture-type-card {
    position: relative; overflow: hidden;
    border: 1px solid rgba(201,168,76,0.1);
    cursor: pointer; transition: all 0.4s;
    background: var(--navy2);
    animation: fadeSlideIn 0.35s ease forwards;
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .texture-type-card:hover { border-color: rgba(201,168,76,0.35); transform: translateY(-4px); }

  /* Texture image wrap */
  .texture-type-img-wrap { overflow: hidden; position: relative; cursor: zoom-in; }
  .texture-type-img {
    width: 100%; height: 180px; object-fit: cover; display: block;
    transition: transform 0.5s ease;
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
  }
  .texture-type-card:hover .texture-type-img { transform: scale(1.07); }

  /* Zoom hover overlay — shared by texture + oikos */
  .texture-zoom-icon, .oikos-zoom-icon {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(13,27,42,0.45);
    opacity: 0; transition: opacity 0.3s;
  }
  .texture-type-img-wrap:hover .texture-zoom-icon { opacity: 1; }
  .oikos-type-img-wrap:hover .oikos-zoom-icon { opacity: 1; }

  .texture-zoom-circle, .oikos-zoom-circle {
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(201,168,76,0.9);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; transition: transform 0.3s;
  }
  .texture-type-img-wrap:hover .texture-zoom-circle,
  .oikos-type-img-wrap:hover .oikos-zoom-circle { transform: scale(1.1); }

  .texture-type-body { padding: 18px 16px; }
  .texture-type-name {
    font-family: var(--font-display); font-size: 16px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 1px; margin-bottom: 8px;
  }
  .texture-type-desc {
    font-family: var(--font-ui); font-size: 12px; color: var(--muted); line-height: 1.6;
  }
  .texture-type-tag {
    display: inline-block; margin-top: 10px;
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 2px;
  }

  /* No results */
  .texture-empty {
    grid-column: 1 / -1; text-align: center; padding: 60px 20px;
    font-family: var(--font-ui); font-size: 12px; color: var(--muted); letter-spacing: 2px;
  }

  /* ===================== */
  /* LIGHTBOX              */
  /* ===================== */
  .tx-lightbox-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5, 10, 18, 0.97);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: tx-lb-in 0.25s ease; cursor: zoom-out;
  }
  @keyframes tx-lb-in { from { opacity: 0; } to { opacity: 1; } }
  .tx-lightbox-inner {
    position: relative; max-width: 88vw; max-height: 90vh;
    display: flex; flex-direction: column; align-items: center;
    animation: tx-lb-scale 0.3s cubic-bezier(0.34,1.56,0.64,1); cursor: default;
  }
  @keyframes tx-lb-scale {
    from { opacity: 0; transform: scale(0.84); }
    to   { opacity: 1; transform: scale(1); }
  }
  .tx-lightbox-img {
    max-width: 88vw; max-height: 78vh; object-fit: contain; display: block;
    border: 1px solid rgba(201,168,76,0.2); box-shadow: 0 24px 80px rgba(0,0,0,0.75);
  }
  .tx-lightbox-info { margin-top: 18px; text-align: center; }
  .tx-lightbox-name {
    font-family: var(--font-display); font-size: 20px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px;
  }
  .tx-lightbox-tag {
    font-family: var(--font-ui); font-size: 10px; color: var(--muted);
    letter-spacing: 3px; text-transform: uppercase;
  }
  .tx-lb-close {
    position: fixed; top: 24px; right: 28px;
    background: none; border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold); font-size: 22px; width: 44px; height: 44px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 10000;
  }
  .tx-lb-close:hover { background: rgba(201,168,76,0.12); border-color: var(--gold); }
  .tx-lb-arrow {
    position: fixed; top: 50%; transform: translateY(-50%);
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25);
    color: var(--gold); font-size: 26px; width: 48px; height: 64px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 10000;
  }
  .tx-lb-arrow:hover { background: rgba(201,168,76,0.2); border-color: var(--gold); }
  .tx-lb-arrow.prev { left: 16px; }
  .tx-lb-arrow.next { right: 16px; }
  .tx-lb-counter {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; color: var(--muted);
    background: rgba(13,27,42,0.8); padding: 6px 16px;
    border: 1px solid rgba(201,168,76,0.15);
  }

  /* Oikos Italian section */
  .oikos-strip {
    margin-top: 60px; padding: 40px;
    background: rgba(201,168,76,0.04); border: 1px solid rgba(201,168,76,0.15);
  }
  .oikos-title {
    font-family: var(--font-display); font-size: 14px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase; color: var(--gold);
    margin-bottom: 24px; text-align: center;
  }
  .oikos-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
  .oikos-item {
    text-align: center; border: 1px solid rgba(201,168,76,0.1);
    background: rgba(201,168,76,0.03); transition: all 0.3s; cursor: pointer;
    overflow: hidden;
  }
  .oikos-item:hover { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.08); }

  /* Oikos image wrap */
  .oikos-type-img-wrap { overflow: hidden; position: relative; cursor: zoom-in; }
  .oikos-item-img {
    width: 100%; height: 90px; object-fit: cover; display: block;
    transition: transform 0.4s;
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
  }
  .oikos-item:hover .oikos-item-img { transform: scale(1.07); }
  .oikos-item-body { padding: 8px 6px; }

  /* Oikos emoji fallback */
  .oikos-item-emoji { padding: 14px 8px; }
  .oikos-icon { font-size: 22px; margin-bottom: 6px; }
  .oikos-name {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 1px; color: var(--muted); text-transform: uppercase;
  }

  @media (max-width: 1024px) {
    .texture-hero { grid-template-columns: 1fr; gap: 40px; }
    .texture-grid { grid-template-columns: repeat(2, 1fr); }
    .oikos-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .texture-grid { grid-template-columns: 1fr 1fr; }
    .oikos-grid { grid-template-columns: repeat(2, 1fr); }
    .texture-filter-bar { gap: 8px; }
    .texture-filter-btn { padding: 6px 12px; }
    .tx-lb-arrow { display: none; }
  }
`;

const FILTERS = ["All", "Interior", "Exterior", "Luxury", "Hi-Tech", "Designer"];

const textureTypes = [
  {
    name: "Rustic Texture",
    desc: "Natural stone-like finish with earthy depth and character. Perfect for feature walls and exteriors.",
    tag: "Interior / Exterior", category: "Exterior",
    img: "/images/img43.jpg",
  },
  {
    name: "Smooth Texture",
    desc: "Fine granular finish with a refined, sophisticated surface. Subtle depth without heavy texture.",
    tag: "Interior", category: "Interior",
    img: "/images/img44.jpg",
  },
  {
    name: "Sand Texture",
    desc: "Coarse sand-like finish that adds visual warmth and dimension to any wall surface.",
    tag: "Interior / Exterior", category: "Exterior",
    img: "/images/img45.jpg",
  },
  {
    name: "Marble Effect",
    desc: "Luxury marble-look finish using Italian techniques. Brings timeless elegance to interiors.",
    tag: "Interior — Premium", category: "Luxury",
    img: "/images/img46.jpg",
  },
  {
    name: "Venetian Plaster",
    desc: "Old-world Italian polished plaster technique giving walls a rich, luminous depth.",
    tag: "Interior — Luxury", category: "Luxury",
    img: "/images/img47.jpg",
  },
  {
    name: "Concrete Effect",
    desc: "Industrial-style cement look for modern, minimalist interiors with bold character.",
    tag: "Interior", category: "Interior",
    img: "/images/img48.jpg",
  },
  {
    name: "3D Wall Panels",
    desc: "High-tech dimensional wall patterns that create striking architectural visual effects.",
    tag: "Interior — Hi-Tech", category: "Hi-Tech",
    img: "/images/img49.jpg",
  },
  {
    name: "Metallic Finish",
    desc: "Lustrous metallic sheen in gold, silver, bronze tones for glamorous, upscale spaces.",
    tag: "Interior — Designer", category: "Designer",
    img: "/images/img50.jpg",
  },
];

const oikosTextures = [
  { icon: "🏛️", name: "Ottocento",  img: "/images/img51.jpg" },
  { icon: "✨", name: "Ultrasaten", img: "/images/img52.jpg" },
  { icon: "🎨", name: "Supercolor", img: "/images/img53.jpg" },
  { icon: "🌿", name: "Multidecor", img: "/images/img54.jpg" },
  { icon: "💎", name: "Marmorino",  img: "/images/img55.jpg" },
  { icon: "🪨", name: "Cemento",    img: "/images/img56.jpg" },
  { icon: "🌊", name: "Travertino", img: "/images/img57.jpg" },
  { icon: "⭐", name: "Imperium",   img: "/images/img58.jpg" },
  { icon: "🔮", name: "Encanto",    img: "/images/img59.jpg" },
  { icon: "🌀", name: "Kreos",      img: "/images/img60.jpg" },
  { icon: "🏺", name: "Raffaello",  img: "/images/img61.jpg" },
  { icon: "🎭", name: "Supercolor", img: "/images/img62.jpg" },
];

// =====================
// LIGHTBOX COMPONENT
// =====================
function TextureLightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const item = items[currentIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="tx-lightbox-overlay" onClick={onClose}>
      <button className="tx-lb-close" onClick={onClose} title="Close (Esc)">✕</button>
      <button className="tx-lb-arrow prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <div className="tx-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={item.img} alt={item.name} className="tx-lightbox-img" />
        <div className="tx-lightbox-info">
          <div className="tx-lightbox-name">{item.name}</div>
          <div className="tx-lightbox-tag">{item.tag || item.name}</div>
        </div>
      </div>
      <button className="tx-lb-arrow next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
      <div className="tx-lb-counter">{currentIndex + 1} / {items.length}</div>
    </div>
  );
}

// =====================
// MAIN COMPONENT
// =====================
export default function TextureTypes() {
  const [activeFilter, setActiveFilter] = useState("All");
  // Two separate lightbox states — one for texture cards, one for oikos
  const [textureLbIndex, setTextureLbIndex] = useState(null);
  const [oikosLbIndex, setOikosLbIndex] = useState(null);

  const filtered = activeFilter === "All"
    ? textureTypes
    : textureTypes.filter((t) => t.category === activeFilter);

  // Only oikos items that have an image are lightbox-able
  const oikosWithImg = oikosTextures.filter((o) => o.img);

  return (
    <>
      <style>{textureStyles}</style>

      {/* Texture types lightbox */}
      {textureLbIndex !== null && (
        <TextureLightbox
          items={filtered}
          currentIndex={textureLbIndex}
          onClose={() => setTextureLbIndex(null)}
          onPrev={() => setTextureLbIndex((i) => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setTextureLbIndex((i) => (i + 1) % filtered.length)}
        />
      )}

      {/* Oikos lightbox */}
      {oikosLbIndex !== null && (
        <TextureLightbox
          items={oikosWithImg}
          currentIndex={oikosLbIndex}
          onClose={() => setOikosLbIndex(null)}
          onPrev={() => setOikosLbIndex((i) => (i - 1 + oikosWithImg.length) % oikosWithImg.length)}
          onNext={() => setOikosLbIndex((i) => (i + 1) % oikosWithImg.length)}
        />
      )}

      <section id="textures" className="section texture-section">
        <div className="section-inner">

          {/* Hero split */}
          <div className="texture-hero">
            <FadeIn>
              <div className="texture-hero-wrap">
                <img
                  src="/images/img68.jpg"
                  alt="Texture Paint" className="texture-hero-img"
                />
                <div className="texture-hero-corner" />
              </div>
            </FadeIn>
            <FadeIn style={{ transitionDelay: "0.2s" }}>
              <div>
                <div className="section-label">Specialisation</div>
                <h2 className="section-title">
                  Texture Paint <span className="gold">Expertise</span>
                </h2>
                <div className="gold-line" />
                <p className="section-desc" style={{ marginBottom: 20 }}>
                  We specialize in a wide range of texture paint techniques — from subtle rustic finishes to dramatic Italian luxury coatings.
                </p>
                <p style={{ fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.8, fontStyle: "italic", fontFamily: "var(--font-body)" }}>
                  Every texture tells a story. Our skilled craftsmen apply each finish by hand, ensuring unique results that mass-production simply cannot replicate.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="texture-types-label">Types of Texture Finishes We Offer</div>
          </FadeIn>

          {/* Filter buttons */}
          <FadeIn>
            <div className="texture-filter-bar">
              <span className="texture-filter-label">Filter:</span>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`texture-filter-btn${activeFilter === f ? " active" : ""}`}
                  onClick={() => { setActiveFilter(f); setTextureLbIndex(null); }}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Texture cards */}
          <div className="texture-grid">
            {filtered.length === 0 ? (
              <div className="texture-empty">No finishes in this category yet.</div>
            ) : (
              filtered.map((t, i) => (
                <div
                  className="texture-type-card"
                  key={`${activeFilter}-${t.name}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="texture-type-img-wrap" onClick={() => setTextureLbIndex(i)}>
                    <img
                      src={t.img} alt={t.name} className="texture-type-img"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <div className="texture-zoom-icon">
                      <div className="texture-zoom-circle">🔍</div>
                    </div>
                  </div>
                  <div className="texture-type-body">
                    <div className="texture-type-name">{t.name}</div>
                    <div className="texture-type-desc">{t.desc}</div>
                    <span className="texture-type-tag">{t.tag}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Italian Oikos Strip */}
          <FadeIn>
            <div className="oikos-strip">
              <div className="oikos-title">✦ Premium Italian Texture Collection ✦</div>
              <div className="oikos-grid">
                {oikosTextures.map((o, i) => {
                  // Find index within oikosWithImg for lightbox
                  const lbIndex = oikosWithImg.findIndex((x) => x.name === o.name && x.img === o.img);
                  return (
                    <div key={`${o.name}-${i}`} className="oikos-item">
                      {o.img ? (
                        <>
                          {/* ✅ Single image, inside one clickable wrap */}
                          <div
                            className="oikos-type-img-wrap"
                            onClick={() => lbIndex !== -1 && setOikosLbIndex(lbIndex)}
                          >
                            <img
                              src={o.img}
                              alt={o.name}
                              className="oikos-item-img"
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                            <div className="oikos-zoom-icon">
                              <div className="oikos-zoom-circle">🔍</div>
                            </div>
                          </div>
                          <div className="oikos-item-body">
                            <div className="oikos-name">{o.name}</div>
                          </div>
                        </>
                      ) : (
                        /* Emoji fallback when no image */
                        <div className="oikos-item-emoji">
                          <div className="oikos-icon">{o.icon}</div>
                          <div className="oikos-name">{o.name}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}