import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-1">
      <div className="text-sm font-medium">Deal ends in:</div>
      <div className="flex items-center space-x-1">
        <div className="bg-amber-700 text-white px-2 py-1 rounded">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span>:</span>
        <div className="bg-amber-700 text-white px-2 py-1 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span>:</span>
        <div className="bg-amber-700 text-white px-2 py-1 rounded">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

const FlashSale = () => {
  // Sample flash sale data
  const flashSales = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 30% off on all Thekua varieties",
      image: "/images/traditional-thekua.svg",
      originalPrice: 299,
      salePrice: 209,
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
      badge: "30% OFF"
    },
    {
      id: 2,
      title: "Daily Deal",
      description: "Buy 1 Get 1 Free on selected items",
      image: "/images/traditional-thekua.svg",
      originalPrice: 399,
      salePrice: 399,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      badge: "BOGO"
    }
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-amber-800">Flash Sales</h2>
          <Link to="/products" className="text-amber-600 hover:text-amber-800 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashSales.map((sale) => (
            <div key={sale.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={sale.image} 
                  alt={sale.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                  {sale.badge}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-800">{sale.title}</h3>
                <p className="text-gray-600 mb-2">{sale.description}</p>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-amber-800">₹{sale.salePrice}</span>
                  {sale.originalPrice !== sale.salePrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">₹{sale.originalPrice}</span>
                  )}
                </div>
                
                <CountdownTimer endTime={sale.endTime} />
                
                <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;