import React from 'react';
import TeamMembers from '../components/TeamMembers';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">About Ghar Ki Yaade</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="/images/about.png"
            alt="About Ghar Ki Yaade"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Ghar Ki Yaade was founded with a vision to bring the warmth and flavors of home-cooked meals to busy households.
            We started as a small family kitchen, dedicated to recreating the comforting tastes of traditional Indian cuisine
            using fresh, high-quality ingredients.
          </p>
          <p className="text-gray-700 mb-4">
            Our chefs draw inspiration from regional recipes across India, ensuring each dish is prepared with authentic spices
            and techniques. We focus on creating meals that remind you of your grandmother's cooking.
          </p>
          <p className="text-gray-700">
            Today, Ghar Ki Yaade stands for quality, tradition, and the joy of sharing homemade food with family and friends.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Ghar Ki Yaade?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">Sourced daily from local markets and farms for maximum freshness.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🍛</div>
            <h3 className="text-xl font-semibold mb-2">Authentic Flavors</h3>
            <p className="text-gray-600">Traditional Indian recipes with regional variations.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
            <p className="text-gray-600">Skilled cooks who prepare each meal with passion and expertise.</p>
          </div>
        </div>
      </div>
      
      {/* Team Members Section */}
      <TeamMembers />
    </div>
  );
};

export default About;
