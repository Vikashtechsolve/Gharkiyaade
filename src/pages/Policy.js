import React from 'react';

const Policy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-6">Our Policies</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h2 className="text-xl font-semibold text-amber-800">Return and Refund Policy</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              We are committed to ensuring your satisfaction. If you are not completely satisfied with your order, we allow returns and refunds subject to the following conditions:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Return request must be made within 48 hours of delivery</li>
              <li>Product must be in unopened and unused condition</li>
              <li>Return shipping costs will be borne by the customer</li>
              <li>Refund will be processed within 7-10 business days to the original payment method</li>
              <li>Customized products and wholesale orders are not eligible for returns</li>
              <li>Products with damaged packaging or missing parts will not be accepted for return</li>
              <li>For Cash on Delivery orders, refunds will be processed via bank transfer</li>
            </ul>

            <p className="text-gray-700">
              To initiate the return process, please contact our customer service team via WhatsApp at <a href="https://wa.me/919999999999" className="text-amber-600 hover:underline">+91 9999999999</a> or email at <a href="mailto:support@gharkiyaade.com" className="text-amber-600 hover:underline">support@gharkiyaade.com</a>.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h2 className="text-xl font-semibold text-amber-800">Shipping Policy</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              We strive to deliver your orders as quickly and safely as possible. Our shipping policy is as follows:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>All orders are processed within 24-48 hours (excluding holidays and weekends)</li>
              <li>Standard shipping: 3-5 business days</li>
              <li>Express shipping: 1-2 business days (additional charges apply)</li>
              <li>Free shipping on orders above ₹500</li>
              <li>Tracking information will be provided via email once the order is shipped</li>
            </ul>

            <p className="text-gray-700 mb-4">
              Currently, we only provide shipping within India. For international shipping, please contact our customer service team.
            </p>

            <p className="text-gray-700">
              For any questions related to shipping, please contact our customer service team at <a href="mailto:shipping@gharkiyaade.com" className="text-amber-600 hover:underline">shipping@gharkiyaade.com</a>.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h2 className="text-xl font-semibold text-amber-800">Wholesale Policy</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              We provide special wholesale services for traders and shopkeepers. Our wholesale policy is as follows:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Minimum quantity requirements apply for wholesale orders (varies by product)</li>
              <li>Special pricing is available for wholesale orders</li>
              <li>Advance payment is required for wholesale orders</li>
              <li>Wholesale order delivery takes 3-5 business days</li>
              <li>Return policy does not apply to wholesale orders</li>
              <li>GST bills are available for GST registered traders</li>
            </ul>

            <p className="text-gray-700 mb-4">
              To place a wholesale order, please visit our <a href="/wholesale" className="text-amber-600 hover:underline">wholesale page</a> or contact our wholesale team at <a href="mailto:wholesale@gharkiyaade.com" className="text-amber-600 hover:underline">wholesale@gharkiyaade.com</a>.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h2 className="text-xl font-semibold text-amber-800">Privacy Policy</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              We respect your privacy and are committed to protecting your personal information. Our privacy policy is as follows:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>We only collect information necessary to process your order and improve our services</li>
              <li>We do not share your personal information with third parties, except for service providers who assist in our business operations</li>
              <li>We take appropriate security measures to keep your information safe</li>
              <li>You can request access, correction, or deletion of your information at any time</li>
            </ul>

            <p className="text-gray-700">
              For any questions related to privacy, please contact us at <a href="mailto:privacy@gharkiyaade.com" className="text-amber-600 hover:underline">privacy@gharkiyaade.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;