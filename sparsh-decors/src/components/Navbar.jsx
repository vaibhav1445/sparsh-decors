import { useState } from "react";
import { useScrolled } from "../hooks/useAnimations";
import { NAV_LINKS } from "../data/content";

const navbarStyles = `
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 60px; height: 72px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.4s ease; border-bottom: 1px solid transparent;
  }
  .navbar.scrolled {
    background: rgba(13, 27, 42, 0.97);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    backdrop-filter: blur(12px); height: 62px;
  }
  .nav-logo {
    font-family: var(--font-display); font-size: 22px; font-weight: 700;
    letter-spacing: 4px; color: var(--gold-light); cursor: pointer;
    text-transform: uppercase; z-index: 1100; position: relative;
  }
  .nav-logo span {
    color: var(--muted); font-size: 11px; display: block;
    letter-spacing: 6px; font-weight: 400; margin-top: -2px;
  }
  .nav-links { display: flex; gap: 36px; list-style: none; align-items: center; }
  .nav-links a {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
    text-decoration: none; position: relative; transition: color 0.3s; cursor: pointer;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1px; background: var(--gold);
    transform: scaleX(0); transition: transform 0.3s ease; transform-origin: left;
  }
  .nav-links a:hover { color: var(--gold-light); }
  .nav-links a:hover::after { transform: scaleX(1); }

  .nav-projects-btn {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold) !important;
    border: 1px solid rgba(201,168,76,0.35) !important;
    padding: 7px 16px; transition: all 0.3s !important; cursor: pointer;
  }
  .nav-projects-btn:hover {
    background: rgba(201,168,76,0.1) !important;
    border-color: var(--gold) !important;
    color: var(--gold-light) !important;
  }
  .nav-projects-btn::after { display: none !important; }

  .nav-cta {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--navy);
    background: var(--gold); border: none; padding: 10px 24px; cursor: pointer; transition: all 0.3s;
  }
  .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

  /* ── Hamburger button ── */
  .mobile-menu-btn {
    display: none; background: none; border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold); font-size: 20px; cursor: pointer;
    width: 40px; height: 40px;
    align-items: center; justify-content: center;
    z-index: 1100; position: relative; transition: all 0.3s;
  }
  .mobile-menu-btn:hover { background: rgba(201,168,76,0.1); border-color: var(--gold); }

  /* ── Mobile Drawer ── */
  .mobile-drawer {
    position: fixed; inset: 0; z-index: 1050;
    display: flex; flex-direction: column;
    pointer-events: none;
  }
  .mobile-drawer-backdrop {
    position: absolute; inset: 0;
    background: rgba(5,10,18,0.7);
    backdrop-filter: blur(4px);
    opacity: 0; transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .mobile-drawer.open .mobile-drawer-backdrop {
    opacity: 1; pointer-events: all;
  }
  .mobile-drawer-panel {
    position: absolute; top: 0; right: 0;
    width: min(320px, 85vw); height: 100vh;
    background: #0a1520;
    border-left: 1px solid rgba(201,168,76,0.15);
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    pointer-events: all;
  }
  .mobile-drawer.open .mobile-drawer-panel {
    transform: translateX(0);
  }

  /* Drawer header */
  .mobile-drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 24px;
    border-bottom: 1px solid rgba(201,168,76,0.1);
  }
  .mobile-drawer-logo {
    font-family: var(--font-display); font-size: 18px; font-weight: 700;
    letter-spacing: 4px; color: var(--gold-light); text-transform: uppercase;
  }
  .mobile-drawer-logo span {
    display: block; font-size: 9px; letter-spacing: 5px;
    color: var(--muted); font-weight: 400;
  }
  .mobile-drawer-close {
    background: none; border: 1px solid rgba(201,168,76,0.2);
    color: var(--gold); font-size: 18px;
    width: 36px; height: 36px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .mobile-drawer-close:hover { background: rgba(201,168,76,0.1); border-color: var(--gold); }

  /* Drawer nav links */
  .mobile-drawer-links {
    flex: 1; overflow-y: auto;
    padding: 24px 0;
    display: flex; flex-direction: column;
  }
  .mobile-drawer-link {
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase;
    color: var(--muted); text-decoration: none;
    padding: 16px 28px;
    border-bottom: 1px solid rgba(201,168,76,0.06);
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; background: none; border-right: none; border-left: none; border-top: none;
    transition: all 0.25s; text-align: left; width: 100%;
  }
  .mobile-drawer-link:hover {
    color: var(--gold-light); background: rgba(201,168,76,0.04);
    padding-left: 36px;
  }
  .mobile-drawer-link-icon {
    font-size: 14px; width: 20px; text-align: center; flex-shrink: 0;
  }

  /* Projects special link in drawer */
  .mobile-drawer-projects {
    margin: 16px 24px;
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); border: 1px solid rgba(201,168,76,0.3);
    padding: 14px 20px; cursor: pointer; background: rgba(201,168,76,0.04);
    display: flex; align-items: center; gap: 10px;
    transition: all 0.3s; width: calc(100% - 48px);
  }
  .mobile-drawer-projects:hover {
    background: rgba(201,168,76,0.1); border-color: var(--gold);
  }

  /* Drawer footer CTA */
  .mobile-drawer-footer {
    padding: 20px 24px;
    border-top: 1px solid rgba(201,168,76,0.1);
  }
  .mobile-drawer-cta {
    width: 100%; padding: 16px;
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    background: var(--gold); color: var(--navy);
    border: none; cursor: pointer; transition: all 0.3s;
  }
  .mobile-drawer-cta:hover { background: var(--gold-light); }
  .mobile-drawer-tagline {
    text-align: center; margin-top: 12px;
    font-family: var(--font-ui); font-size: 9px; color: var(--muted);
    letter-spacing: 2px; text-transform: uppercase;
  }

  @media (max-width: 1024px) { .navbar { padding: 0 30px; } .nav-links { gap: 20px; } }
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .mobile-menu-btn { display: flex; }
  }
`;

// Map each nav link to an icon
const NAV_ICONS = {
  home: "🏠", about: "✦", services: "🛠️", textures: "🎨",
  gallery: "📸", contact: "📞",
};

export default function Navbar({ scrollTo, onProjectsClick }) {
  const scrolled = useScrolled();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => { setDrawerOpen(true); document.body.style.overflow = "hidden"; };
  const closeDrawer = () => { setDrawerOpen(false); document.body.style.overflow = ""; };

  const handleNavClick = (section) => {
    closeDrawer();
    setTimeout(() => scrollTo(section), 300);
  };

  const handleProjectsClick = () => {
    closeDrawer();
    setTimeout(() => onProjectsClick(), 300);
  };

  return (
    <>
      <style>{navbarStyles}</style>

      {/* ── Main Navbar ── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("home")}>
          Sparsh
          <span>Decors</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((s) => (
            <li key={s}>
              <a onClick={() => scrollTo(s)} style={{ cursor: "pointer" }}>{s}</a>
            </li>
          ))}
          <li>
            <a className="nav-projects-btn" onClick={onProjectsClick}>
              🎬 Our Projects
            </a>
          </li>
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>
          Get Quote
        </button>
        <button className="mobile-menu-btn" onClick={openDrawer} aria-label="Open menu">
          ☰
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-drawer${drawerOpen ? " open" : ""}`}>

        {/* Backdrop — click to close */}
        <div className="mobile-drawer-backdrop" onClick={closeDrawer} />

        {/* Slide-in panel */}
        <div className="mobile-drawer-panel">

          {/* Header */}
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-logo">
              Sparsh
              <span>Decors</span>
            </div>
            <button className="mobile-drawer-close" onClick={closeDrawer}>✕</button>
          </div>

          {/* Nav links */}
          <div className="mobile-drawer-links">
            {NAV_LINKS.map((s) => (
              <button
                key={s}
                className="mobile-drawer-link"
                onClick={() => handleNavClick(s)}
              >
                <span className="mobile-drawer-link-icon">
                  {NAV_ICONS[s.toLowerCase()] || "›"}
                </span>
                {s}
              </button>
            ))}

            {/* Our Projects special */}
            <button className="mobile-drawer-projects" onClick={handleProjectsClick}>
              🎬 Our Projects
            </button>
          </div>

          {/* Footer CTA */}
          <div className="mobile-drawer-footer">
            <button
              className="mobile-drawer-cta"
              onClick={() => handleNavClick("contact")}
            >
              Get Free Quote
            </button>
            <div className="mobile-drawer-tagline">Design · Texture · Elegance</div>
          </div>
        </div>
      </div>
    </>
  );
}