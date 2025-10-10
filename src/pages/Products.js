import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SugarFreeProducts from '../components/SugarFreeProducts';

const Products = ({ searchTerm }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Our Products</h1>
      
      {/* Regular Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-amber-800 border-b-2 border-amber-200 pb-2">
          Traditional Products
        </h2>
        <ProductGrid searchTerm={searchTerm} />
      </div>
      
      {/* Sugar-Free Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">
          Sugar-Free Products
        </h2>
        <p className="text-gray-600 mb-6">
          Our special selection of sugar-free and health-conscious options, perfect for those monitoring their sugar intake.
        </p>
        <SugarFreeProducts searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Products;
