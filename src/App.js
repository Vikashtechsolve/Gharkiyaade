import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Wholesale from './pages/Wholesale';
import Policy from './pages/Policy';
import ReturnPolicy from './pages/ReturnPolicy';
import ProductTracking from './pages/ProductTracking';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ErrorBoundary>
      <CartProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            backgroundColor: '#fff',
            color: '#92400e',
            border: '1px solid #fbbf24'
          }}
        />
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-amber-900 font-sans">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main className="relative">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products searchTerm={searchTerm} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/product-tracking" element={<ProductTracking />} />
              </Routes>
            </main>
            <LiveChat />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
