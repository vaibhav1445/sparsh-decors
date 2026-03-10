import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";
import { GALLERY_ITEMS } from "../data/content";

const galleryStyles = `
  .gallery-section { background: var(--navy3); }
  .gallery-tabs { display: flex; gap: 4px; margin-top: 48px; flex-wrap: wrap; }
  .gallery-tab {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    padding: 10px 22px; cursor: pointer; border: none; transition: all 0.3s;
    background: rgba(201,168,76,0.06); color: var(--muted);
    border: 1px solid rgba(201,168,76,0.1);
  }
  .gallery-tab.active { background: var(--gold); color: var(--navy); border-color: var(--gold); }
  .gallery-tab:hover:not(.active) { background: rgba(201,168,76,0.12); color: var(--gold-light); }
  .gallery-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 200px); gap: 4px; margin-top: 16px;
  }
  .gallery-item {
    position: relative; overflow: hidden; background: var(--navy2);
    display: flex; align-items: center; justify-content: center;
    cursor: zoom-in; border: 1px solid rgba(201,168,76,0.1); transition: all 0.4s;
  }
  .gallery-item.span2 { grid-column: span 2; }
  .gallery-item.span-row2 { grid-row: span 2; }
  .gallery-item-bg {
    position: absolute; inset: 0; display: flex; align-items: center;
    justify-content: center; font-size: 48px; transition: transform 0.5s ease;
  }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
  .gallery-item:hover .gallery-item-bg,
  .gallery-item:hover img { transform: scale(1.06); }
  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,27,42,0.92), rgba(13,27,42,0.1));
    opacity: 0; transition: opacity 0.4s;
    display: flex; align-items: flex-end; flex-direction: column;
    justify-content: flex-end; padding: 20px;
    z-index: 2;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-item:hover { border-color: rgba(201,168,76,0.35); }
  .gallery-overlay-text {
    font-family: var(--font-display); font-size: 15px;
    letter-spacing: 2px; color: var(--gold-light); text-transform: uppercase; margin-bottom: 4px;
  }
  .gallery-overlay-sub {
    font-family: var(--font-ui); font-size: 10px;
    letter-spacing: 2px; color: var(--muted); text-transform: uppercase;
  }

  /* Zoom icon on hover */
  .gallery-zoom-hint {
    position: absolute; top: 12px; right: 12px; z-index: 3;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(201,168,76,0.85);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    opacity: 0; transition: opacity 0.3s, transform 0.3s;
    transform: scale(0.7);
  }
  .gallery-item:hover .gallery-zoom-hint { opacity: 1; transform: scale(1); }

  .gallery-gradient-1 { background: linear-gradient(135deg, #1a3a5c, #0d2035); }
  .gallery-gradient-2 { background: linear-gradient(135deg, #2a1a0e, #1a1205); }
  .gallery-gradient-3 { background: linear-gradient(135deg, #1a2a1a, #0d1f0d); }
  .gallery-gradient-4 { background: linear-gradient(135deg, #2a1a2a, #1a0d1a); }
  .gallery-gradient-5 { background: linear-gradient(135deg, #1a2a3a, #0d1a26); }
  .gallery-gradient-6 { background: linear-gradient(135deg, #2a2a1a, #1a1a0d); }
  .gallery-note {
    text-align: center; margin-top: 20px; color: #a89878;
    font-style: italic; font-size: 13px; font-family: var(--font-ui);
    padding: 12px; border: 1px dashed rgba(201,168,76,0.2);
    background: rgba(201,168,76,0.02);
  }

  /* ===================== */
  /* LIGHTBOX              */
  /* ===================== */
  .gl-lightbox-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5, 10, 18, 0.97);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: gl-lb-in 0.25s ease; cursor: zoom-out;
  }
  @keyframes gl-lb-in { from { opacity: 0; } to { opacity: 1; } }

  .gl-lightbox-inner {
    position: relative; max-width: 90vw; max-height: 90vh;
    display: flex; flex-direction: column; align-items: center;
    animation: gl-lb-scale 0.3s cubic-bezier(0.34,1.56,0.64,1);
    cursor: default;
  }
  @keyframes gl-lb-scale {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  .gl-lightbox-img {
    max-width: 90vw; max-height: 80vh;
    object-fit: contain; display: block;
    border: 1px solid rgba(201,168,76,0.2);
    box-shadow: 0 24px 80px rgba(0,0,0,0.75);
  }
  .gl-lightbox-info { margin-top: 16px; text-align: center; }
  .gl-lightbox-label {
    font-family: var(--font-display); font-size: 18px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px;
  }
  .gl-lightbox-sub {
    font-family: var(--font-ui); font-size: 10px; color: var(--muted); letter-spacing: 3px;
  }
  .gl-lb-close {
    position: fixed; top: 24px; right: 28px;
    background: none; border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold); font-size: 22px; width: 44px; height: 44px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 10000;
  }
  .gl-lb-close:hover { background: rgba(201,168,76,0.12); border-color: var(--gold); }
  .gl-lb-arrow {
    position: fixed; top: 50%; transform: translateY(-50%);
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25);
    color: var(--gold); font-size: 26px; width: 48px; height: 64px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 10000;
  }
  .gl-lb-arrow:hover { background: rgba(201,168,76,0.2); border-color: var(--gold); }
  .gl-lb-arrow.prev { left: 16px; }
  .gl-lb-arrow.next { right: 16px; }
  .gl-lb-counter {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; color: var(--muted);
    background: rgba(13,27,42,0.8); padding: 6px 16px;
    border: 1px solid rgba(201,168,76,0.15);
  }

  @media (max-width: 1024px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
    .gallery-item.span2, .gallery-item.span-row2 { grid-column: span 1; grid-row: span 1; }
  }
  @media (max-width: 768px) {
    .gallery-grid { grid-template-columns: 1fr 1fr; }
    .gl-lb-arrow { display: none; }
  }
`;

const TABS = ["All", "Interior", "Exterior", "Texture Paint", "Waterproofing"];

// =====================
// LIGHTBOX COMPONENT
// =====================
function GalleryLightbox({ items, currentIndex, onClose, onPrev, onNext }) {
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
    <div className="gl-lightbox-overlay" onClick={onClose}>
      <button className="gl-lb-close" onClick={onClose} title="Close (Esc)">✕</button>
      <button className="gl-lb-arrow prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>

      <div className="gl-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        {item.img ? (
          <img src={item.img} alt={item.label} className="gl-lightbox-img" />
        ) : (
          /* Fallback for emoji items — show a styled card */
          <div style={{
            width: 400, height: 300, maxWidth: "90vw",
            background: "linear-gradient(135deg, #1a2a3a, #0d1520)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 80, border: "1px solid rgba(201,168,76,0.2)",
          }}>
            {item.icon}
          </div>
        )}
        <div className="gl-lightbox-info">
          <div className="gl-lightbox-label">{item.label}</div>
          <div className="gl-lightbox-sub">Sparsh Decors</div>
        </div>
      </div>

      <button className="gl-lb-arrow next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
      <div className="gl-lb-counter">{currentIndex + 1} / {items.length}</div>
    </div>
  );
}

// =====================
// MAIN GALLERY
// =====================
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImg = () => setLightboxIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  const nextImg = () => setLightboxIndex((i) => (i + 1) % GALLERY_ITEMS.length);

  return (
    <>
      <style>{galleryStyles}</style>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={GALLERY_ITEMS}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}

      <section id="gallery" className="section gallery-section">
        <div className="section-inner">
          <FadeIn>
            <div style={{ maxWidth: 600 }}>
              <div className="section-label">Our Portfolio</div>
              <h2 className="section-title">Work That <span className="gold">Speaks</span></h2>
              <div className="gold-line" />
              <p className="section-desc">A glimpse into our craftsmanship — real projects, real transformations.</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="gallery-tabs">
              {TABS.map((t, i) => (
                <button key={t} className={`gallery-tab${i === 0 ? " active" : ""}`}>{t}</button>
              ))}
            </div>
            <div className="gallery-grid">
              {GALLERY_ITEMS.map((g, i) => (
                <div
                  key={i}
                  className={`gallery-item${g.span2 ? " span2" : ""}${g.rowSpan ? " span-row2" : ""}`}
                  onClick={() => openLightbox(i)}
                >
                  <div className={`gallery-item-bg ${g.cls}`}>
                    {g.img ? (
                      <img src={g.img} alt={g.label}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <span style={{ fontSize: g.rowSpan ? 64 : 48 }}>{g.icon}</span>
                    )}
                  </div>
                  <div className="gallery-overlay">
                    <div className="gallery-overlay-text">{g.label}</div>
                    <div className="gallery-overlay-sub">Sparsh Decors</div>
                  </div>
                  {/* Zoom hint icon */}
                  <div className="gallery-zoom-hint">🔍</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}