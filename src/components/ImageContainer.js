import Image from 'next/image';
import { useState } from 'react';

export default function ImageContainer({ productImage, displayName, condition, images, availability, qty }) {
    const [imageError, setImageError] = useState(false);
    
  return (
    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        
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
            <div className="text-gray-500 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">{displayName}</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg ${
            availability 
              ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
              : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}>
            {availability ? (qty ? `${qty} Available` : 'In Stock') : 'Out of Stock'}
          </span>
        </div>

        {/* Condition Badge */}
        {condition && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/40 backdrop-blur-sm shadow-lg">
              {condition}
            </span>
          </div>
        )}
      </div>
  );
}

