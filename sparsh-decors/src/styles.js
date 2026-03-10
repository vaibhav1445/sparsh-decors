const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a84c;
    --gold-light: #f0d080;
    --gold-dim: #8a6a20;
    --navy: #0d1b2a;
    --navy2: #1a2a3a;
    --navy3: #112236;
    --white: #f5f0e8;
    --muted: #a89878;
    --font-display: 'Cinzel', serif;
    --font-body: 'Cormorant Garamond', serif;
    --font-ui: 'Lato', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--navy); color: var(--white); font-family: var(--font-body); overflow-x: hidden; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 3px; }

  .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  .section { padding: 100px 60px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }

  .section-label {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
    margin-bottom: 16px; display: flex; align-items: center; gap: 16px;
  }
  .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--gold-dim); }

  .section-title {
    font-family: var(--font-display); font-size: clamp(32px, 4vw, 52px);
    font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
    color: var(--white); line-height: 1.1; margin-bottom: 20px;
  }
  .section-title .gold { color: var(--gold-light); }

  .section-desc {
    font-size: 18px; font-weight: 300; color: rgba(245,240,232,0.65);
    line-height: 1.9; max-width: 600px; font-style: italic;
  }

  .gold-line {
    width: 80px; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin: 24px 0;
  }

  .btn-primary {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--navy);
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border: none; padding: 16px 40px; cursor: pointer; transition: all 0.3s;
    text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.35); }

  .btn-secondary {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--gold);
    background: transparent; border: 1px solid rgba(201,168,76,0.4);
    padding: 16px 40px; cursor: pointer; transition: all 0.3s;
    text-decoration: none; display: inline-block;
  }
  .btn-secondary:hover { border-color: var(--gold); background: rgba(201,168,76,0.08); transform: translateY(-2px); }

  @media (max-width: 1024px) {
    .section { padding: 80px 30px; }
  }
  @media (max-width: 768px) {
    .section { padding: 70px 24px; }
  }
`;

export default globalStyles;
