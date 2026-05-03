'use client';
import { useState, useMemo } from 'react';
import ImageContainer from "./ImageContainer";
import { useCart } from '@/context/CartContext';

const RAM_OPTIONS = ['8GB', '16GB', '32GB', '64GB'];
const STORAGE_OPTIONS = ['256GB', '512GB', '1TB', '2TB'];
const RAM_PRICE_PER_8GB = 9000;
const STORAGE_PRICE_PER_256GB = 8000;

function parseRam(ramStr) {
  const match = ramStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 16;
}

function parseStorage(storageStr) {
  const match = storageStr.match(/(\d+)/);
  if (!match) return 512;
  const num = parseInt(match[1]);
  if (storageStr.toLowerCase().includes('tb')) return num * 1024;
  return num;
}

function ramGBFromOption(opt) {
  const match = opt.match(/(\d+)/);
  return match ? parseInt(match[1]) : 16;
}

function storageGBFromOption(opt) {
  if (opt.includes('TB')) return parseInt(opt) * 1024;
  return parseInt(opt);
}

export default function ProductCard({ product, onViewDetail }) {
  const { id, brand, model, name, cpu, ram, storage, gpu, screen, price, originalPrice, condition, qty, images, highlights, rating } = product;
  const { addItem } = useCart();

  const baseRamGB = parseRam(ram);
  const baseStorageGB = parseStorage(storage);

  const defaultRam = RAM_OPTIONS.find(o => ramGBFromOption(o) === baseRamGB) || '16GB';
  const defaultStorage = STORAGE_OPTIONS.find(o => storageGBFromOption(o) === baseStorageGB) || '512GB';

  const [selectedRam, setSelectedRam] = useState(defaultRam);
  const [selectedStorage, setSelectedStorage] = useState(defaultStorage);

  const calculatedPrice = useMemo(() => {
    const ramDiff = (ramGBFromOption(selectedRam) - baseRamGB) / 8;
    const storageDiff = (storageGBFromOption(selectedStorage) - baseStorageGB) / 256;
    return price + (ramDiff * RAM_PRICE_PER_8GB) + (storageDiff * STORAGE_PRICE_PER_256GB);
  }, [selectedRam, selectedStorage, price, baseRamGB, baseStorageGB]);

  const productImage = images?.[0] || '/images/laptop-placeholder.jpg';
  const displayName = name || `${brand} ${model}`;
  const availability = qty > 0;
  const ImageDetails = { productImage, displayName, condition, images, availability, qty };

  const formatPrice = (p) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p);

  return (
    <article className="nm-card group masonry-item">
      <ImageContainer {...ImageDetails} />

      <div className="p-4">
        <header className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="nm-badge text-[var(--nm-accent)] text-xs">{brand}</span>
            {rating && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-[var(--nm-text-secondary)]">{rating}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-[var(--nm-text)] group-hover:text-[var(--nm-accent)] transition-colors line-clamp-2">
            {displayName}
          </h3>
        </header>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {cpu && (
            <div className="nm-inset-sm p-2">
              <span className="text-[10px] font-bold text-[var(--nm-accent)] block uppercase">CPU</span>
              <p className="text-xs text-[var(--nm-text)] font-semibold truncate">{cpu.split(' ').slice(0, 3).join(' ')}</p>
            </div>
          )}
          {gpu && (
            <div className="nm-inset-sm p-2">
              <span className="text-[10px] font-bold text-[var(--nm-accent)] block uppercase">GPU</span>
              <p className="text-xs text-[var(--nm-text)] font-semibold truncate">{gpu}</p>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label className="text-[10px] font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1">RAM</label>
          <div className="flex gap-1.5 flex-wrap">
            {RAM_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setSelectedRam(opt)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${selectedRam === opt
                    ? 'nm-btn-accent text-white'
                    : 'nm-btn text-[var(--nm-text-secondary)]'
                  }`}
                style={{ borderRadius: '8px', boxShadow: selectedRam === opt ? 'inset 2px 2px 4px rgba(0,0,0,0.15), inset -2px -2px 4px rgba(255,255,255,0.1)' : undefined }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="text-[10px] font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1">Storage</label>
          <div className="flex gap-1.5 flex-wrap">
            {STORAGE_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setSelectedStorage(opt)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${selectedStorage === opt
                    ? 'nm-btn-accent text-white'
                    : 'nm-btn text-[var(--nm-text-secondary)]'
                  }`}
                style={{ borderRadius: '8px', boxShadow: selectedStorage === opt ? 'inset 2px 2px 4px rgba(0,0,0,0.15), inset -2px -2px 4px rgba(255,255,255,0.1)' : undefined }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {highlights?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {highlights.slice(0, 1).map((h, i) => (
              <span key={i} className="nm-badge text-[var(--nm-text-secondary)] text-[10px]">{h}</span>
            ))}
            {highlights.length > 1 && (
              <span className="nm-badge text-[var(--nm-accent)] text-[10px]">+{highlights.length - 1} more</span>
            )}
          </div>
        )}

        <div className="nm-inset p-3 mb-4 text-center">
          <div className="text-xl font-bold text-[var(--nm-text)]">{formatPrice(calculatedPrice)}</div>
          {(selectedRam !== defaultRam || selectedStorage !== defaultStorage) && (
            <div className="text-xs text-[var(--nm-text-secondary)] mt-0.5">
              Base: {formatPrice(price)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onViewDetail}
            className="nm-btn py-2.5 px-3 text-sm flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <button
            onClick={() => availability && addItem(product, selectedRam, selectedStorage, calculatedPrice)}
            disabled={!availability}
            className="nm-btn-accent py-2.5 px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availability ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </article>
  );
}
