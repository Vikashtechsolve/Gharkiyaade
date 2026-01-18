import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ProductGrid from '../components/ProductGrid';
import PromotionSlider from '../components/PromotionSlider';
import FlashSale from '../components/FlashSale';
import BuildYourBox from '../components/BuildYourBox';

const Home = () => {
  const features = [
    {
      title: "Authentic Taste",
      description: "Experience the authentic flavors of traditional home cooking",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      title: "Handcrafted Products",
      description: "Each product is carefully handcrafted with love and tradition",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
    },
    {
      title: "Premium Quality",
      description: "Only the finest ingredients go into our products",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="bg-gradient-to-b from-amber-50 to-white">
      {/* Promotion Slider */}
      <section className="relative overflow-hidden">
        <PromotionSlider />
      </section>

      {/* Products Section - Added at the top */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-4">Our Featured Products</h2>
            <p className="text-amber-700/70 max-w-2xl mx-auto">
              Discover our handcrafted traditional sweets and snacks
            </p>
          </div>
          <ProductGrid />
          <div className="text-center mt-8">
            <Link to="/products" className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-900/10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif">
                <span className="block text-amber-800">Authentic</span>
                <span className="block text-amber-600">Traditional</span>
                <span className="block bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">Thekua</span>
              </h1>
              <p className="text-lg md:text-xl text-amber-900/80">
                Experience the authentic taste of traditional home cooking with our handcrafted products made with love and care.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/products" className="reclix-btn">
                  Shop Now
                  <span className="reclix-microtext ml-2">✨ One-click to delicious treats</span>
                </Link>
                <Link to="/about" className="px-8 py-3 bg-white text-amber-700 font-medium rounded-full shadow-md border border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 reclix-hover-effect">
                  Learn More
                  <span className="reclix-microtext ml-2">📖 Our story</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                <img 
                  src="/images/hero-banner.svg" 
                  alt="Traditional Thekua" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-4">Why Choose Us</h2>
            <p className="text-amber-700/70 max-w-2xl mx-auto">
              We take pride in our commitment to quality, tradition, and customer satisfaction
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100">
                <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">{feature.title}</h3>
                <p className="text-amber-700/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sales Section */}
      <FlashSale />
      
      {/* Build Your Box Section */}
      <BuildYourBox />
      

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Sign up to receive updates on new products, special offers, and more!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-amber-700 font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              Contact Us
            </Link>
            <Link to="/products" className="px-8 py-3 bg-amber-800 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
