const heroStyles = `
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; background: var(--navy);
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 60%),
      linear-gradient(160deg, #0d1b2a 0%, #112236 50%, #0a1520 100%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-content {
    position: relative; z-index: 2; text-align: center;
    padding: 120px 40px 80px; max-width: 900px;
  }
  .hero-badge {
    display: inline-block; font-family: var(--font-ui); font-size: 10px;
    font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
    border: 1px solid rgba(201,168,76,0.3); padding: 8px 20px; margin-bottom: 32px;
  }
  .hero-title {
    font-family: var(--font-display); font-size: clamp(52px, 8vw, 96px);
    font-weight: 700; line-height: 1; letter-spacing: 6px;
    color: var(--white); text-transform: uppercase; margin-bottom: 12px;
  }
  .hero-title .gold { color: var(--gold-light); }
  .hero-sub {
    font-family: var(--font-display); font-size: clamp(16px, 2.5vw, 22px);
    font-weight: 400; letter-spacing: 8px; color: var(--muted);
    text-transform: uppercase; margin-bottom: 28px;
  }
  .hero-divider {
    width: 120px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 0 auto 28px;
  }
  .hero-desc {
    font-size: clamp(16px, 2vw, 20px); font-weight: 300;
    color: rgba(245,240,232,0.7); line-height: 1.8; max-width: 600px;
    margin: 0 auto 48px; font-style: italic;
  }
  .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .hero-scroll {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    font-family: var(--font-ui); font-size: 9px; letter-spacing: 4px;
    text-transform: uppercase; color: var(--gold-dim);
    animation: bounce 2s ease-in-out infinite;
  }
  .hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--gold), transparent); }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }
`;

export default function Hero({ scrollTo }) {
  return (
    <>
      <style>{heroStyles}</style>
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">Delhi's Premier Design Studio</div>
          <h1 className="hero-title">
            <span className="gold">Sparsh</span>
            <br />
            Decors
          </h1>
          <p className="hero-sub">Design · Texture · Elegance</p>
          <div className="hero-divider" />
          <p className="hero-desc">
            We don't just paint walls — we create experiences. Transforming ordinary spaces into
            beautiful, functional environments that reflect your vision.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("services")}>
              Our Services
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")}>
              Free Consultation
            </button>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </section>
    </>
  );
}
