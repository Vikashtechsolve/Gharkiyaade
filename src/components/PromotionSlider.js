import React, { useState, useEffect } from 'react';

const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const promotions = [
    {
      id: 1,
      image: '/images/promo-banner.svg',
      alt: 'Great Launching Offer - 25% OFF with code SWAD25',
      link: '/products'
    },
    {
      id: 2,
      image: '/images/promo-banner.svg', // You can create more banners later
      alt: 'Weekend Special - Free Delivery on orders above ₹500',
      link: '/products'
    }
  ];

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused, promotions.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotions.map((promo) => (
          <div key={promo.id} className="w-full flex-shrink-0">
            <a href={promo.link}>
              <img 
                src={promo.image} 
                alt={promo.alt} 
                className="w-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-amber-700' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Pause/Play button */}
      <button
        onClick={togglePause}
        className="absolute right-4 bottom-4 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? (
          <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PromotionSlider;