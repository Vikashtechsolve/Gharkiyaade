import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import { sendOrderConfirmationEmail, generateOrderConfirmationEmailContent } from '../services/emailService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        toast.info(`${item.name} quantity updated in cart!`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) } 
            : i
        );
      } else {
        toast.success(`${item.name} added to cart!`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      
      if (itemToRemove) {
        toast.error(`${itemToRemove.name} removed from cart!`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
      
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price.toString().replace('₹', '')) * item.quantity, 
      0
    );
  };

  const placeOrder = async (customerDetails) => {
    setIsProcessingOrder(true);
    
    try {
      // Create order with customer details and cart items
      const order = {
        ...customerDetails,
        items: [...cartItems],
        totalAmount: getTotalPrice(),
        orderDate: new Date().toISOString()
      };
      
      // In a real app, we would send this to a backend API
      console.log("Order placed:", order);
      
      // Send confirmation email
      const emailContent = generateOrderConfirmationEmailContent(order);
      const emailResult = await sendOrderConfirmationEmail(order);
      
      if (emailResult.success) {
        toast.success("Order confirmation email sent!", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
      
      // Set order details and confirmation
      setOrderDetails(order);
      setOrderConfirmed(true);
      
      // Clear the cart after order is placed
      clearCart();
      
      return order;
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("There was a problem processing your order. Please try again.", {
        position: "bottom-center",
        autoClose: 5000,
      });
      return null;
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const clearOrder = () => {
    setOrderConfirmed(false);
    setOrderDetails(null);
    setShowOrderForm(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        showOrderForm,
        setShowOrderForm,
        orderConfirmed,
        orderDetails,
        placeOrder,
        clearOrder,
        isProcessingOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
