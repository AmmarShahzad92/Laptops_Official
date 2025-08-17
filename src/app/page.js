'use client';
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/mock-products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

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



  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <Error />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800">
      {/* Dark Professional Header */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-500/30 shadow-lg backdrop-blur-sm">
              Pakistan's Premier Laptop Destination
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Premium Computing
            </span>
            <br />
            <span className="text-white">Solutions</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover high-performance gaming laptops, business ultrabooks, and professional workstations with authentic quality assurance.
          </p>
        </div>
      </section>

      {/* Main Products Grid */}
      <ProductsGrid products={products} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
