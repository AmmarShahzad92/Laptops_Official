import Image from 'next/image';
import { useState } from 'react';

function optimizeUrl(url) {
  if (!url || !url.includes('unsplash.com')) return url;
  const base = url.split('?')[0];
  return `${base}?auto=format&fit=crop&w=640&q=72&fm=webp`;
}

export default function ImageContainer({ productImage, displayName, condition, images, availability, qty, priority = false }) {
  const [imageError, setImageError] = useState(false);
  const optimized = optimizeUrl(productImage);

  return (
    <div
      className="relative h-48 overflow-hidden"
      style={{ borderRadius: '20px 20px 0 0', background: 'linear-gradient(145deg, var(--nm-shadow-dark), var(--nm-bg))' }}
    >
      {images?.[0] && !imageError ? (
        <Image
          src={optimized || productImage}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, (max-width: 1280px) 30vw, 22vw"
          onError={() => setImageError(true)}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          unoptimized={true}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-[var(--nm-shadow-dark)] text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">{displayName}</span>
          </div>
        </div>
      )}

      <div className="absolute top-3 right-3 z-20">
        <span className={`nm-badge text-xs ${availability ? 'text-[var(--nm-success)]' : 'text-[var(--nm-danger)]'}`}>
          {availability ? (qty ? `${qty} Left` : 'In Stock') : 'Out of Stock'}
        </span>
      </div>

      {condition && (
        <div className="absolute bottom-3 left-3 z-20">
          <span className="nm-badge text-[var(--nm-accent)] text-xs">{condition}</span>
        </div>
      )}
    </div>
  );
}
