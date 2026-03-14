export default function Footer() {
  return (
    <footer className="bg-[var(--nm-bg)] py-12 md:py-16" style={{ boxShadow: 'inset 0 4px 12px var(--nm-shadow-dark)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="nm-raised-sm w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--nm-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[var(--nm-text)]">Laptops Official</h4>
            </div>
            <p className="text-[var(--nm-text-secondary)] mb-6 max-w-md leading-relaxed text-sm">
              Your trusted partner for premium computing solutions. Authentic products with reliable service and competitive pricing.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-[var(--nm-text)]">Categories</h5>
            <ul className="space-y-3 text-[var(--nm-text-secondary)] text-sm">
              <li><a href="#products-grid" className="hover:text-[var(--nm-accent)] transition-colors">Gaming Laptops</a></li>
              <li><a href="#products-grid" className="hover:text-[var(--nm-accent)] transition-colors">Business Laptops</a></li>
              <li><a href="#products-grid" className="hover:text-[var(--nm-accent)] transition-colors">Workstations</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-[var(--nm-text)]">Contact</h5>
            <div className="space-y-3 text-[var(--nm-text-secondary)] text-sm">
              <p>+92 319 4944296</p>
              <p>info@laptopsofficial.pk</p>
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
