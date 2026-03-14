'use client';
import { useCart } from '@/context/CartContext';
import useAuthStore from '@/store/authStore';
import Image from 'next/image';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalItems, totalPrice, checkoutWhatsApp } = useCart();
  const { user, openAuth } = useAuthStore();

  const formatPrice = (p) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p);

  const handleCheckout = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    checkoutWhatsApp();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-md h-full bg-[var(--nm-bg)] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-[var(--nm-shadow-dark)]/20">
          <div className="flex items-center gap-3">
            <div className="nm-raised-sm w-10 h-10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--nm-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--nm-text)]">Cart ({totalItems})</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="nm-btn w-9 h-9 flex items-center justify-center text-[var(--nm-text-secondary)]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="nm-inset w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-[var(--nm-shadow-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <p className="text-[var(--nm-text-secondary)] font-medium">Your cart is empty</p>
              <p className="text-sm text-[var(--nm-shadow-dark)] mt-1">Add laptops to get started</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} className="nm-raised-sm p-4">
                <div className="flex gap-3">
                  <div className="nm-inset-sm w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg relative">
                    {item.image ? (
                      <Image src={item.image} alt={`${item.brand} ${item.model}`} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--nm-shadow-dark)]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[var(--nm-text)] truncate">{item.brand} {item.model}</h4>
                    <p className="text-xs text-[var(--nm-text-secondary)] mt-0.5">{item.ram} / {item.storage}</p>
                    <p className="text-sm font-bold text-[var(--nm-accent)] mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <button onClick={() => removeItem(item.key)} className="nm-btn w-7 h-7 flex items-center justify-center flex-shrink-0 text-[var(--nm-danger)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-end gap-3 mt-3">
                  <button onClick={() => updateQuantity(item.key, -1)} className="nm-btn w-7 h-7 flex items-center justify-center text-sm font-bold">−</button>
                  <span className="text-sm font-bold text-[var(--nm-text)] w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.key, 1)} className="nm-btn w-7 h-7 flex items-center justify-center text-sm font-bold">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[var(--nm-shadow-dark)]/20 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[var(--nm-text-secondary)] font-medium">Total</span>
              <span className="text-xl font-bold text-[var(--nm-text)]">{formatPrice(totalPrice)}</span>
            </div>
            <button onClick={handleCheckout} className="nm-btn-accent w-full py-3 px-4 flex items-center justify-center gap-2 text-sm">
              {user ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Checkout via WhatsApp
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign in to Checkout
                </>
              )}
            </button>
            <button onClick={clearCart} className="nm-btn w-full py-2 px-4 text-sm text-[var(--nm-danger)]">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
