import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ButtonSpinner } from '../components/LoadingSpinner';

const Wholesale = () => {
  const { addToCart, showNotification } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shopName: '',
    address: '',
    gstNumber: '',
    message: '',
    products: [
      { id: 1, name: 'Traditional Thekua', selected: false, quantity: 0, minOrder: 10, price: 200 },
      { id: 2, name: 'Jaggery Thekua', selected: false, quantity: 0, minOrder: 10, price: 180 },
      { id: 3, name: 'Traditional Thekua 3 Combo', selected: false, quantity: 0, minOrder: 5, price: 400 },
      { id: 4, name: 'Jaggery Thekua 3 Combo', selected: false, quantity: 0, minOrder: 5, price: 550 },
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProductSelection = (id) => {
    setFormData({
      ...formData,
      products: formData.products.map(product => 
        product.id === id 
          ? { ...product, selected: !product.selected, quantity: !product.selected ? product.minOrder : 0 } 
          : product
      )
    });
  };

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value, 10) || 0;
    setFormData({
      ...formData,
      products: formData.products.map(product => 
        product.id === id 
          ? { ...product, quantity: quantity, selected: quantity >= product.minOrder } 
          : product
      )
    });
  };

  const handleQuantityIncrement = (id) => {
    const product = formData.products.find(p => p.id === id);
    if (product) {
      handleQuantityChange(id, product.quantity + 1);
    }
  };

  const handleQuantityDecrement = (id) => {
    const product = formData.products.find(p => p.id === id);
    if (product && product.quantity > 0) {
      handleQuantityChange(id, product.quantity - 1);
    }
  };

  const calculateTotal = () => {
    return formData.products
      .filter(product => product.selected)
      .reduce((total, product) => total + (product.quantity * product.price), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone || !formData.shopName || !formData.address) {
        showNotification('Please fill all required fields', 'error');
        return;
      }

      // Check if at least one product is selected
      const selectedProducts = formData.products.filter(product => product.selected);
      if (selectedProducts.length === 0) {
        showNotification('Please select at least one product', 'error');
        return;
      }

      // Validate minimum quantities
      const invalidProducts = selectedProducts.filter(product => product.quantity < product.minOrder);
      if (invalidProducts.length > 0) {
        showNotification(`Minimum quantity not met for ${invalidProducts[0].name}`, 'error');
        return;
      }

      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add wholesale order to cart
      selectedProducts.forEach(product => {
        const wholesaleProduct = {
          id: `wholesale-${product.id}`,
          name: `Wholesale - ${product.name}`,
          price: `₹${product.price * product.quantity}`,
          quantity: 1,
          imageUrl: '/images/product1.svg',
          wholesaleDetails: {
            unitPrice: product.price,
            quantity: product.quantity,
            shopName: formData.shopName,
            gstNumber: formData.gstNumber,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone
          }
        };
        
        addToCart(wholesaleProduct);
      });

      showNotification('Wholesale order added to cart successfully!', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        shopName: '',
        address: '',
        gstNumber: '',
        message: '',
        products: formData.products.map(product => ({
          ...product,
          selected: false,
          quantity: 0
        }))
      });
    } catch (error) {
      showNotification('Error processing order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">Wholesale Order Panel</h1>
        <p className="text-gray-600 mb-8">Special wholesale prices for shopkeepers and traders</p>
        
        <div className="bg-amber-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-amber-700 mb-4">Wholesale Order Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Special Wholesale Prices</h3>
                <p className="text-sm text-gray-600">Special discounts on bulk orders</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Priority Shipping</h3>
                <p className="text-sm text-gray-600">Priority shipping and tracking for wholesale orders</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">100% quality guarantee on all products</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-amber-800 mb-6">Wholesale Order Form</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="shopName">
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="gstNumber">
                  GST Number (Optional)
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">Select Products</h3>
              <p className="text-sm text-gray-600 mb-4">Select products according to minimum order quantity</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-full">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-2 sm:px-4 py-3 text-left text-amber-800 text-sm sm:text-base">Select</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-amber-800 text-sm sm:text-base">Product</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-amber-800 text-sm sm:text-base hidden sm:table-cell">Unit Price</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-amber-800 text-sm sm:text-base">Min Qty</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-amber-800 text-sm sm:text-base">Quantity</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-amber-800 text-sm sm:text-base">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-200 hover:bg-amber-25 transition-colors">
                        <td className="px-2 sm:px-4 py-4">
                          <input
                            type="checkbox"
                            checked={product.selected}
                            onChange={() => handleProductSelection(product.id)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-4 font-medium text-sm sm:text-base">
                          <div>
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-xs text-gray-500 sm:hidden">₹{product.price} per pack</div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-4 hidden sm:table-cell">₹{product.price}</td>
                        <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">{product.minOrder} packs</td>
                        <td className="px-2 sm:px-4 py-4">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                              type="button"
                              onClick={() => handleQuantityDecrement(product.id)}
                              disabled={!product.selected || product.quantity <= 0}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-100 hover:bg-amber-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <input
                              type="number"
                              min={0}
                              value={product.quantity}
                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                              className={`w-20 px-2 py-1 text-center border ${
                                product.selected && product.quantity < product.minOrder && product.quantity > 0
                                  ? 'border-red-300 bg-red-50'
                                  : 'border-gray-300'
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500`}
                              disabled={!product.selected}
                            />
                            
                            <button
                              type="button"
                              onClick={() => handleQuantityIncrement(product.id)}
                              disabled={!product.selected}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-100 hover:bg-amber-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                          
                          {product.selected && product.quantity < product.minOrder && product.quantity > 0 && (
                            <p className="text-xs text-red-500 mt-1 text-center">
                              Minimum {product.minOrder} packs required
                            </p>
                          )}
                        </td>
                        <td className="px-2 sm:px-4 py-4 font-medium text-sm sm:text-base">
                          {product.selected ? `₹${product.price * product.quantity}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-amber-50">
                      <td colSpan="5" className="px-2 sm:px-4 py-3 text-right font-semibold text-amber-800 text-sm sm:text-base">
                        Total Amount:
                      </td>
                      <td className="px-2 sm:px-4 py-3 font-bold text-amber-800 text-sm sm:text-base">
                        ₹{calculateTotal()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">Wholesale Policy</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Minimum quantity is required for all wholesale orders</li>
                <li>Advance payment is required for wholesale orders</li>
                <li>Wholesale order delivery takes 3-5 working days</li>
                <li>Return policy does not apply to wholesale orders</li>
                <li>GST bill is available for wholesale orders</li>
              </ul>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">Order Summary</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Selected Items:</span>
                  <span className="font-medium">{formData.products.filter(p => p.selected).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Quantity:</span>
                  <span className="font-medium">{formData.products.filter(p => p.selected).reduce((sum, p) => sum + p.quantity, 0)} packs</span>
                </div>
                <div className="flex justify-between items-center border-t border-amber-200 pt-2 mt-2">
                  <span className="font-semibold text-amber-800">Total Amount:</span>
                  <span className="font-bold text-xl text-amber-800">₹{calculateTotal()}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      products: formData.products.map(product => ({
                        ...product,
                        selected: false,
                        quantity: 0
                      }))
                    });
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Selection
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting || formData.products.filter(p => p.selected).length === 0}
                  className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium rounded-lg hover:from-amber-700 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <ButtonSpinner />
                      <span className="ml-2">Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add Wholesale Order to Cart
                    </>
                  )}
                </button>
              </div>
              
              {formData.products.filter(p => p.selected).length === 0 && (
                <p className="text-sm text-gray-500">Please select at least one product to proceed</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wholesale;