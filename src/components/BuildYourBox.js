import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const BuildYourBox = () => {
  const { addToCart, showNotification } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [boxSize, setBoxSize] = useState('small'); // small, medium, large
  const [totalPrice, setTotalPrice] = useState(0);
  const [boxColor, setBoxColor] = useState('classic'); // classic, premium, festive
  const [giftWrap, setGiftWrap] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const boxSizes = {
    small: { name: 'Small Box', capacity: 3, basePrice: 299 },
    medium: { name: 'Medium Box', capacity: 6, basePrice: 499 },
    large: { name: 'Large Box', capacity: 9, basePrice: 699 }
  };

  const boxColors = {
    classic: { name: 'Classic', additionalPrice: 0, color: 'bg-amber-100' },
    premium: { name: 'Premium', additionalPrice: 49, color: 'bg-red-100' },
    festive: { name: 'Festive', additionalPrice: 99, color: 'bg-green-100' }
  };

  const availableItems = [
    { id: 1, name: 'Traditional Thekua', price: 99, image: '/images/traditional-thekua.svg', description: 'Famous traditional sweet from Bihar' },
    { id: 2, name: 'Coconut Thekua', price: 119, image: '/images/product1.svg', description: 'Full of coconut flavor' },
    { id: 3, name: 'Jaggery Thekua', price: 109, image: '/images/product2.svg', description: 'Health-beneficial Thekua made from jaggery' },
    { id: 4, name: 'Dry Fruit Thekua', price: 149, image: '/images/traditional-thekua.svg', description: 'Nutritious Thekua full of dry fruits' },
    { id: 5, name: 'Chocolate Thekua', price: 129, image: '/images/product1.svg', description: 'Kids\' favorite chocolate flavor' },
    { id: 6, name: 'Cardamom Thekua', price: 119, image: '/images/product2.svg', description: 'Thekua fragrant with cardamom' }
  ];

  const handleBoxSizeChange = (size) => {
    setBoxSize(size);
    // Reset selections when box size changes
    setSelectedItems([]);
    updateTotalPrice([]);
  };

  const toggleItemSelection = (item) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id);
    let newSelectedItems;
    
    if (isSelected) {
      // Remove item
      newSelectedItems = selectedItems.filter(selected => selected.id !== item.id);
    } else {
      // Add item if capacity not reached
      if (selectedItems.length < boxSizes[boxSize].capacity) {
        newSelectedItems = [...selectedItems, item];
      } else {
        alert(`Your ${boxSizes[boxSize].name} can only fit ${boxSizes[boxSize].capacity} items.`);
        return;
      }
    }
    
    setSelectedItems(newSelectedItems);
    updateTotalPrice(newSelectedItems);
  };

  const updateTotalPrice = (items) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
    const colorPrice = boxColors[boxColor].additionalPrice;
    const giftWrapPrice = giftWrap ? 50 : 0;
    setTotalPrice(boxSizes[boxSize].basePrice + itemsTotal + colorPrice + giftWrapPrice);
  };

  const handleColorChange = (color) => {
    setBoxColor(color);
    updateTotalPrice(selectedItems);
  };

  const handleGiftWrapChange = (isWrapped) => {
    setGiftWrap(isWrapped);
    updateTotalPrice(selectedItems);
  };

  const addCustomBoxToCart = () => {
    if (selectedItems.length === 0) {
      showNotification('Please select at least one item', 'error');
      return;
    }

    const customBox = {
      id: `custom-box-${Date.now()}`,
      name: `Custom ${boxSizes[boxSize].name}`,
      price: totalPrice,
      image: '/images/traditional-thekua.svg',
      isCustomBox: true,
      boxDetails: {
        size: boxSize,
        color: boxColor,
        giftWrap,
        customMessage,
        items: selectedItems
      }
    };

    addToCart(customBox);
    showNotification('Your custom box has been added to cart', 'success');
  };

  const remainingCapacity = boxSizes[boxSize].capacity - selectedItems.length;

  return (
    <div className="py-8 px-4 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800 mb-2">Create Your Custom Sweet Box</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a collection of your favorite Thekua sweets. Choose box size and fill with your preferred varieties.
          </p>
        </div>

        {/* Box Size Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">1. Choose Your Box Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(boxSizes).map(([key, value]) => (
              <div
                key={key}
                onClick={() => handleBoxSizeChange(key)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  boxSize === key
                    ? 'border-amber-600 bg-amber-50 shadow-md'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <h4 className="font-bold text-lg">{value.name}</h4>
                <p className="text-gray-600">Capacity: {value.capacity} items</p>
                <p className="font-semibold text-amber-800 mt-2">Base Price: ₹{value.basePrice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Box Color Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">2. Choose Box Color</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(boxColors).map(([key, value]) => (
              <div
                key={key}
                onClick={() => handleColorChange(key)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${value.color} ${
                  boxColor === key
                    ? 'border-amber-600 shadow-md'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <h4 className="font-bold text-lg">{value.name}</h4>
                <p className="font-semibold text-amber-800 mt-2">
                  {value.additionalPrice > 0 ? `+₹${value.additionalPrice}` : 'No additional charge'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Item Selection */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-amber-700">3. Choose Your Sweets</h3>
            <div className="text-amber-600 font-medium">
              {remainingCapacity} {remainingCapacity === 1 ? 'spot' : 'spots'} left
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableItems.map(item => (
              <div 
                key={item.id}
                onClick={() => toggleItemSelection(item)}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedItems.some(selected => selected.id === item.id)
                    ? 'border-amber-500 ring-2 ring-amber-500 ring-opacity-50'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-amber-700 font-medium mt-1">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Options */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">4. Gift Options</h3>

          <div className="bg-white rounded-lg p-4 border border-amber-100 mb-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="giftWrap"
                checked={giftWrap}
                onChange={(e) => handleGiftWrapChange(e.target.checked)}
                className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="giftWrap" className="ml-2 text-gray-700">Add Gift Wrapping (+₹50)</label>
            </div>

            <div>
              <label htmlFor="customMessage" className="block text-gray-700 mb-2">Custom Message (Optional)</label>
              <textarea
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full p-2 border border-amber-200 rounded-md focus:ring-amber-500 focus:border-amber-500"
                rows="2"
                maxLength="100"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">Your Custom Box Summary</h3>

          {selectedItems.length > 0 ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Selected Items:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedItems.map(item => (
                    <li key={item.id} className="text-gray-600">
                      {item.name} - ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Box Price ({boxSizes[boxSize].name}):</span>
                  <span className="font-medium">₹{boxSizes[boxSize].basePrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Items Total:</span>
                  <span className="font-medium">₹{selectedItems.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                {boxColors[boxColor].additionalPrice > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Box Color ({boxColors[boxColor].name}):</span>
                    <span className="font-medium">₹{boxColors[boxColor].additionalPrice}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Gift Wrapping:</span>
                    <span className="font-medium">₹50</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-amber-800 border-t border-gray-200 pt-2 mt-2">
                  <span>Total Price:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={addCustomBoxToCart}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <p className="text-gray-500 italic">Select items to create your custom box</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildYourBox;