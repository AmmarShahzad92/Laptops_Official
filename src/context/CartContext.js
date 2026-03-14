'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, selectedRam, selectedStorage, calculatedPrice) => {
    setItems(prev => {
      const key = `${product.id}-${selectedRam}-${selectedStorage}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        key,
        id: product.id,
        brand: product.brand,
        model: product.model,
        ram: selectedRam,
        storage: selectedStorage,
        price: calculatedPrice,
        image: product.images?.[0],
        quantity: 1,
      }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key, delta) => {
    setItems(prev => prev.map(i => {
      if (i.key !== key) return i;
      const newQty = i.quantity + delta;
      return newQty > 0 ? { ...i, quantity: newQty } : i;
    }).filter(i => i.quantity > 0));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkoutWhatsApp = useCallback(() => {
    const lines = items.map((item, idx) =>
      `${idx + 1}. ${item.brand} ${item.model} (${item.ram}, ${item.storage}) x${item.quantity} — PKR ${item.price.toLocaleString()}`
    );
    const msg = `Hi! I'd like to order:\n\n${lines.join('\n')}\n\n*Total: PKR ${totalPrice.toLocaleString()}*\n\nPlease confirm availability.`;
    window.open(`https://wa.me/923194944296?text=${encodeURIComponent(msg)}`, '_blank');
  }, [items, totalPrice]);

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, checkoutWhatsApp
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
