export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                LaptopStore
                            </h4>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                            Your trusted partner for premium computing solutions. We provide authentic products with reliable service and competitive pricing.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4 text-white">Categories</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Gaming Laptops</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Business Laptops</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Workstations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4 text-white">Contact</h5>
                        <div className="space-y-3 text-gray-400">
                            <p className="flex items-center">
                                <span className="text-blue-400 mr-2">📞</span>
                                +92 300 1234567
                            </p>
                            <p className="flex items-center">
                                <span className="text-blue-400 mr-2">✉️</span>
                                info@laptopstore.pk
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; 2025 LaptopStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
