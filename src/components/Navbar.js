import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import { toast } from 'react-toastify';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('theme') === 'dark';
  });
  const { getTotalItems } = useCart();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      window.localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-gradient-to-r from-amber-50 to-orange-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-amber-800 focus:outline-none md:hidden hover:bg-amber-100 p-2 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link to="/" className="flex items-center group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                <span className="text-white font-bold text-lg sm:text-xl">G</span>
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                Ghar Ki Yaade
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-amber-100 text-amber-800 font-bold' 
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-amber-100 text-amber-800 font-bold' 
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/wholesale"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 font-bold'
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              Wholesale
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 font-bold'
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/return-policy"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 font-bold'
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              Return Policy
            </NavLink>
            <NavLink
              to="/product-tracking"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 font-bold'
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              Track Order
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Let's find your perfect treat..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="reclix-input pl-10 pr-4 py-2 w-40 lg:w-48 group-hover:w-48 lg:group-hover:w-56"
                aria-label="Search products"
              />
              <svg
                className="h-5 w-5 text-reclix-blue absolute left-3 top-2.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                toast.info(`Switched to ${!isDarkMode ? 'Dark' : 'Light'} mode`, {
                  position: "bottom-right",
                  autoClose: 2000,
                });
              }}
              className="p-2 rounded-full hover:bg-reclix-soft-100 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-reclix-soft-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setCartOpen(true);
                  toast.success('Welcome to your cart! 🛒', {
                    position: "bottom-right",
                    autoClose: 2000,
                  });
                }}
                className="relative text-amber-800 hover:text-reclix-blue transition-colors duration-200 hover:animate-bounce-soft"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-reclix-coral text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2">
            <button
              className="flex items-center justify-between px-4 py-2 rounded-md font-medium bg-amber-100 text-amber-800"
              onClick={() => {
                setMenuOpen(false);
                setCartOpen(true);
              }}
            >
              <span>View Cart</span>
              {getTotalItems() > 0 && (
                <span className="bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'text-amber-800 hover:bg-amber-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'text-amber-800 hover:bg-amber-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'text-amber-800 hover:bg-amber-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/wholesale"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'text-amber-800 hover:bg-amber-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Wholesale
            </NavLink>
            <NavLink
              to="/return-policy"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'text-amber-800 hover:bg-amber-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Return Policy
            </NavLink>
            <NavLink
              to="/product-tracking"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'text-amber-800 hover:bg-amber-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Track Order
            </NavLink>
            
            <div className="pt-2 pb-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50"
                  aria-label="Search products"
                />
                <svg 
                  className="h-5 w-5 text-amber-500 absolute left-3 top-2.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Link 
                to="/login" 
                className="flex items-center px-4 py-2 text-amber-800 hover:bg-amber-50 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Account
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center px-4 py-2 text-amber-800 hover:bg-amber-50 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cart {getTotalItems() > 0 && `(${getTotalItems()})`}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cart Component */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
