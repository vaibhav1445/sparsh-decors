import { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import Footer from "./Footer";

const projectsPageStyles = `
  .projects-page {
    min-height: 100vh;
    background: var(--navy);
    padding-top: 72px;
  }

  /* Hero Banner */
  .projects-hero {
    background: linear-gradient(160deg, #0d1b2a 0%, #112236 50%, #0a1520 100%);
    padding: 80px 60px;
    position: relative; overflow: hidden;
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }
  .projects-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 80% 50%, rgba(201,168,76,0.06), transparent),
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: auto, 60px 60px, 60px 60px;
  }
  .projects-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .projects-hero h1 {
    font-family: var(--font-display); font-size: clamp(40px, 6vw, 72px);
    font-weight: 700; letter-spacing: 6px; text-transform: uppercase;
    color: var(--white); line-height: 1; margin-bottom: 16px;
  }
  .projects-hero h1 span { color: var(--gold-light); }
  .projects-hero p {
    font-size: 18px; color: var(--muted); font-style: italic;
    font-family: var(--font-body); max-width: 550px; line-height: 1.8;
  }
  .projects-hero-badge {
    display: inline-block; margin-bottom: 20px;
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
    border: 1px solid rgba(201,168,76,0.3); padding: 6px 16px;
  }

  /* Filter Bar */
  .projects-filter {
    background: var(--navy2);
    border-bottom: 1px solid rgba(201,168,76,0.1);
    padding: 0 60px;
    position: sticky; top: 62px; z-index: 100;
  }
  .projects-filter-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; gap: 0; overflow-x: auto;
  }
  .filter-btn {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    padding: 18px 24px; background: none; border: none;
    color: var(--muted); cursor: pointer; transition: all 0.3s;
    border-bottom: 2px solid transparent; white-space: nowrap;
  }
  .filter-btn:hover { color: var(--gold-light); }
  .filter-btn.active { color: var(--gold); border-bottom-color: var(--gold); }

  /* Projects Content */
  .projects-content { max-width: 1200px; margin: 0 auto; padding: 60px 60px; }

  /* Section Title */
  .video-section-title {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
    margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
  }
  .video-section-title::after {
    content: ''; flex: 1; height: 1px; background: rgba(201,168,76,0.2);
  }

  /* Video Grid */
  .videos-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 20px; margin-bottom: 60px;
  }
  .video-card {
    background: var(--navy2); border: 1px solid rgba(201,168,76,0.1);
    overflow: hidden; transition: all 0.3s;
  }
  .video-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-3px); }


  /* Video thumb wrapper — used when NOT playing */
  .video-thumb {
    width: 100%; aspect-ratio: 16/9;
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
    position: relative; overflow: hidden; cursor: pointer;
  }
  .video-thumb-img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  /* Overlay shown before video plays */
  .video-overlay {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(13,27,42,0.5); transition: background 0.3s;
  }
  .video-thumb:hover .video-overlay { background: rgba(13,27,42,0.3); }
  .video-play-icon {
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; color: var(--navy);
    box-shadow: 0 4px 24px rgba(201,168,76,0.5);
    transition: transform 0.3s;
  }
  .video-thumb:hover .video-play-icon { transform: scale(1.12); }
  .video-duration-badge {
    position: absolute; bottom: 10px; right: 10px;
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    background: rgba(13,27,42,0.88); color: var(--white);
    padding: 3px 9px; letter-spacing: 1px;
  }

  /* Actual <video> element shown after clicking play */
  .video-player {
    width: 100%; aspect-ratio: 16/9;
    display: block; background: #000;
    outline: none;
  }

  .video-info { padding: 16px 18px; }
  .video-title {
    font-family: var(--font-display); font-size: 16px; font-weight: 600;
    color: var(--gold-light); margin-bottom: 6px; letter-spacing: 1px;
  }
  .video-meta { font-family: var(--font-ui); font-size: 11px; color: var(--muted); letter-spacing: 1px; }
  .video-tag {
    display: inline-block; margin-top: 10px;
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); border: 1px solid rgba(201,168,76,0.25); padding: 3px 10px;
  }

  /* Photo Projects Grid */
  .photo-projects-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  }
  .project-card {
    background: var(--navy2); border: 1px solid rgba(201,168,76,0.1);
    overflow: hidden; transition: all 0.4s;
  }
  .project-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
  .project-card-img-wrap { overflow: hidden; position: relative; cursor: zoom-in; }
  .project-card-img {
    width: 100%; height: 240px; object-fit: cover; display: block;
    background: linear-gradient(135deg, #1a2a3a, #0d1520);
    transition: transform 0.5s;
  }
  .project-card:hover .project-card-img { transform: scale(1.05); }
  .project-img-zoom-icon {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(13,27,42,0.45);
    opacity: 0; transition: opacity 0.3s;
  }
  .project-card-img-wrap:hover .project-img-zoom-icon { opacity: 1; }
  .zoom-circle {
    width: 52px; height: 52px; border-radius: 50%;
    background: rgba(201,168,76,0.9);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; transition: transform 0.3s;
  }
  .project-card-img-wrap:hover .zoom-circle { transform: scale(1.1); }
  .project-status {
    position: absolute; top: 14px; left: 14px;
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; padding: 4px 12px;
  }
  .project-status.completed { background: var(--gold); color: var(--navy); }
  .project-status.ongoing { background: #2eac72; color: #fff; }
  .project-card-body { padding: 22px; }
  .project-card-title {
    font-family: var(--font-display); font-size: 19px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 1px; margin-bottom: 8px;
  }
  .project-card-location {
    font-family: var(--font-ui); font-size: 11px; color: var(--muted);
    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
  }
  .project-card-desc {
    font-family: var(--font-body); font-size: 14px; color: rgba(245,240,232,0.6);
    line-height: 1.7; font-style: italic; margin-bottom: 14px;
  }
  .project-card-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .project-chip {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    padding: 4px 10px; border: 1px solid rgba(201,168,76,0.2); color: var(--muted);
  }

  /* LIGHTBOX */
  .lightbox-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5, 10, 18, 0.96);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: lb-fade-in 0.25s ease; cursor: zoom-out;
  }
  @keyframes lb-fade-in { from { opacity: 0; } to { opacity: 1; } }
  .lightbox-inner {
    position: relative; max-width: 90vw; max-height: 90vh;
    display: flex; flex-direction: column; align-items: center;
    animation: lb-scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1); cursor: default;
  }
  @keyframes lb-scale-in {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }
  .lightbox-img {
    max-width: 90vw; max-height: 80vh; object-fit: contain; display: block;
    border: 1px solid rgba(201,168,76,0.2); box-shadow: 0 24px 80px rgba(0,0,0,0.7);
  }
  .lightbox-info { margin-top: 16px; text-align: center; }
  .lightbox-title {
    font-family: var(--font-display); font-size: 20px; font-weight: 600;
    color: var(--gold-light); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;
  }
  .lightbox-location { font-family: var(--font-ui); font-size: 11px; color: var(--muted); letter-spacing: 2px; }
  .lightbox-close {
    position: fixed; top: 24px; right: 28px;
    background: none; border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold); font-size: 22px; width: 44px; height: 44px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10000;
  }
  .lightbox-close:hover { background: rgba(201,168,76,0.12); border-color: var(--gold); }
  .lightbox-arrow {
    position: fixed; top: 50%; transform: translateY(-50%);
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25);
    color: var(--gold); font-size: 22px; width: 48px; height: 64px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10000;
  }
  .lightbox-arrow:hover { background: rgba(201,168,76,0.2); border-color: var(--gold); }
  .lightbox-arrow.prev { left: 16px; }
  .lightbox-arrow.next { right: 16px; }
  .lightbox-counter {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    font-family: var(--font-ui); font-size: 11px; font-weight: 700;
    letter-spacing: 3px; color: var(--muted);
    background: rgba(13,27,42,0.8); padding: 6px 16px;
    border: 1px solid rgba(201,168,76,0.15);
  }

  /* Upload Note */
  .upload-note {
    margin-top: 60px; padding: 32px;
    border: 1px dashed rgba(201,168,76,0.25);
    background: rgba(201,168,76,0.02); text-align: center;
  }
  .upload-note-icon { font-size: 36px; margin-bottom: 12px; }
  .upload-note-title {
    font-family: var(--font-display); font-size: 20px; font-weight: 600;
    color: var(--gold-light); margin-bottom: 8px; letter-spacing: 2px;
  }
  .upload-note-desc {
    font-family: var(--font-ui); font-size: 13px; color: var(--muted);
    line-height: 1.7; max-width: 500px; margin: 0 auto;
  }
  .upload-note code {
    background: rgba(201,168,76,0.1); color: var(--gold); padding: 2px 8px; font-size: 12px;
  }

  @media (max-width: 1024px) {
    .projects-hero { padding: 60px 30px; }
    .projects-filter { padding: 0 30px; }
    .projects-content { padding: 40px 30px; }
    .videos-grid { grid-template-columns: 1fr 1fr; }
    .photo-projects-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .projects-hero { padding: 50px 24px; }
    .projects-filter { padding: 0 16px; }
    .projects-content { padding: 32px 24px; }
    .videos-grid { grid-template-columns: 1fr; }
    .photo-projects-grid { grid-template-columns: 1fr; }
    .lightbox-arrow { display: none; }
  }
    /* ===================== */
  /* LOCATIONS SECTION     */
  /* ===================== */
  .locations-section {
    background: linear-gradient(180deg, var(--navy) 0%, #0a1825 100%);
    padding: 80px 60px;
    border-top: 1px solid rgba(201,168,76,0.1);
    position: relative; overflow: hidden;
  }
  .locations-section::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 20% 50%, rgba(201,168,76,0.04), transparent),
      radial-gradient(ellipse 40% 50% at 80% 50%, rgba(201,168,76,0.03), transparent);
    pointer-events: none;
  }
  .locations-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .locations-header { text-align: center; margin-bottom: 56px; }
  .locations-eyebrow {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
    margin-bottom: 16px; display: block;
  }
  .locations-title {
    font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px);
    font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
    color: var(--white); line-height: 1.1; margin-bottom: 16px;
  }
  .locations-title span { color: var(--gold-light); }
  .locations-subtitle {
    font-family: var(--font-body); font-size: 15px; color: var(--muted);
    font-style: italic; max-width: 500px; margin: 0 auto; line-height: 1.8;
  }
  .locations-gold-line {
    width: 60px; height: 1px; background: var(--gold);
    margin: 20px auto 0; opacity: 0.6;
  }

  /* India map hint bar */
  .locations-map-bar {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; margin-bottom: 40px;
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
  }
  .locations-map-bar::before,
  .locations-map-bar::after {
    content: ''; flex: 1; max-width: 120px;
    height: 1px; background: rgba(201,168,76,0.2);
  }

  /* State groups */
  .locations-states-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px; margin-bottom: 40px;
  }
  .location-state-card {
    background: rgba(201,168,76,0.03);
    border: 1px solid rgba(201,168,76,0.08);
    padding: 24px 20px;
    transition: all 0.35s ease;
    position: relative; overflow: hidden;
  }
  .location-state-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0); transition: transform 0.4s ease;
  }
  .location-state-card:hover {
    background: rgba(201,168,76,0.06);
    border-color: rgba(201,168,76,0.2);
    transform: translateY(-2px);
  }
  .location-state-card:hover::before { transform: scaleX(1); }
  .location-state-name {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .location-state-name::after {
    content: ''; flex: 1; height: 1px; background: rgba(201,168,76,0.2);
  }
  .location-cities {
    display: flex; flex-direction: column; gap: 6px;
  }
  .location-city {
    font-family: var(--font-body); font-size: 13px;
    color: rgba(245,240,232,0.65); letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 8px;
    transition: color 0.2s;
  }
  .location-state-card:hover .location-city { color: rgba(245,240,232,0.85); }
  .location-city-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(201,168,76,0.4); flex-shrink: 0;
    transition: background 0.2s;
  }
  .location-state-card:hover .location-city-dot { background: var(--gold); }

  /* Bottom stats bar */
  .locations-stats {
    display: flex; align-items: center; justify-content: center;
    gap: 0; margin-top: 40px;
    border: 1px solid rgba(201,168,76,0.12);
    background: rgba(201,168,76,0.03);
    overflow: hidden;
  }
  .location-stat {
    flex: 1; padding: 22px 20px; text-align: center;
    border-right: 1px solid rgba(201,168,76,0.1);
    transition: background 0.3s;
  }
  .location-stat:last-child { border-right: none; }
  .location-stat:hover { background: rgba(201,168,76,0.06); }
  .location-stat-num {
    font-family: var(--font-display); font-size: 28px; font-weight: 700;
    color: var(--gold-light); letter-spacing: 2px; line-height: 1;
    margin-bottom: 6px;
  }
  .location-stat-label {
    font-family: var(--font-ui); font-size: 9px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
  }

  /* "And more" tag */
  .locations-more-tag {
    text-align: center; margin-top: 28px;
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
  }
  .locations-more-tag span {
    border: 1px dashed rgba(201,168,76,0.25);
    padding: 8px 20px; display: inline-block;
    color: var(--gold); background: rgba(201,168,76,0.04);
  }

  @media (max-width: 1024px) {
    .projects-hero { padding: 60px 30px; }
    .projects-filter { padding: 0 30px; }
    .projects-content { padding: 40px 30px; }
    .videos-grid { grid-template-columns: 1fr 1fr; }
    .photo-projects-grid { grid-template-columns: 1fr 1fr; }
    .locations-section { padding: 60px 30px; }
    .locations-states-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .projects-hero { padding: 50px 24px; }
    .projects-filter { padding: 0 16px; }
    .projects-content { padding: 32px 24px; }
    .videos-grid { grid-template-columns: 1fr; }
    .photo-projects-grid { grid-template-columns: 1fr; }
    .lightbox-arrow { display: none; }
    .locations-section { padding: 48px 20px; }
    .locations-states-grid { grid-template-columns: 1fr 1fr; }
    .locations-stats { flex-wrap: wrap; }
    .location-stat { min-width: 50%; border-bottom: 1px solid rgba(201,168,76,0.1); }
  }
`;

const FILTERS = ["All", "Completed", "Ongoing", "Interior", "Exterior", "Texture Paint", "Waterproofing"];

// ✅ VIDEO CARDS
// - src: path to your .mp4 file in public/  e.g. "/images/vid.mp4"
// - thumb: optional thumbnail image shown before play
// - If src is set → clicking play shows the real <video> player
// - If only thumb is set → clicking shows thumbnail with play icon (no video yet)

const videos = [
  {
    title: "JAIN MANDIR EXTERIOR WORK",
    meta: "Baghpat Jain Mandir, 2024",
    tag: "Exterior",
    duration: "2:34",
    src: "/images/vido1.mp4",       // ← your real video
    thumb: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",                     // ← optional thumbnail, leave "" to use video's first frame
  },
  {
    title: "Exterior Texture Work",
    meta: "Noida, 2024",
    tag: "Exterior",
    duration: "1:48",
    src: "",                       // ← add video path when ready
    thumb: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
  {
    title: "Waterproofing Project",
    meta: "Gurgaon, 2024",
    tag: "Waterproofing",
    duration: "3:12",
    src: "",                       // ← add video path when ready
    thumb: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
];

const projects = [
  {
    status: "completed",
    title: "Luxury Villa Interior",
    desc: "Complete interior makeover with Italian texture paint, silk emulsion walls and premium decorative finishes throughout.",
    tags: ["Interior", "Texture Paint", "Italian Finish"],
    img: "/images/img6.jpeg",
  },
  {
    status: "completed",
    title: "Commercial Interior",
    
    desc: "Large-scale exterior renovation with weatherproof coating and rustic texture finish across 8 floors.",
    tags: ["Exterior", "Waterproofing", "Texture"],
    img: "/images/img4.jpeg",
  },
  {
    status: "completed",
    title: "Apartment Exterior",
    
    desc: "Premium Venetian plaster and metallic finish for the grand lobby with bespoke wall art panels.",
    tags: ["Interior", "Venetian Plaster", "Luxury"],
    img: "/images/img3.jpeg",
  },
  {
    status: "completed",
    title: "Residential Waterproofing and Exterior",
    
    desc: "Complete terrace and bathroom waterproofing solution for a residential society of 120 units.",
    tags: ["Waterproofing", "Residential"],
    img: "/images/img1.jpeg",
  },
  {
    status: "completed",
    title: "Shopping Mall Interior",
    
    desc: "Contemporary 3D texture walls and concrete-effect finishes for a 5000 sq ft corporate office space.",
    tags: ["Interior", "3D Texture", "Corporate"],
    img: "/images/img7.jpeg",
  },
  {
    status: "completed",
    title: "Luxury Apartment Exterior",
    
    desc: "Stunning exterior makeover with sand texture, stone effect cladding and UV-resistant premium coating.",
    tags: ["Exterior", "Stone Effect", "UV Resistant"],
    img: "/images/img8.jpeg",
  },
  {
    status: "completed",
    title: "Luxury Apartment Exterior",
  
    desc: "Stunning exterior makeover with sand texture, stone effect cladding and UV-resistant premium coating.",
    tags: ["Exterior", "Stone Effect", "UV Resistant"],
    img: "/images/img2.jpeg",
  },
  {
    status: "completed",
    title: "Shopping Complex Exterior",
    
    desc: "Stunning exterior makeover with sand texture, stone effect cladding and UV-resistant premium coating.",
    tags: ["Exterior", "Stone Effect", "UV Resistant"],
    img: "/images/img19.jpeg",
  },
  {
    status: "completed",
    title: "Hospital Exterior Design",
    
    desc: "Stunning exterior makeover with sand texture, stone effect cladding and UV-resistant premium coating.",
    tags: ["Exterior", "Stone Effect", "UV Resistant"],
    img: "/images/img5.jpeg",
  },
  {
    status: "completed",
    title: "Interior Design",
    
    desc: "Stunning exterior makeover with sand texture, stone effect cladding and UV-resistant premium coating.",
    tags: ["Exterior", "Stone Effect", "UV Resistant"],
    img: "/images/img21.jpeg",
  },
  {
    status: "completed",
    title: "Modern Interior Design",
    
    desc: "Contemporary 3D texture walls and concrete-effect finishes for a 5000 sq ft corporate office space.",
    tags: ["Interior", "3D Texture", "Corporate"],
    img: "/images/img22.jpeg",
  },
  {
    status: "completed",
    title: "Designer Wall Art",
    
    desc: "Stunning exterior makeover with sand texture, stone effect cladding and UV-resistant premium coating.",
    tags: ["Exterior", "Stone Effect", "UV Resistant"],
    img: "/images/img10.jpeg",
  },
];

// =====================
// VIDEO CARD COMPONENT
// =====================
function VideoCard({ v }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (v.src) {
      setPlaying(true);
      // auto-play once rendered
      setTimeout(() => videoRef.current?.play(), 50);
    }
  };

  return (
    <div className="video-card">
      {/* If playing AND has a src — show real video player */}
      {playing && v.src ? (
        <video
          ref={videoRef}
          className="video-player"
          src={v.src}
          controls
          autoPlay
          onEnded={() => setPlaying(false)}
        />
      ) : (
        /* Otherwise show thumbnail + play button overlay */
        <div className="video-thumb" onClick={handlePlay}>
          {v.thumb && (
            <img
              src={v.thumb}
              alt={v.title}
              className="video-thumb-img"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          {/* Show play icon only if there's a real video src */}
          {v.src && (
            <div className="video-overlay">
              <div className="video-play-icon">▶</div>
            </div>
          )}
          {/* No src — show "Coming Soon" overlay */}
          {!v.src && (
            <div className="video-overlay" style={{ cursor: "default" }}>
              <div style={{
                fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700,
                letterSpacing: 3, textTransform: "uppercase", color: "var(--muted)",
                border: "1px solid rgba(201,168,76,0.2)", padding: "8px 16px"
              }}>
                Coming Soon
              </div>
            </div>
          )}
          {v.duration && <span className="video-duration-badge">{v.duration}</span>}
        </div>
      )}

      <div className="video-info">
        <div className="video-title">{v.title}</div>
        <div className="video-meta"><span>📍 {v.meta}</span></div>
        <span className="video-tag">{v.tag}</span>
      </div>
    </div>
  );
}

// =====================
// LIGHTBOX COMPONENT
// =====================
function Lightbox({ projects, currentIndex, onClose, onPrev, onNext }) {
  const project = projects[currentIndex];

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
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} title="Close (Esc)">✕</button>
      <button className="lightbox-arrow prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={project.img} alt={project.title} className="lightbox-img" />
        <div className="lightbox-info">
          <div className="lightbox-title">{project.title}</div>
          <div className="lightbox-location">{project.location}</div>
        </div>
      </div>
      <button className="lightbox-arrow next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
      <div className="lightbox-counter">{currentIndex + 1} / {projects.length}</div>
    </div>
  );
}

const LOCATIONS = [
  {
    state: "Uttar Pradesh",
    cities: ["Meerut", "Hapur", "Noida", "Bareilly", "Chitrakoot"],
  },
  {
    state: "Delhi NCR",
    cities: ["New Delhi", "South Delhi", "West Delhi", "Gurgaon", "Faridabad"],
  },
  {
    state: "Uttarakhand",
    cities: ["Haridwar", "Rishikesh", "Nainital", "Mukteshwar", "Dehradun"],
  },
  {
    state: "Haryana",
    cities: ["Gurgaon", "Faridabad", "Panipat", "Baghpat", "Sonipat"],
  },
  {
    state: "Chhattisgarh",
    cities: ["Raipur", "Bhilai", "Bilaspur", "Durg", "Korba"],
  },
  {
    state: "Jammu & Kashmir",
    cities: ["Jammu", "Srinagar", "Udhampur", "Kathua", "Rajouri"],
  },
  {
    state: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  },
  {
    state: "Himachal Pradesh",
    cities: ["Shimla", "Dharamshala", "Manali", "Kullu", "Solan"],
  },
];

// =====================
// LOCATIONS SECTION
// =====================
function LocationsSection() {
  return (
    <div className="locations-section">
      <div className="locations-inner">
        <FadeIn>
          <div className="locations-header">
            <span className="locations-eyebrow">Pan-India Presence</span>
            <h2 className="locations-title">
              Where We've <span>Worked</span>
            </h2>
            <div className="locations-gold-line" />
            <p className="locations-subtitle">
              From the foothills of the Himalayas to the heartland of Central India —
              Sparsh Decors brings luxury finishes wherever you are.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="locations-map-bar">
            📍 States & Cities Covered
          </div>
          <div className="locations-states-grid">
            {LOCATIONS.map((loc) => (
              <div className="location-state-card" key={loc.state}>
                <div className="location-state-name">{loc.state}</div>
                <div className="location-cities">
                  {loc.cities.map((city) => (
                    <div className="location-city" key={city}>
                      <span className="location-city-dot" />
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="locations-more-tag">
            <span>+ Many More Locations Across India</span>
          </div>

          <div className="locations-stats">
            <div className="location-stat">
              <div className="location-stat-num">8+</div>
              <div className="location-stat-label">States Covered</div>
            </div>
            <div className="location-stat">
              <div className="location-stat-num">40+</div>
              <div className="location-stat-label">Cities Served</div>
            </div>
            <div className="location-stat">
              <div className="location-stat-num">500+</div>
              <div className="location-stat-label">Projects Delivered</div>
            </div>
            <div className="location-stat">
              <div className="location-stat-num">Pan</div>
              <div className="location-stat-label">India Service</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// =====================
// MAIN PAGE
// =====================
export default function ProjectsPage({ onBack }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + projects.length) % projects.length);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % projects.length);

  return (
    <>
      <style>{projectsPageStyles}</style>
      <div className="projects-page">
        

        {lightboxIndex !== null && (
          <Lightbox
            projects={projects}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}

        {/* Hero */}
        <div className="projects-hero">
          <div className="projects-hero-inner">
            <FadeIn>
              <button
                onClick={onBack}
                style={{
                  background: "none", border: "1px solid rgba(201,168,76,0.2)",
                  color: "var(--muted)", fontFamily: "var(--font-ui)",
                  fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                  padding: "8px 16px", cursor: "pointer", marginBottom: 32,
                  display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s",
                  ":hover": { color: "var(--gold)", borderColor: "rgba(201,168,76,0.4)" }
                }}
              >
                ← Back to Home
              </button>
              <div className="projects-hero-badge">Portfolio & Work</div>
              <h1>Our <span>Projects</span></h1>
              <p>Real work, real results. Explore our completed and ongoing projects across India — from luxury interiors to large-scale exteriors.</p>
            </FadeIn>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="projects-filter">
          <div className="projects-filter-inner">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="projects-content">

          <FadeIn>
            <div className="video-section-title">🎬 Project Videos</div>
          </FadeIn>
          <div className="videos-grid">
            {videos.map((v, i) => (
              <FadeIn key={v.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <VideoCard v={v} />
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="video-section-title" style={{ marginTop: 20 }}>
              📸 Project Gallery
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: 10, color: "var(--muted)",
                letterSpacing: 2, textTransform: "lowercase", fontWeight: 400
              }}>
                — click any image to enlarge
              </span>
            </div>
          </FadeIn>
          <div className="photo-projects-grid">
            {projects.map((p, i) => (
              <FadeIn key={`${p.title}-${i}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="project-card">
                  <div className="project-card-img-wrap" onClick={() => openLightbox(i)}>
                    <img
                      src={p.img} alt={p.title} className="project-card-img"
                      onError={(e) => { e.target.style.background = "linear-gradient(135deg, #1a2a3a, #0d1520)"; }}
                    />
                    <div className="project-img-zoom-icon">
                      <div className="zoom-circle">🔍</div>
                    </div>
                    <span className={`project-status ${p.status}`}>
                      {p.status === "completed" ? "✓ Completed" : "⚡ Ongoing"}
                    </span>
                  </div>
                  <div className="project-card-body">
                    <div className="project-card-title">{p.title}</div>
                    <div className="project-card-location">{p.location}</div>
                    <p className="project-card-desc">{p.desc}</p>
                    <div className="project-card-tags">
                      {p.tags.map(t => <span key={t} className="project-chip">{t}</span>)}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <LocationsSection />

          {/* <FadeIn>
            <div className="upload-note">
              <div className="upload-note-icon">📁</div>
              <div className="upload-note-title">Add More Work</div>
              <div className="upload-note-desc">
                Place images in <code>public/images/</code> and update the <code>projects</code> array.<br /><br />
                For videos: place <code>.mp4</code> files in <code>public/images/</code> and set <code>src: "/images/yourfile.mp4"</code>.
              </div>
            </div>
          </FadeIn> */}

        </div>
        <Footer/>
      </div>
    </>
  );
}