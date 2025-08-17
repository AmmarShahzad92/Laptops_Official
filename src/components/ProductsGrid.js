import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from "react";

export default function ProductsGrid({ products , searchTerm, setSearchTerm}) {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedScreenSize, setSelectedScreenSize] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
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

    return (
        <>
            {/* Filters Section */}
            <section id="products-grid" className="py-8 bg-gray-900/50 border-t border-gray-800 backdrop-blur-sm">
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
        </>
    );
}
