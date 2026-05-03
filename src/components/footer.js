'use client';
import { useState } from 'react';

export default function Footer() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const subject = 'Laptops Official Feedback';
    const body = message.trim() || 'Assalam o Alaikum! I would like to share feedback about...';
    const mailto = `mailto:info.laptopsofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <footer className="bg-[var(--nm-bg)] py-12 md:py-16" style={{ boxShadow: 'inset 0 4px 12px var(--nm-shadow-dark)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="nm-raised-sm w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--nm-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[var(--nm-text)]">Laptops Official</h4>
            </div>
            <p className="text-[var(--nm-text-secondary)] mb-4 max-w-md leading-relaxed text-sm">
              Authentic laptops, honest pricing, and expert guidance. We help you choose the right machine with confidence.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="nm-badge text-[var(--nm-text-secondary)] text-xs">Verified Devices</span>
              <span className="nm-badge text-[var(--nm-text-secondary)] text-xs">Warranty Options</span>
              <span className="nm-badge text-[var(--nm-text-secondary)] text-xs">Expert Support</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-[var(--nm-text)]">Quick Access</h5>
            <ul className="space-y-3 text-[var(--nm-text-secondary)] text-sm">
              <li><a href="#products-grid" className="hover:text-[var(--nm-accent)] transition-colors">Browse Catalog</a></li>
              <li><a href="https://wa.me/923117092752" target="_blank" rel="noreferrer" className="hover:text-[var(--nm-accent)] transition-colors">Chat on WhatsApp</a></li>
              <li><a href="mailto:info.laptopsofficial@gmail.com" className="hover:text-[var(--nm-accent)] transition-colors">info.laptopsofficial@gmail.com</a></li>
              <li className="text-[var(--nm-text-secondary)]">+92 319 4944296</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-[var(--nm-text)]">Send Feedback</h5>
            <p className="text-[var(--nm-text-secondary)] text-sm mb-3">
              Share your experience or request a specific model. We reply quickly on Gmail.
            </p>
            <div className="nm-inset p-3">
              <textarea
                className="nm-input w-full text-sm"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your feedback..."
              />
              <button
                type="button"
                onClick={handleSend}
                className="nm-btn-accent mt-3 w-full flex items-center justify-center gap-2 py-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
                Send via Gmail
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center text-[var(--nm-text-secondary)] text-sm" style={{ borderTop: '1px solid var(--nm-shadow-dark)' }}>
          <p>&copy; 2025 Laptops Official. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
