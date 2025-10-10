import React, { useState } from 'react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Common FAQs and responses
  const faqs = {
    "delivery": "We deliver to most areas in the city. Delivery is free for orders above ₹500!",
    "shipping": "Standard shipping takes 2-3 business days. Express shipping (₹50 extra) delivers in 24 hours.",
    "payment": "We accept all major credit/debit cards, UPI, and cash on delivery.",
    "return": "We have a 100% satisfaction guarantee. If you're not happy with your order, please contact us within 24 hours of delivery.",
    "hours": "Our customer service is available from 9 AM to 8 PM, 7 days a week.",
    "ingredients": "All our products are made with premium quality ingredients. For specific allergen information, please check the product details.",
    "discount": "Use code SWAD25 for 25% off on your first order!",
    "hello": "Hello! How can I help you today?",
    "hi": "Hi there! How can I assist you today?"
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = { id: messages.length + 1, text: newMessage, sender: "user" };
    setMessages([...messages, userMessage]);
    
    // Generate bot response
    setTimeout(() => {
      let botResponse = "I'm not sure about that. Would you like to speak with a customer service representative?";
      
      // Check for keywords in user message
      const userMessageLower = newMessage.toLowerCase();
      
      for (const [keyword, response] of Object.entries(faqs)) {
        if (userMessageLower.includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      // Special case for delivery area question
      if (userMessageLower.includes("deliver") && userMessageLower.includes("area")) {
        botResponse = "We deliver to most areas in the city. Please provide your pincode to check availability.";
      }
      
      // Special case for order by date
      if (userMessageLower.includes("by") && (userMessageLower.includes("date") || userMessageLower.includes("tomorrow") || userMessageLower.includes("today"))) {
        botResponse = "For urgent orders, we offer express delivery which can deliver within 24 hours. Would you like to know more?";
      }
      
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, sender: "bot" }]);
    }, 500);
    
    setNewMessage('');
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-all z-50"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-amber-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Ghar Ki Yaade</h3>
                <p className="text-xs text-amber-100">We typically reply in a few minutes</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-amber-100 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 bg-amber-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-amber-600 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-amber-200 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-amber-200 p-3 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-amber-200 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                type="submit"
                className="bg-amber-600 text-white p-2 rounded-r-lg hover:bg-amber-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Ask about delivery areas, order timing, or product information
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChat;