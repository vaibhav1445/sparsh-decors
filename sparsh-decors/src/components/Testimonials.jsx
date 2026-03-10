import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

const testimonialStyles = `
  .testimonials-section { background: var(--navy3); }

  .testimonials-track-wrap { overflow: hidden; margin-top: 60px; position: relative; }
  .testimonials-track {
    display: flex; gap: 24px;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .testimonial-card {
    flex: 0 0 calc(33.33% - 16px);
    background: var(--navy2);
    border: 1px solid rgba(201,168,76,0.1);
    padding: 36px 32px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }
  .testimonial-card:hover {
    border-color: rgba(201,168,76,0.25);
    transform: translateY(-4px);
  }
  .testimonial-card::before {
    content: '"';
    position: absolute; top: 10px; right: 20px;
    font-family: var(--font-display); font-size: 120px; line-height: 1;
    color: rgba(201,168,76,0.06); font-weight: 700; pointer-events: none;
  }
  .testimonial-stars {
    display: flex; gap: 4px; margin-bottom: 18px;
  }
  .star { color: var(--gold); font-size: 14px; }
  .testimonial-text {
    font-size: 16px; font-weight: 300; font-style: italic;
    color: rgba(245,240,232,0.78); line-height: 1.9;
    margin-bottom: 24px; position: relative; z-index: 1;
  }
  .testimonial-divider {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin-bottom: 18px;
  }
  .testimonial-author { display: flex; align-items: center; gap: 14px; }
  .testimonial-avatar {
    width: 46px; height: 46px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.3));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
    border: 1px solid rgba(201,168,76,0.25);
  }
  .testimonial-name {
    font-family: var(--font-display); font-size: 16px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 1px;
  }
  .testimonial-role {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
    margin-top: 2px;
  }
  .testimonial-tag {
    display: inline-block; margin-top: 14px;
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); border: 1px solid rgba(201,168,76,0.25);
    padding: 3px 10px;
  }

  /* Controls */
  .testimonials-controls {
    display: flex; align-items: center; justify-content: center;
    gap: 16px; margin-top: 40px;
  }
  .t-btn {
    width: 44px; height: 44px;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--gold); font-size: 18px;
    cursor: pointer; transition: all 0.3s; display: flex;
    align-items: center; justify-content: center;
  }
  .t-btn:hover { background: rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.5); }
  .t-dots { display: flex; gap: 8px; }
  .t-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(201,168,76,0.2);
    cursor: pointer; transition: all 0.3s; border: none;
  }
  .t-dot.active { background: var(--gold); transform: scale(1.3); }

  /* Overall rating */
  .rating-bar {
    display: flex; align-items: center; justify-content: center; gap: 16px;
    margin-top: 50px; padding: 24px;
    border: 1px solid rgba(201,168,76,0.12);
    background: rgba(201,168,76,0.03);
  }
  .rating-number {
    font-family: var(--font-display); font-size: 52px; font-weight: 700; color: var(--gold-light);
  }
  .rating-stars { display: flex; gap: 6px; font-size: 22px; }
  .rating-info { font-family: var(--font-ui); font-size: 11px; color: var(--muted); letter-spacing: 2px; }

  @media (max-width: 1024px) {
    .testimonial-card { flex: 0 0 calc(50% - 12px); }
  }
  @media (max-width: 768px) {
    .testimonial-card { flex: 0 0 100%; }
  }
`;

const testimonials = [
  {
    text: "Sparsh Decors completely transformed our living room. The texture paint work is absolutely stunning — every guest who visits asks about it. Truly professional team!",
    name: "Ravi Sharma",
    role: "Homeowner · Dwarka, Delhi",
    emoji: "👨",
    tag: "Texture Paint",
    stars: 5,
  },
  {
    text: "We hired Sparsh Decors for our entire office interior. From planning to execution, everything was seamless. The quality is top-notch and pricing is very reasonable.",
    name: "Priya Mehta",
    role: "Business Owner · Rohini, Delhi",
    emoji: "👩",
    tag: "Office Interior",
    stars: 5,
  },
  {
    text: "Had a severe water leakage problem for years. Their waterproofing solution completely fixed it. It's been 2 years and not a single drop. Highly recommended!",
    name: "Anil Kumar",
    role: "Resident · Janakpuri, Delhi",
    emoji: "👨‍💼",
    tag: "Waterproofing",
    stars: 5,
  },
  {
    text: "The exterior work they did for our building is breathtaking. Modern texture finish with perfect color combination. The whole society is impressed!",
    name: "Sunita Verma",
    role: "Society President · Noida",
    emoji: "👩‍💼",
    tag: "Exterior Design",
    stars: 5,
  },
  {
    text: "Got my bedroom done with their hi-tech paint design. The 3D wall effect is just wow! Very skilled team, completed on time, and stayed within my budget.",
    name: "Rohit Gupta",
    role: "Homeowner · Pitampura, Delhi",
    emoji: "🧑",
    tag: "Hi-Tech Paint",
    stars: 5,
  },
  {
    text: "Sparsh Decors did our restaurant interior and it has completely changed the ambiance. Customers love the new look and our footfall has visibly increased!",
    name: "Deepak Jain",
    role: "Restaurant Owner · Lajpat Nagar",
    emoji: "👨‍🍳",
    tag: "Commercial Interior",
    stars: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const offset = current * perPage;

  return (
    <>
      <style>{testimonialStyles}</style>
      <section id="testimonials" className="section testimonials-section">
        <div className="section-inner">
          <FadeIn>
            <div style={{ maxWidth: 600 }}>
              <div className="section-label">Client Reviews</div>
              <h2 className="section-title">
                What Our <span className="gold">Clients Say</span>
              </h2>
              <div className="gold-line" />
              <p className="section-desc">
                Real experiences from real clients — our work speaks through their words.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="testimonials-track-wrap">
              <div
                className="testimonials-track"
                style={{ transform: `translateX(calc(-${current * (100 / perPage)}% - ${current * 8}px))` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="testimonial-card">
                    <div className="testimonial-stars">
                      {Array(t.stars).fill(0).map((_, j) => (
                        <span key={j} className="star">★</span>
                      ))}
                    </div>
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-divider" />
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">{t.emoji}</div>
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="testimonial-role">{t.role}</div>
                      </div>
                    </div>
                    <span className="testimonial-tag">{t.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="testimonials-controls">
              <button className="t-btn" onClick={() => setCurrent((c) => (c - 1 + totalPages) % totalPages)}>‹</button>
              <div className="t-dots">
                {Array(totalPages).fill(0).map((_, i) => (
                  <button key={i} className={`t-dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} />
                ))}
              </div>
              <button className="t-btn" onClick={() => setCurrent((c) => (c + 1) % totalPages)}>›</button>
            </div>

            {/* Overall Rating */}
            <div className="rating-bar">
              <div className="rating-number">5.0</div>
              <div>
                <div className="rating-stars">{"★★★★★"}</div>
                <div className="rating-info">AVERAGE RATING</div>
              </div>
              <div style={{ width: 1, height: 50, background: "rgba(201,168,76,0.2)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--gold-light)", fontWeight: 700 }}>500+</div>
                <div className="rating-info">HAPPY CLIENTS</div>
              </div>
              <div style={{ width: 1, height: 50, background: "rgba(201,168,76,0.2)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--gold-light)", fontWeight: 700 }}>100%</div>
                <div className="rating-info">SATISFACTION RATE</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
