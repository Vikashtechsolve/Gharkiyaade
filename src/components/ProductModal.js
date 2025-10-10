import React from 'react';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-yellow-700 font-bold text-xl mb-4">{product.price}</p>
          <p className="text-gray-700 mb-4">{product.fullDescription}</p>
          <h3 className="font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
