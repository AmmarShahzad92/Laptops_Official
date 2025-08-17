export default function WhatsAppButton() {
    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => window.open('https://wa.me/923194944296?text=Hi! I am interested in your laptops. Can you help me choose the right one?', '_blank')}
                    className="relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-110 group overflow-hidden"
                    style={{
                        animation: 'shine 2s ease-in-out infinite, borderGlow 3s ease-in-out infinite alternate'
                    }}
                >
                    {/* Shiny overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                   
                    <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>

                    {/* Enhanced Floating Notification Dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-red-500/50">
                        <span className="text-xs text-white font-bold">1</span>
                        <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
                    </div>

                    {/* Additional glow effects */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-md animate-pulse"></div>
                </button>
            </div>

            {/* Enhanced Custom CSS for animations */}
            <style jsx>{`
                @keyframes shine {
                    0%, 100% {
                        box-shadow: 
                            0 0 20px rgba(34, 197, 94, 0.3), 
                            0 0 40px rgba(34, 197, 94, 0.2), 
                            0 0 60px rgba(34, 197, 94, 0.1);
                    }
                    50% {
                        box-shadow: 
                            0 0 30px rgba(34, 197, 94, 0.6), 
                            0 0 50px rgba(34, 197, 94, 0.4), 
                            0 0 70px rgba(34, 197, 94, 0.2);
                    }
                }

                @keyframes borderGlow {
                    0% {
                        box-shadow: 
                            0 0 20px rgba(34, 197, 94, 0.3), 
                            0 0 40px rgba(34, 197, 94, 0.2), 
                            inset 0 0 10px rgba(255, 255, 255, 0.1);
                    }
                    100% {
                        box-shadow: 
                            0 0 40px rgba(34, 197, 94, 0.6), 
                            0 0 60px rgba(34, 197, 94, 0.4), 
                            inset 0 0 20px rgba(255, 255, 255, 0.2);
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%) skewX(-12deg);
                    }
                    100% {
                        transform: translateX(200%) skewX(-12deg);
                    }
                }

                .animate-shimmer {
                    animation: shimmer 3s ease-in-out infinite;
                }

                /* Additional professional animations */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes ripple {
                    0% {
                        transform: scale(0.8);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2.4);
                        opacity: 0;
                    }
                }

                /* Enhance button with subtle float animation */
                .fixed.bottom-6 button {
                    animation: 
                        shine 2s ease-in-out infinite, 
                        borderGlow 3s ease-in-out infinite alternate,
                        float 4s ease-in-out infinite;
                }

                /* Make tooltip more elegant */
                .group:hover .group-hover\\:block {
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}