import React from 'react';
import { useCart } from '../context/CartContext';
import OrderForm from './OrderForm';

const Cart = ({ isOpen, onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    showOrderForm, 
    setShowOrderForm,
    placeOrder
  } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (orderData) => {
    placeOrder(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brown-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="mt-4 text-gray-600">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-yellow-700">{item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="mx-2 text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showOrderForm && (
        <OrderForm 
          cartItems={cart} 
          onClose={() => setShowOrderForm(false)} 
          onOrderSubmit={handleOrderSubmit} 
        />
      )}
    </div>
  );
};

export default Cart;