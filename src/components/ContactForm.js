import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { sendContactFormEmail } from '../services/emailService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '', // Added phone field for WhatsApp
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactFormEmail(formData);
      if (result.success) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us via WhatsApp.');
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us via WhatsApp.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // WhatsApp direct contact function
  const handleWhatsAppContact = () => {
    const phoneNumber = '919999999999'; // Replace with your actual WhatsApp business number
    const message = encodeURIComponent('Hello, I would like to know more about Ghar Ki Yaade products.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
            Phone Number (for WhatsApp) *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            <FaWhatsapp className="mr-2" size={20} /> Connect on WhatsApp
          </button>
        </div>
        
        {submitMessage && (
          <p className="mt-4 text-green-600 text-center">{submitMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
