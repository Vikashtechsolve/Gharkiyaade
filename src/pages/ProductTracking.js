import React, { useState } from 'react';

const ProductTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');

  const handleTrackOrder = () => {
    // Mock tracking info for demonstration
    if (orderId.trim() === '') {
      setError('Please enter a valid order ID.');
      setTrackingInfo(null);
      return;
    }
    setError('');
    setTrackingInfo({
      status: 'In Transit',
      estimatedDelivery: '2025-10-15',
      currentLocation: 'Jamnagar Distribution Center',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-4">Product Tracking</h1>
      <input
        type="text"
        placeholder="Enter your Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleTrackOrder}
        className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800"
      >
        Track Order
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {trackingInfo && (
        <div className="mt-6 p-4 border rounded bg-amber-50">
          <p><strong>Status:</strong> {trackingInfo.status}</p>
          <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
          <p><strong>Current Location:</strong> {trackingInfo.currentLocation}</p>
        </div>
      )}
    </div>
  );
};

export default ProductTracking;
