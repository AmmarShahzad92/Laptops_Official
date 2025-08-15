import Image from 'next/image';

export default function ProductCard({ product }) {
  const {
    id,
    slug,
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

  // Use the first image from images array or fallback to a placeholder
  const productImage = images?.[0] || '/images/laptop-placeholder.jpg';
  const displayName = name || `${brand} ${model}`;
  const availability = qty > 0 || inStock;

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
    <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-4 left-4 z-30 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          -{discountPercentage}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        {images?.[0] ? (
          <Image
            src={productImage}
            alt={displayName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-center">
              <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{displayName}</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            availability 
              ? 'bg-green-100/90 text-green-800 border border-green-200' 
              : 'bg-red-100/90 text-red-800 border border-red-200'
          }`}>
            {availability ? (qty ? `${qty} Available` : 'In Stock') : 'Out of Stock'}
          </span>
        </div>

        {/* Condition Badge */}
        {condition && (
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/90 text-blue-800 border border-blue-200 backdrop-blur-sm">
              {condition}
            </span>
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15">
          <button className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Brand & Model */}
        <header className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {brand}
            </span>
            {rating && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">{rating}</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {displayName}
          </h3>
        </header>

        {/* Key Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {cpu && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-blue-700">CPU</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold truncate">{cpu}</p>
            </div>
          )}
          {ram && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-green-700">RAM</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold">{ram}</p>
            </div>
          )}
          {storage && (
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-purple-700">Storage</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold">{storage}</p>
            </div>
          )}
          {gpu && (
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-orange-700">GPU</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold truncate">{gpu}</p>
            </div>
          )}
        </div>

        {/* Screen Info */}
        {screen && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-1">
              <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">Display</span>
            </div>
            <p className="text-sm text-gray-800 font-semibold">{screen}</p>
          </div>
        )}

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {highlights.slice(0, 2).map((highlight, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-full font-medium"
                >
                  {highlight}
                </span>
              ))}
              {highlights.length > 2 && (
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs rounded-full font-medium">
                  +{highlights.length - 2} more features
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(price)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              {originalPrice && originalPrice > price && (
                <div className="text-sm text-green-600 font-semibold mt-1">
                  Save {formatPrice(originalPrice - price)}
                </div>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="text-right">
                <div className="text-xs text-gray-600">You Save</div>
                <div className="text-lg font-bold text-green-600">{discountPercentage}%</div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            disabled={!availability}
          >
            {availability ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <button className="w-full border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-semibold py-2 px-6 rounded-xl transition-all duration-300 hover:bg-blue-50">
            View Details
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
    </article>
  );
}
