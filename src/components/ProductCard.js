import ImageContainer from "./ImageContainer";

export default function ProductCard({ product }) {
  
  const {
    id,
    brand,
    model,
    name,
    cpu,
    ram,
    storage,
    gpu,
    screen,
    price,
    originalPrice,
    condition,
    qty,
    images,
    highlights,
    specs,
    rating,
    inStock
  } = product;

  const productImage = images?.[0] || product.image || '/images/laptop-placeholder.jpg';
  const displayName = name || `${brand} ${model}`;
  const availability = qty > 0 || inStock;
  const ImageDetails = {
    productImage,
    displayName,
    condition,
    images,
    availability,
    qty
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <article className="group relative bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden border border-gray-700 hover:border-blue-500/50 transform hover:-translate-y-2">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-30 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          -{discountPercentage}%
        </div>
      )}

      {/* Compact Image Container */}
      <ImageContainer {...ImageDetails} />

      {/* Compact Content */}
      <div className="p-4">
        {/* Brand & Model */}
        <header className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-md border border-blue-500/30 shadow-sm">
              {brand}
            </span>
            {rating && (
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-gray-400">{rating}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {displayName}
          </h3>
        </header>

        {/* Compact Key Specs */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {cpu && (
            <div className="bg-blue-500/10 p-2 rounded-md border border-blue-500/20 shadow-sm">
              <span className="text-xs font-medium text-blue-400 block">CPU</span>
              <p className="text-xs text-gray-300 font-semibold truncate">{cpu.split(' ').slice(0, 3).join(' ')}</p>
            </div>
          )}
          {ram && (
            <div className="bg-green-500/10 p-2 rounded-md border border-green-500/20 shadow-sm">
              <span className="text-xs font-medium text-green-400 block">RAM</span>
              <p className="text-xs text-gray-300 font-semibold">{ram}</p>
            </div>
          )}
        </div>

        {/* Compact Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {highlights.slice(0, 1).map((highlight, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full font-medium border border-gray-600 shadow-sm"
                >
                  {highlight}
                </span>
              ))}
              {highlights.length > 1 && (
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium border border-blue-500/30 shadow-sm">
                  +{highlights.length - 1} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Compact Price Section */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 shadow-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-white mb-1">
              {formatPrice(price)}
            </div>
            {originalPrice && originalPrice > price && (
              <div className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </div>
            )}
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className="space-y-2">
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm shadow-lg shadow-blue-500/25"
            disabled={!availability}
          >
            {availability ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <button className="w-full border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-400 font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-800/50 text-sm shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}