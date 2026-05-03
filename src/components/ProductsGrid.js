'use client';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from "react";

export default function ProductsGrid({ products, searchTerm, setSearchTerm, selectedBrand, setSelectedBrand, onViewProduct }) {
  const [selectedScreenSize, setSelectedScreenSize] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCpu, setSelectedCpu] = useState('');

  const getGpuLabel = (gpu) => {
    if (!gpu) return '';
    if (typeof gpu === 'string') return gpu;
    if (Array.isArray(gpu.dedicated) && gpu.dedicated[0]) return gpu.dedicated[0];
    if (gpu.dedicated) return gpu.dedicated;
    if (gpu.integrated) return gpu.integrated;
    return '';
  };

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.cpu || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        getGpuLabel(product.gpu).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }
    if (selectedScreenSize) {
      filtered = filtered.filter(product => product.screen.includes(selectedScreenSize));
    }
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(maxPrice, 10));
    }
    if (selectedCpu) {
      filtered = filtered.filter(product => product.cpu.toLowerCase().includes(selectedCpu.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedBrand, selectedScreenSize, maxPrice, selectedCpu]);

  const screenSizes = [...new Set(products
    .map(p => p.screen)
    .filter(Boolean)
    .map(screen => screen.split('"')[0] + '"'))];
  const brands = [...new Set(products.map(p => p.brand))].sort((a, b) => a.localeCompare(b));
  const cpuTypes = [
    ...new Set(
      products.flatMap(p => {
        const cpu = (p.cpu || '').toLowerCase();
        const types = [];
        if (cpu.includes('i5')) types.push('Core i5');
        if (cpu.includes('i7')) types.push('Core i7');
        if (cpu.includes('i9')) types.push('Core i9');
        if (cpu.includes('ryzen 5')) types.push('Ryzen 5');
        if (cpu.includes('ryzen 7')) types.push('Ryzen 7');
        if (cpu.includes('ryzen 9')) types.push('Ryzen 9');
        if (cpu.includes('m1')) types.push('Apple M1');
        if (cpu.includes('m2')) types.push('Apple M2');
        if (cpu.includes('m3')) types.push('Apple M3');
        if (cpu.includes('m4')) types.push('Apple M4');
        return types;
      })
    )
  ];

  return (
    <>
      <section id="products-grid" className="py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="nm-raised p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-[var(--nm-text)]">Filter:</span>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="nm-select text-sm"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedCpu}
                onChange={(e) => setSelectedCpu(e.target.value)}
                className="nm-select text-sm"
              >
                <option value="">All Processors</option>
                {cpuTypes.map(cpu => (
                  <option key={cpu} value={cpu}>{cpu}</option>
                ))}
              </select>

              <select
                value={selectedScreenSize}
                onChange={(e) => setSelectedScreenSize(e.target.value)}
                className="nm-select text-sm"
              >
                <option value="">All Sizes</option>
                {screenSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="nm-input text-sm w-32"
              />



              {(selectedBrand || selectedScreenSize || searchTerm || maxPrice || selectedCpu) && (
                <button
                  onClick={() => { setSelectedBrand(''); setSelectedScreenSize(''); setSearchTerm(''); setMaxPrice(''); setSelectedCpu(''); }}
                  className="nm-btn px-4 py-2 text-sm text-[var(--nm-danger)]"
                >
                  Clear
                </button>
              )}

              <div className="ml-auto text-sm text-[var(--nm-text-secondary)] font-medium">
                {filteredProducts.length} of {products.length} laptops
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-6 pb-12">
        {filteredProducts.length > 0 ? (
          <div className="masonry-grid mb-16">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={() => onViewProduct(filteredProducts, idx)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="nm-inset w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-[var(--nm-shadow-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[var(--nm-text)] mb-4">No laptops found</h3>
            <p className="text-[var(--nm-text-secondary)] mb-8">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSelectedBrand(''); setSelectedScreenSize(''); setSearchTerm(''); }}
              className="nm-btn-accent px-6 py-3 text-sm"
            >
              Show All Laptops
            </button>
          </div>
        )}

        <div className="nm-raised-lg p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--nm-text)] mb-4">Need Assistance?</h3>
          <p className="text-[var(--nm-text-secondary)] mb-8 max-w-2xl mx-auto">
            Our experts are here to help you find the perfect laptop for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://wa.me/923117092752?text=Hi! I need help choosing a laptop.', '_blank')}
              className="nm-btn-accent px-8 py-3 text-sm"
            >
              Get Expert Help
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="nm-btn px-8 py-3 text-sm"
            >
              Back to Top
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
