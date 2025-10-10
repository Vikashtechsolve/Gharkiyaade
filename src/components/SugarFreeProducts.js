import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

// Sugar-free product data
const sugarFreeProducts = [
  {
    id: 101,
    name: 'Sugar-Free Thekua',
    imageUrl: '/images/traditional-thekua.svg',
    price: 280,
    description: 'Traditional thekua made with stevia instead of sugar.',
    fullDescription: 'Our Sugar-Free Thekua is specially crafted for health-conscious individuals. Made with stevia instead of sugar, it maintains the authentic taste while being suitable for those monitoring their sugar intake.',
    ingredients: ['Wheat Flour', 'Stevia', 'Ghee', 'Cardamom'],
    badge: 'Sugar-Free',
    rating: 4.7,
    reviews: 42,
    quantity: 1,
    videoUrl: '/videos/sugar-free-thekua.mp4',
    dietaryInfo: [
      'No added sugar - sweetened with natural stevia',
      'Low glycemic index - suitable for diabetics',
      'Same great taste as traditional thekua'
    ]
  },
  {
    id: 102,
    name: 'Keto-Friendly Thekua',
    imageUrl: '/images/traditional-thekua.svg',
    price: 320,
    description: 'Low-carb thekua made with almond flour.',
    fullDescription: 'Our Keto-Friendly Thekua is perfect for those following a ketogenic diet. Made with almond flour instead of wheat and sweetened with erythritol, it offers a delicious low-carb alternative to traditional thekua.',
    ingredients: ['Almond Flour', 'Erythritol', 'Ghee', 'Cardamom'],
    badge: 'Keto',
    rating: 4.6,
    reviews: 38,
    quantity: 1,
    videoUrl: '/videos/keto-thekua.mp4',
    dietaryInfo: [
      'Low carb - only 3g net carbs per serving',
      'Keto-friendly ingredients',
      'High in healthy fats and moderate protein'
    ]
  },
  {
    id: 103,
    name: 'Diabetic-Friendly Thekua Pack',
    imageUrl: '/images/traditional-thekua.svg',
    price: 350,
    description: 'Special pack designed for diabetic customers.',
    fullDescription: 'Our Diabetic-Friendly Thekua Pack contains specially formulated thekua that\'s safe for diabetics. Made with a blend of whole wheat flour and almond flour, and sweetened with a diabetes-safe sweetener blend.',
    ingredients: ['Whole Wheat Flour', 'Almond Flour', 'Monk Fruit Sweetener', 'Ghee', 'Cardamom'],
    badge: 'Diabetic-Friendly',
    rating: 4.8,
    reviews: 56,
    quantity: 1,
    videoUrl: '/videos/diabetic-thekua.mp4',
    dietaryInfo: [
      'Specially formulated for diabetics',
      'Low glycemic index ingredients',
      'No sugar spike - tested and approved'
    ]
  },
  {
    id: 104,
    name: 'Sugar-Free Assorted Pack',
    imageUrl: '/images/traditional-thekua.svg',
    price: 450,
    description: 'Variety pack with different sugar-free options.',
    fullDescription: 'Our Sugar-Free Assorted Pack gives you a taste of all our sugar-free varieties. Contains our stevia-sweetened thekua, keto-friendly thekua, and diabetic-friendly thekua in one convenient package.',
    ingredients: ['Various Flours', 'Natural Sweeteners', 'Ghee', 'Assorted Flavors'],
    badge: 'Variety Pack',
    rating: 4.9,
    reviews: 34,
    quantity: 1,
    videoUrl: '/videos/assorted-pack.mp4',
    dietaryInfo: [
      'All items contain zero added sugar',
      'Perfect for trying different healthy options',
      'Great for gifting to health-conscious friends and family'
    ]
  },
];

const SugarFreeProducts = ({ searchTerm }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const { addToCart } = useCart();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handlePlayVideo = (e, videoUrl) => {
    e.stopPropagation();
    setCurrentVideo(videoUrl);
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setCurrentVideo('');
  };

  const filteredProducts = sugarFreeProducts.filter((product) =>
    (product.name && product.name.toLowerCase().includes((searchTerm || '').toLowerCase())) ||
    (product.description && product.description.toLowerCase().includes((searchTerm || '').toLowerCase()))
  );

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path
            d="M12 17.27V2"
            style={{ 
              fill: 'none',
              stroke: 'white',
              strokeWidth: '2px'
            }}
          />
        </svg>
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-green-100"
          >
            <div className="relative overflow-hidden" onClick={() => handleProductClick(product)}>
              <div className="absolute inset-0 bg-gradient-to-t from-green-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <button
                  className="bg-white text-green-700 p-2 rounded-full shadow-md hover:bg-green-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                  aria-label="View details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  className="bg-white text-red-600 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  onClick={(e) => handlePlayVideo(e, product.videoUrl)}
                  aria-label="Play video"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-5" onClick={() => handleProductClick(product)}>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
              </div>
              
              <h3 className="text-lg font-bold text-green-900 mb-1 group-hover:text-green-700 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-green-700/70 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-800">₹{product.price}</span>
                
                <button
                  className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No sugar-free products found matching your search.</p>
      )}

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-2 max-w-3xl w-full mx-4">
            <div className="flex justify-end mb-2">
              <button 
                onClick={handleCloseVideo}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <video 
                src={currentVideo} 
                controls 
                autoPlay 
                className="w-full h-full rounded"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default SugarFreeProducts;