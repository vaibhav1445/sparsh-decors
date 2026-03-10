import { useState, useRef, useEffect } from "react";
import FadeIn from "./FadeIn";

const beforeAfterStyles = `
  .ba-section { background: var(--navy); }
  .ba-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 24px; margin-top: 60px;
  }
  .ba-card {
    position: relative; overflow: hidden;
    border: 1px solid rgba(201,168,76,0.12);
    background: var(--navy2);
    transition: border-color 0.3s;
  }
  .ba-card:hover { border-color: rgba(201,168,76,0.3); }
  .ba-slider-wrap {
    position: relative; width: 100%;
    aspect-ratio: 4/3; overflow: hidden; cursor: ew-resize; user-select: none;
  }
  .ba-after, .ba-before {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .ba-after { z-index: 1; }
  .ba-before {
    z-index: 2;
    clip-path: inset(0 50% 0 0);
    transition: clip-path 0s;
  }
  .ba-divider {
    position: absolute; top: 0; bottom: 0; z-index: 3;
    width: 3px; background: var(--gold-light);
    left: 50%; transform: translateX(-50%);
    pointer-events: none;
  }
  .ba-handle {
    position: absolute; top: 50%; z-index: 4;
    left: 50%; transform: translate(-50%, -50%);
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    pointer-events: none; cursor: ew-resize;
    font-size: 14px; font-weight: 900; color: var(--navy);
    font-family: var(--font-ui);
  }
  .ba-label-wrap {
    position: absolute; bottom: 12px; left: 0; right: 0;
    display: flex; justify-content: space-between;
    padding: 0 14px; z-index: 5; pointer-events: none;
  }
  .ba-label {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 10px;
  }
  .ba-label.before { background: rgba(13,27,42,0.85); color: var(--muted); }
  .ba-label.after { background: rgba(201,168,76,0.85); color: var(--navy); }
  .ba-info { padding: 20px 22px; }
  .ba-title {
    font-family: var(--font-display); font-size: 18px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold-light); margin-bottom: 6px;
  }
  .ba-desc {
    font-size: 13px; color: var(--muted);
    line-height: 1.6; font-family: var(--font-ui);
  }
  .ba-drag-hint {
    text-align: center; margin-top: 12px;
    font-family: var(--font-ui); font-size: 11px;
    color: var(--muted); letter-spacing: 2px; font-style: italic;
  }
  @media (max-width: 1024px) { .ba-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 768px) { .ba-grid { grid-template-columns: 1fr; } }
`;

// ✅ HOW TO ADD YOUR IMAGES:
// 1. Put your before/after photos in: public/images/
// 2. Fill in the image path below like: "/images/living-before.jpeg"
// 3. If image is left as "" it shows the emoji fallback instead

const projects = [
  {
    title: "Living Room Makeover",
    desc: "Plain walls transformed into textured luxury finish with Italian-style patterns.",
    before: {
      image: "/images/img11.jpeg",              // ← "/images/living-before.jpeg"
      bg: "#1a1a1a",
      emoji: "🏚️",
      label: "Plain Walls"
    },
    after: {
      image: "/images/img9.jpeg",              // ← "/images/living-after.jpeg"
      bg: "#1a2a3a",
      emoji: "🛋️",
      label: "Textured Luxury"
    },
  },
  {
    title: "Exterior Renovation",
    desc: "Faded building exterior revived with weather-resistant designer coating.",
    before: {
      image: "/images/img27.jpeg",              // ← "/images/exterior-before.jpeg"
      bg: "#1a1505",
      emoji: "🏗️",
      label: "Old Paint"
    },
    after: {
      image: "/images/img15.jpeg",              // ← "/images/exterior-after.jpeg"
      bg: "#0d2a1a",
      emoji: "🏛️",
      label: "Modern Finish"
    },
  },
  {
    title: "Office Interior",
    desc: "Dull corporate office elevated with premium texture paint and accent walls.",
    before: {
      image: "",              // ← "/images/office-before.jpeg"
      bg: "#111111",
      emoji: "🏢",
      label: "Basic Walls"
    },
    after: {
      image: "",              // ← "/images/office-after.jpeg"
      bg: "#1a1a2e",
      emoji: "💼",
      label: "Premium Interior"
    },
  },
];

function BeforeAfterSlider({ project }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = (clientX) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };

  const onMouseDown = (e) => { dragging.current = true; updatePos(e.clientX); };
  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e) => { if (dragging.current) updatePos(e.touches[0].clientX); };
  const onTouchStart = (e) => { dragging.current = true; updatePos(e.touches[0].clientX); };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  const { before, after } = project;

  return (
    <div
      className="ba-slider-wrap"
      ref={wrapRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* ── AFTER layer (base, always fully visible) ── */}
      {after.image ? (
        <div className="ba-after" style={{ backgroundImage: `url(${after.image})` }} />
      ) : (
        <div className="ba-after" style={{ background: after.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 52 }}>{after.emoji}</span>
        </div>
      )}

      {/* ── BEFORE layer (clipped by slider position) ── */}
      {before.image ? (
        <div
          className="ba-before"
          style={{
            backgroundImage: `url(${before.image})`,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        />
      ) : (
        <div
          className="ba-before"
          style={{
            background: before.bg,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <span style={{ fontSize: 52 }}>{before.emoji}</span>
        </div>
      )}

      {/* Divider line */}
      <div className="ba-divider" style={{ left: `${pos}%` }} />

      {/* Handle knob */}
      <div className="ba-handle" style={{ left: `${pos}%` }}>◀▶</div>

      {/* Before / After labels */}
      <div className="ba-label-wrap">
        <span className="ba-label before">BEFORE</span>
        <span className="ba-label after">AFTER</span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <>
      <style>{beforeAfterStyles}</style>
      <section id="before-after" className="section ba-section">
        <div className="section-inner">
          <FadeIn>
            <div style={{ maxWidth: 600 }}>
              <div className="section-label">Transformations</div>
              <h2 className="section-title">
                Before <span className="gold">&</span> After
              </h2>
              <div className="gold-line" />
              <p className="section-desc">
                Drag the slider to see how we transform ordinary spaces into extraordinary ones.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <p className="ba-drag-hint">👆 Drag the slider on each card to reveal the transformation</p>
          </FadeIn>
          <div className="ba-grid">
            {projects.map((p, i) => (
              <FadeIn key={p.title} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="ba-card">
                  <BeforeAfterSlider project={p} />
                  <div className="ba-info">
                    <div className="ba-title">{p.title}</div>
                    <div className="ba-desc">{p.desc}</div>
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