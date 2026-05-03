'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

export default function ProductDetailModal({ products, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(null); // 'left' | 'right' | null
  const [activeImage, setActiveImage] = useState(0);

  const product = products[currentIndex];

  const goTo = useCallback((newIndex, dir) => {
    if (newIndex < 0 || newIndex >= products.length) return;
    setDirection(dir);
    setActiveImage(0);
    // Small delay to trigger re-animation
    requestAnimationFrame(() => setCurrentIndex(newIndex));
  }, [products.length]);

  const goLeft = useCallback(() => goTo(currentIndex - 1, 'right'), [currentIndex, goTo]);
  const goRight = useCallback(() => goTo(currentIndex + 1, 'left'), [currentIndex, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goLeft();
      if (e.key === 'ArrowRight') goRight();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, goLeft, goRight]);

  // Clear direction after animation
  useEffect(() => {
    if (direction) {
      const t = setTimeout(() => setDirection(null), 300);
      return () => clearTimeout(t);
    }
  }, [direction, currentIndex]);

  if (!product) return null;

  const formatPrice = (p) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p);
  const images = product.images || [];

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button onClick={goLeft} className="absolute left-2 md:left-6 z-10 nm-circle w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[var(--nm-text)]">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentIndex < products.length - 1 && (
        <button onClick={goRight} className="absolute right-2 md:right-6 z-10 nm-circle w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[var(--nm-text)]">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div
        className={`relative nm-raised-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto ${direction === 'left' ? 'animate-slide-left' : direction === 'right' ? 'animate-slide-right' : 'animate-zoom-in'}`}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 nm-btn w-9 h-9 flex items-center justify-center text-[var(--nm-text-secondary)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-20 nm-badge text-[var(--nm-text-secondary)] text-xs">
          {currentIndex + 1} / {products.length}
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image section */}
          <div className="p-6 md:p-8">
            <div className="nm-inset relative w-full aspect-square overflow-hidden" style={{ borderRadius: '16px' }}>
              {images[activeImage] ? (
                <Image
                  src={images[activeImage]}
                  alt={`${product.brand} ${product.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={true}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--nm-shadow-dark)]">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden transition-all ${activeImage === i ? 'nm-inset-sm ring-2 ring-[var(--nm-accent)]' : 'nm-raised-sm'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="56px" unoptimized={true} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="p-6 md:p-8 md:pl-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="nm-badge text-[var(--nm-accent)] text-xs">{product.brand}</span>
              <span className="nm-badge text-[var(--nm-success)] text-xs">{product.condition || 'New'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[var(--nm-text)] mb-2">
              {product.brand} {product.model}
            </h2>

            <div className="nm-inset p-4 mb-5 text-center">
              <div className="text-2xl font-bold text-[var(--nm-accent)]">{formatPrice(product.price)}</div>
              {product.qty > 0 && (
                <div className="text-xs text-[var(--nm-text-secondary)] mt-1">{product.qty} units available</div>
              )}
            </div>

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {product.highlights.map((h, i) => (
                  <span key={i} className="nm-badge text-[var(--nm-text-secondary)] text-xs">{h}</span>
                ))}
              </div>
            )}

            {/* Specs */}
            {product.specs && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[var(--nm-text)] uppercase tracking-wider">Specifications</h4>
                <div className="nm-inset p-4 space-y-2.5">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-start gap-4">
                      <span className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase flex-shrink-0">{key}</span>
                      <span className="text-xs text-[var(--nm-text)] text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
