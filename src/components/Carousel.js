import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'Welcome to Ghar Ki Yaade',
    subtitle: 'Authentic Home-Cooked Meals',
    code: 'GHAR25',
    description: 'Delicious, fresh, and made with love at home! Get 25% off on your first order.',
    imageUrl: '/images/slider1.png', // Replace with actual image path for first slide
    ctaText: 'Explore Menu',
    ctaLink: '/products',
  },
  {
    id: 2,
    title: 'Fresh Ingredients Daily',
    subtitle: 'Farm to Table',
    code: 'FRESH10',
    description: 'We use only the freshest ingredients sourced directly from local farms.',
    imageUrl: '/images/slider2.png', // Replace with actual image path for second slide
    ctaText: 'Learn More',
    ctaLink: '/about',
  },
  // Add more slides as needed
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((current + 1) % length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, length]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg mt-8 bg-beige-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title || 'Slide image'}
            className="w-full h-full object-cover rounded-lg"
          />
          {slide.title && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-6 sm:p-12 text-white">
              <h2 className="text-3xl font-extrabold">{slide.title}</h2>
              {slide.subtitle && (
                <p className="text-xl font-semibold mt-2">{slide.subtitle}</p>
              )}
              {slide.code && (
                <p className="mt-1 bg-yellow-500 text-black px-2 py-1 rounded inline-block font-bold">
                  Use Code: {slide.code}
                </p>
              )}
              <p className="mt-3 max-w-md">{slide.description}</p>
              {slide.ctaText && (
                <a
                  href={slide.ctaLink}
                  className="mt-4 inline-block bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                  {slide.ctaText}
                </a>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-yellow-600' : 'bg-yellow-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => setCurrent((current - 1 + length) % length)}
          aria-label="Previous slide"
          className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
        >
          {'<'}
        </button>
        <button
          onClick={() => setCurrent((current + 1) % length)}
          aria-label="Next slide"
          className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
        >
          {'>'}
        </button>
      </div>
      <div className="absolute top-4 right-12">
        <button
          onClick={() => clearTimeout()}
          aria-label="Pause slider"
          className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
        >
          &#10073;&#10073;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
