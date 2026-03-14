import Image from 'next/image';
import { useState } from 'react';

export default function ImageContainer({ productImage, displayName, condition, images, availability, qty }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-48 overflow-hidden" style={{ borderRadius: '20px 20px 0 0', background: 'linear-gradient(145deg, #d3d9e3, #e6ebf2)' }}>
      {images?.[0] && !imageError ? (
        <Image
          src={productImage}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => setImageError(true)}
          priority={false}
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

      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-20">
        <span className={`nm-badge text-xs ${availability ? 'text-[var(--nm-success)]' : 'text-[var(--nm-danger)]'}`}>
          {availability ? (qty ? `${qty} Available` : 'In Stock') : 'Out of Stock'}
        </span>
      </div>

      {/* Condition Badge */}
      {condition && (
        <div className="absolute bottom-3 left-3 z-20">
          <span className="nm-badge text-[var(--nm-accent)] text-xs">{condition}</span>
        </div>
      )}
    </div>
  );
}
