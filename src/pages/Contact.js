import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Whether you have questions about our products,
            need help with an order, or just want to share your feedback, feel free to reach out.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-yellow-600 mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-600">Delhi, India</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-yellow-600 mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">+91 91234 56789</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-yellow-600 mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">contact@gharkaswad.com</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
