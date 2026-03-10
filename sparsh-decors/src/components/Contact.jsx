import { useState } from "react";
import FadeIn from "./FadeIn";
import { CONTACT_INFO } from "../data/content";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📱 ADD YOUR WHATSAPP NUMBER HERE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WHATSAPP_NUMBER = "919810917464"; // ← replace with your number

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
  .form-success { color: #25d366; font-style: italic; text-align: center; font-size: 15px; }
  .form-error { color: #e07070; font-style: italic; text-align: center; font-size: 14px; }
  @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; gap: 50px; } }
  @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!form.name || !form.phone) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    // Build WhatsApp message with all form details
    const waMessage = 
`Hello Sparsh Decors! 👋

*New Enquiry from Website*

*Name:* ${form.name}
*Phone:* ${form.phone}
*Service Required:* ${form.service || "Not specified"}
*Message:* ${form.message || "No message"}

Please share more details and the next steps. Thank you!`;

    const waURL = `https://api.whatsapp.com/send?phone="919810917464"&text=${encodeURIComponent(waMessage)}`;

    // Open WhatsApp in new tab
    window.open(waURL, "_blank");

    // Show success & reset
    setSubmitted(true);
    setForm({ name: "", phone: "", service: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
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
                  className="btn-primary"
                  style={{ width: "100%", padding : "18px", fontSize: 12, letterSpacing: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                  onClick={handleSubmit}
                >
                  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {submitted ? "✓ WhatsApp Opened!" : "Send via WhatsApp"}
                </button>
                {submitted && (
                  <p className="form-success">✅ WhatsApp opened with your details! We'll reply shortly.</p>
                )}
                {error && (
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