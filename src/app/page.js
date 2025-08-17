'use client';
import { useState, useEffect } from "react";
import ProductCard from '@/components/ProductCard';
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedScreenSize, setSelectedScreenSize] = useState('');

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

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.cpu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.gpu.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (selectedScreenSize) {
      filtered = filtered.filter(product => 
        product.screen.includes(selectedScreenSize)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedBrand, selectedScreenSize]);

  // Get unique brands and screen sizes for filters
  const brands = [...new Set(products.map(product => product.brand))];
  const screenSizes = [...new Set(products.map(product => product.screen.split('"')[0] + '"'))];

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <Error/>
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

      {/* Filters Section */}
      <section className="py-8 bg-gray-900/50 border-t border-gray-800 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-300 font-medium">Filter by:</span>
            
            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Screen Size Filter */}
            <select
              value={selectedScreenSize}
              onChange={(e) => setSelectedScreenSize(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
            >
              <option value="">All Sizes</option>
              {screenSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(selectedBrand || selectedScreenSize || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedBrand('');
                  setSelectedScreenSize('');
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors text-sm shadow-lg"
              >
                Clear Filters
              </button>
            )}

            <div className="ml-auto text-gray-400 text-sm">
              {filteredProducts.length} of {products.length} laptops
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <main className="container mx-auto px-6 py-12">
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No laptops found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => {
                setSelectedBrand('');
                setSelectedScreenSize('');
                setSearchTerm('');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
            >
              Show Other Laptops
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-900/80 to-black/80 rounded-2xl p-12 border border-gray-700 shadow-2xl backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white mb-4">
            Need Assistance?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our experts are here to help you find the perfect laptop for your specific needs and budget requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Expert Help
            </button>
            <button className="border-2 border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg">
              Browse Categories
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 group">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700 shadow-xl">
              Chat with us on WhatsApp
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
