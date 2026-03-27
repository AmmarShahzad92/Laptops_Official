'use client';
import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [detailView, setDetailView] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!supabase) {
        console.error('Supabase client not initialized');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('laptops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--nm-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--nm-bg)]">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        brands={brands}
        onBrandSelect={setSelectedBrand}
      />
      <HeroSection />
      <ProductsGrid
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        onViewProduct={(filteredProducts, index) => setDetailView({ products: filteredProducts, index })}
      />
      <Footer />
      <WhatsAppButton />
      <CartSidebar />
      <AuthModal />
      {detailView && (
        <ProductDetailModal
          products={detailView.products}
          initialIndex={detailView.index}
          onClose={() => setDetailView(null)}
        />
      )}
    </div>
  );
}
