export default function Error({ error }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="bg-red-500/20 text-red-400 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-red-500/30">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}