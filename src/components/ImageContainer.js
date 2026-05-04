import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

function optimizeUrl(url) {
  if (!url || !url.includes('unsplash.com')) return url;
  const base = url.split('?')[0];
  return `${base}?auto=format&fit=crop&w=640&q=72&fm=webp`;
}

function isSafeImageUrl(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/')) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeImageList(images, fallback) {
  let raw = [];

  if (Array.isArray(images)) {
    raw = images;
  } else if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        raw = parsed;
      } else if (parsed && typeof parsed === 'object') {
        raw = Object.values(parsed);
      }
    } catch {
      raw = [];
    }
  } else if (images && typeof images === 'object') {
    const keys = Object.keys(images);
    const allNumeric = keys.every(key => String(Number(key)) === key);
    const orderedKeys = allNumeric
      ? keys.sort((a, b) => Number(a) - Number(b))
      : keys;
    raw = orderedKeys.map(key => images[key]);
  }

  const list = [];
  const seen = new Set();
  for (const value of raw) {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    if (!isSafeImageUrl(trimmed) || seen.has(trimmed)) continue;
    seen.add(trimmed);
    list.push(trimmed);
  }

  if (!list.length && fallback && isSafeImageUrl(fallback)) {
    list.push(fallback.trim());
  }

  return list;
}

export default function ImageContainer({ productImage, displayName, condition, images, availability, qty, priority = false }) {
  const [imageError, setImageError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const imageList = useMemo(() => normalizeImageList(images, productImage), [images, productImage]);

  useEffect(() => {
    if (!hovering || imageList.length < 2) return;
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageList.length);
    }, 1600);
    return () => clearInterval(intervalId);
  }, [hovering, imageList]);

  useEffect(() => {
    setActiveIndex(0);
  }, [imageList]);

  const handleImageLoad = (img) => {
    if (!img?.naturalWidth || !img?.naturalHeight) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    const clamped = Math.max(0.65, Math.min(1.6, ratio));
    setAspectRatio(clamped);
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: '20px 20px 0 0',
        background: 'linear-gradient(145deg, var(--nm-shadow-dark), var(--nm-bg))',
        aspectRatio,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setActiveIndex(0); }}
    >
      {imageList.length && !imageError ? (
        <div
          className="absolute inset-0 flex"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: 'transform 0.6s ease',
          }}
        >
          {imageList.map((src, idx) => (
            <div key={`${src}-${idx}`} className="relative w-full h-full flex-shrink-0" style={{ flex: '0 0 100%' }}>
              <Image
                src={optimizeUrl(src) || src}
                alt={displayName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, (max-width: 1280px) 30vw, 22vw"
                onError={() => setImageError(true)}
                onLoadingComplete={idx === 0 ? handleImageLoad : undefined}
                priority={priority && idx === 0}
                loading={priority && idx === 0 ? 'eager' : 'lazy'}
                unoptimized={true}
              />
            </div>
          ))}
        </div>
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

      {condition && (
        <div className="absolute bottom-3 left-3 z-20">
          <span className="nm-badge text-[var(--nm-accent)] text-xs">{condition}</span>
        </div>
      )}
    </div>
  );
}
