export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--nm-bg)]">
      {/* Background Laptop Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Laptop SVG */}
        <div className="animate-laptop-open" style={{ transformOrigin: 'bottom center' }}>
          <svg width="480" height="340" viewBox="0 0 480 340" fill="none" className="w-[320px] h-[230px] md:w-[480px] md:h-[340px] opacity-[0.08]">
            {/* Screen */}
            <rect x="60" y="10" width="360" height="220" rx="12" fill="none" stroke="var(--nm-shadow-dark)" strokeWidth="3"/>
            {/* Screen inner */}
            <rect x="72" y="22" width="336" height="196" rx="6" fill="var(--nm-shadow-dark)" opacity="0.15"/>
            {/* Screen content - code lines */}
            <rect x="92" y="50" width="120" height="4" rx="2" fill="var(--nm-accent)" opacity="0.4"/>
            <rect x="92" y="64" width="200" height="4" rx="2" fill="var(--nm-shadow-dark)" opacity="0.3"/>
            <rect x="92" y="78" width="160" height="4" rx="2" fill="var(--nm-shadow-dark)" opacity="0.3"/>
            <rect x="92" y="92" width="180" height="4" rx="2" fill="var(--nm-accent)" opacity="0.3"/>
            <rect x="92" y="106" width="140" height="4" rx="2" fill="var(--nm-shadow-dark)" opacity="0.3"/>
            <rect x="92" y="120" width="220" height="4" rx="2" fill="var(--nm-shadow-dark)" opacity="0.2"/>
            <rect x="92" y="134" width="100" height="4" rx="2" fill="var(--nm-accent)" opacity="0.3"/>
            <rect x="92" y="148" width="170" height="4" rx="2" fill="var(--nm-shadow-dark)" opacity="0.2"/>
            {/* Cursor */}
            <rect x="92" y="168" width="2" height="14" rx="1" fill="var(--nm-accent)" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite"/>
            </rect>
            {/* Camera dot */}
            <circle cx="240" cy="16" r="2" fill="var(--nm-shadow-dark)" opacity="0.4"/>
            {/* Base / Keyboard */}
            <path d="M30 230 L450 230 L470 320 Q470 330 460 330 L20 330 Q10 330 10 320 Z" fill="none" stroke="var(--nm-shadow-dark)" strokeWidth="3"/>
            {/* Trackpad */}
            <rect x="175" y="270" width="130" height="40" rx="8" fill="none" stroke="var(--nm-shadow-dark)" strokeWidth="2" opacity="0.5"/>
            {/* Keyboard rows */}
            <g opacity="0.3">
              <rect x="80" y="240" width="320" height="4" rx="2" fill="var(--nm-shadow-dark)"/>
              <rect x="85" y="250" width="310" height="4" rx="2" fill="var(--nm-shadow-dark)"/>
              <rect x="90" y="260" width="300" height="4" rx="2" fill="var(--nm-shadow-dark)"/>
            </g>
            {/* Hinge */}
            <line x1="50" y1="230" x2="430" y2="230" stroke="var(--nm-shadow-dark)" strokeWidth="2" opacity="0.4"/>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[var(--nm-accent)]"
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                opacity: 0.12,
                animation: `floatParticle ${4 + i * 0.8}s ease-in-out ${i * 0.6}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Soft radial glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full animate-screen-glow" style={{ background: 'radial-gradient(circle, rgba(74,124,255,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <span className="nm-badge text-[var(--nm-accent)] text-sm px-5 py-2 inline-block">
            Know it. Test it. Own it.
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-[var(--nm-text)]" style={{ animationDelay: '0.5s', opacity: 0 }}>
          Laptops Official
        </h1>

        <p className="text-lg md:text-xl text-[var(--nm-text-secondary)] mb-4 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.7s', opacity: 0 }}>
          Your Ultimate Laptop Destination
        </p>

        <p className="text-sm md:text-base text-[var(--nm-text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-80" style={{ animationDelay: '0.9s', opacity: 0 }}>
          Discover high-performance gaming laptops, business ultrabooks, and professional workstations with authentic quality assurance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '1.1s', opacity: 0 }}>
          <button
            onClick={() => {
              const el = document.getElementById('products-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="nm-btn-accent px-8 py-3 text-base"
          >
            Browse Laptops
          </button>
          <button
            onClick={() => {
              const el = document.querySelector('footer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="nm-btn px-8 py-3 text-base"
          >
            Get Expert Help
          </button>
        </div>
      </div>
    </section>
  );
}
