import { NAV_LINKS, FOOTER_SERVICES } from "../data/content";

const footerStyles = `
  .footer { background: #070f18; border-top: 1px solid rgba(201,168,76,0.15); padding: 60px 60px 30px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 50px; }
  .footer-brand-name {
    font-family: var(--font-display); font-size: 28px; font-weight: 700;
    letter-spacing: 4px; color: var(--gold-light); text-transform: uppercase; margin-bottom: 6px;
  }
  .footer-brand-sub {
    font-family: var(--font-ui); font-size: 9px; letter-spacing: 5px;
    color: var(--muted); text-transform: uppercase; margin-bottom: 20px;
  }
  .footer-desc { font-size: 14px; color: var(--muted); line-height: 1.8; font-style: italic; }
  .footer-heading {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-family: var(--font-ui); font-size: 13px; color: var(--muted);
    text-decoration: none; transition: color 0.3s; letter-spacing: 1px;
  }
  .footer-links a:hover { color: var(--gold-light); }
  .footer-bottom {
    border-top: 1px solid rgba(201,168,76,0.1); padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-family: var(--font-ui); font-size: 12px; color: var(--muted); letter-spacing: 1px; }
  .footer-tagline { font-family: var(--font-body); font-size: 14px; color: var(--gold); font-style: italic; }
  @media (max-width: 1024px) { .footer-top { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 768px) {
    .footer { padding: 50px 24px 24px; }
    .footer-top { grid-template-columns: 1fr; gap: 36px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
  }
`;

export default function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">Sparsh Decors</div>
              <div className="footer-brand-sub">Design · Texture · Elegance</div>
              <p className="footer-desc">
                Professional interior & exterior design services in Delhi. Transforming spaces
                with premium quality and craftsmanship.
              </p>
            </div>
            <div>
              <div className="footer-heading">Services</div>
              <ul className="footer-links">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Navigate</div>
              <ul className="footer-links">
                {NAV_LINKS.map((s) => (
                  <li key={s}>
                    <a href={`#${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Contact</div>
              <ul className="footer-links">
                <li><a href="#">+91 9810917464</a></li>
                <li><a href="#">Delhi, India</a></li>
                <li><a href="https://www.instagram.com/sparshdecors/">@sparsh_decors</a></li>
                <li><a href="#">Mon–Sat: 9AM–7PM</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Sparsh Decors. All rights reserved.</div>
            <div className="footer-tagline">Every wall deserves a perfect story.</div>
          </div>
        </div>
      </footer>
    </>
  );
}
