import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';
import { ButtonSpinner } from './LoadingSpinner';

const products = [
  {
    id: 1,
    name: 'Traditional Thekua',
    imageUrl: '/images/traditional-thekua.svg',
    price: '₹250',
    description: 'Authentic traditional thekua made with love.',
    fullDescription: 'Experience the divine taste of our Traditional Thekua. Made with the finest ingredients and pure jaggery, this traditional sweet is crafted without any artificial additives. Perfect for festivals or as a healthy snack.',
    ingredients: ['Wheat Flour', 'Jaggery', 'Ghee', 'Cardamom'],
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 124,
    gymBenefits: [
      'Natural source of energy - Get instant energy after workout',
      'Rich in jaggery - Good source of iron and essential minerals',
      'Balanced mix of protein and carbohydrates - Helps in muscle building'
    ]
  },
  {
    id: 2,
    name: 'Jaggery Thekua',
    imageUrl: '/images/product1.svg',
    price: '₹230',
    description: 'Traditional thekua with jaggery sweetness.',
    fullDescription: 'Our Jaggery Thekua brings back the authentic flavors of traditional thekua. Made with time-tested recipes passed down through generations, this sweet captures the essence of Bihar\'s culinary heritage.',
    ingredients: ['Wheat Flour', 'Jaggery', 'Ghee', 'Cardamom'],
    badge: 'Traditional',
    rating: 4.7,
    reviews: 98,
    gymBenefits: [
      'Made from pure jaggery - Natural power booster',
      'Helps recharge glycogen stores after workout',
      'Rich in antioxidants - Helps in recovery'
    ]
  },
  {
    id: 3,
    name: 'Traditional Thekua 3 Combo',
    imageUrl: '/images/product2.svg',
    price: '₹450',
    description: 'Special pack with three traditional thekua.',
    fullDescription: 'Indulge in variety with our Traditional Thekua 3 Combo. This assortment includes our best-selling traditional thekua in one convenient pack, perfect for gifting or trying multiple tastes.',
    ingredients: ['Wheat Flour', 'Jaggery', 'Ghee', 'Cardamom'],
    badge: 'Value Pack',
    rating: 4.9,
    reviews: 76,
    gymBenefits: [
      'Different flavors for before, during and after workout',
      'Provides long-lasting energy - Ideal for long workout sessions',
      'Balanced mix of natural carbohydrates and fats'
    ]
  },
  {
    id: 4,
    name: 'Jaggery Thekua 3 Combo',
    imageUrl: '/images/product1.svg',
    price: '₹600',
    description: 'Gift box with premium jaggery thekua selection.',
    fullDescription: 'Our premium Jaggery Thekua 3 Combo is elegantly packaged and contains a selection of our finest jaggery thekua varieties. Ideal for special occasions and festivals.',
    ingredients: ['Premium Wheat Flour', 'Pure Jaggery', 'Ghee', 'Assorted Flavors'],
    badge: 'Premium',
    rating: 5.0,
    reviews: 52,
    gymBenefits: [
      'Made from premium jaggery - Rich in more nutrients',
      'Helps reduce muscle fatigue',
      'Rich in natural electrolytes - Helps in hydration',
      'Promotes recovery after workout'
    ]
  },
];

const ProductGrid = ({ searchTerm }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState({});
  const { addToCart } = useCart();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product) => {
    setLoadingProducts(prev => ({ ...prev, [product.id]: true }));
    
    // Simulate loading for better UX
    setTimeout(() => {
      addToCart(product);
      setLoadingProducts(prev => ({ ...prev, [product.id]: false }));
    }, 500);
  };

  const filteredProducts = products.filter((product) =>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group reclix-card overflow-hidden cursor-pointer"
          >
            <div className="relative overflow-hidden" onClick={() => handleProductClick(product)}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-white text-amber-700 p-2 rounded-full shadow-md hover:bg-amber-50 transition-colors"
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
              </div>
            </div>
            
            <div className="p-5" onClick={() => handleProductClick(product)}>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
              </div>
              
              <h3 className="text-lg font-bold text-amber-900 mb-1 group-hover:text-amber-700 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-amber-700/70 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-amber-800">{product.price}</span>
                
                <button
                  className="reclix-btn-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={loadingProducts[product.id]}
                >
                  {loadingProducts[product.id] ? (
                    <>
                      <ButtonSpinner />
                      <span className="ml-2">Adding...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-xs sm:text-sm">Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found matching your search.</p>
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

export default ProductGrid;
