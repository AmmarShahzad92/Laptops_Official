'use client';
import { useState, useEffect, useMemo } from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [detailView, setDetailView] = useState(null); // { products, index }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/mock-products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), [products]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

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
