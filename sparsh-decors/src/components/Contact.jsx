import { useState } from "react";
import FadeIn from "./FadeIn";
import { CONTACT_INFO } from "../data/content";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📧 EMAILJS SETUP — fill these 3 values
// 1. Sign up free at https://emailjs.com
// 2. Email Services → Add Service (Gmail) → copy Service ID
// 3. Email Templates → Create Template → copy Template ID
//    Use these variables in your template:
//    {{from_name}}, {{phone}}, {{service}}, {{message}}, {{time}}
// 4. Account → API Keys → copy Public Key
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EMAILJS_SERVICE_ID  = "service_qx8qsxa";   // ← replace
const EMAILJS_TEMPLATE_ID = "template_bozrw7r";  // ← replace
const EMAILJS_PUBLIC_KEY  = "qZOhCsgMNV6CMxPqj";   // ← replace

const contactStyles = `
  .contact-section { background: var(--navy); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
  .contact-info { padding-right: 40px; }
  .contact-item {
    display: flex; align-items: flex-start; gap: 20px;
    padding: 24px 0; border-bottom: 1px solid rgba(201,168,76,0.1);
  }
  .contact-item:last-child { border-bottom: none; }
  .contact-icon-box {
    width: 48px; height: 48px; background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
  }
  .contact-item-label {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 6px;
  }
  .contact-item-value { font-size: 17px; color: var(--white); line-height: 1.5; }
  .contact-form { display: flex; flex-direction: column; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-label {
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--gold);
  }
  .form-input, .form-textarea {
    background: rgba(201,168,76,0.04); border: 1px solid rgba(201,168,76,0.15);
    color: var(--white); font-family: var(--font-body); font-size: 16px;
    padding: 14px 18px; outline: none; transition: border-color 0.3s; resize: none;
  }
  .form-input:focus, .form-textarea:focus {
    border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.07);
  }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(168,152,120,0.5); font-style: italic; }
  .form-textarea { height: 120px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-success {
    color: var(--gold-light); font-style: italic; text-align: center; font-size: 15px;
    padding: 14px; border: 1px solid rgba(201,168,76,0.2); background: rgba(201,168,76,0.04);
  }
  .form-error { color: #e07070; font-style: italic; text-align: center; font-size: 14px; }
  .form-note {
    font-family: var(--font-ui); font-size: 10px; color: var(--muted);
    letter-spacing: 1px; text-align: center; margin-top: -8px;
  }
  .btn-sending { opacity: 0.7; cursor: not-allowed !important; }
  @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; gap: 50px; } }
  @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [validationError, setValidationError] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!form.name || !form.phone) {
      setValidationError(true);
      setTimeout(() => setValidationError(false), 3000);
      return;
    }

    setStatus("sending");

    try {
      // Load EmailJS SDK dynamically — no npm install needed
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }

      // Send the email
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        phone:     form.phone,
        service:   form.service || "Not specified",
        message:   form.message || "No message",
        time:      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      setStatus("success");
      setForm({ name: "", phone: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);

    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      <style>{contactStyles}</style>
      <section id="contact" className="section contact-section">
        <div className="section-inner">
          <FadeIn>
            <div style={{ maxWidth: 600, marginBottom: 60 }}>
              <div className="section-label">Get In Touch</div>
              <h2 className="section-title">
                Transform Your <span className="gold">Space</span>
              </h2>
              <div className="gold-line" />
              <p className="section-desc">
                Ready to elevate your space? Contact us for a free consultation and quote.
              </p>
            </div>
          </FadeIn>
          <div className="contact-grid">
            <FadeIn>
              <div className="contact-info">
                {CONTACT_INFO.map((c) => (
                  <div key={c.label} className="contact-item">
                    <div className="contact-icon-box">{c.icon}</div>
                    <div>
                      <div className="contact-item-label">{c.label}</div>
                      <div className="contact-item-value">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn style={{ transitionDelay: "0.2s" }}>
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      className="form-input" placeholder="Full name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      className="form-input" placeholder="+91 XXXXXXXXXX"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required</label>
                  <input
                    className="form-input" placeholder="e.g. Texture Paint, Interior Design..."
                    value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea
                    className="form-textarea" placeholder="Tell us about your project..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  className={`btn-primary${status === "sending" ? " btn-sending" : ""}`}
                  style={{ width: "100%", padding: "18px", fontSize: 12, letterSpacing: 4 }}
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "⏳ Sending..." : status === "success" ? "✓ Sent!" : "Send Enquiry"}
                </button>
                <p className="form-note">We'll get back to you within 24 hours</p>
                {status === "success" && (
                  <p className="form-success">✅ Message received! We'll call you back shortly.</p>
                )}
                {status === "error" && (
                  <p className="form-error">❌ Something went wrong. Please call us directly.</p>
                )}
                {validationError && (
                  <p className="form-error">⚠️ Please fill in your Name and Phone Number.</p>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
