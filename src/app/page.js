'use client';
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import { products as staticProducts } from "@/data/products";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [detailView, setDetailView] = useState(null); // { products, index }

  const brands = useMemo(() => [...new Set(staticProducts.map(p => p.brand))].sort(), []);

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
        products={staticProducts}
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
