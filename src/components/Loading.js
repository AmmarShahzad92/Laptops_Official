export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300">Loading premium laptops...</p>
        </div>
      </div>
    );
}
