import Image from 'next/image';
import { useState } from 'react';

export default function ImageContainer({ productImage, displayName, condition, images, availability, qty }) {
    const [imageError, setImageError] = useState(false);
  return (
    <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        {(images?.[0] || product.image) && !imageError ? (
          <Image
            src={productImage}
            alt={displayName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-center">
              <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{displayName}</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            availability 
              ? 'bg-green-100/90 text-green-800 border border-green-200' 
              : 'bg-red-100/90 text-red-800 border border-red-200'
          }`}>
            {availability ? (qty ? `${qty} Available` : 'In Stock') : 'Out of Stock'}
          </span>
        </div>

        {/* Condition Badge */}
        {condition && (
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/90 text-blue-800 border border-blue-200 backdrop-blur-sm">
              {condition}
            </span>
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15">
          <button className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </button>
        </div>
      </div>
  );
}
