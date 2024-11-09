import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Helper function to calculate total cart amount
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalAmount(total);
  };
  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);  

  // Load cart data from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      console.log('Retrieved cartItems from localStorage on initial load:', storedCartItems); // Debug log

      if (Array.isArray(storedCartItems)) {
        setCartItems(storedCartItems);
        calculateTotal(storedCartItems);
      }
    } catch (error) {
      console.error('Error parsing cartItems from localStorage:', error);
    }
  }, []);

  // Save cart data to localStorage whenever cartItems change
  useEffect(() => {
    // Fetch cart items from backend on initial load if user is logged in
    const fetchCartItems = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`http://localhost:8800/api/user/${currentUser.id}/cart`);
          console.log(response);
          const data = await response.json();
          setCartItems(data.cartItems);
        } catch (error) {
          console.error("Failed to fetch cart items from backend:", error);
        }
      }
    };
    fetchCartItems();
  }, [currentUser]);


  // Add to cart function, with backend sync
  const addToCart = async (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.product.selectedVariant?.id === product.selectedVariant?.id
    );
  
    const updatedItems = [...cartItems];
    if (existingItemIndex >= 0) {
      updatedItems[existingItemIndex].quantity += product.quantity;
    } else {
      updatedItems.push({ product, quantity: product.quantity });
    }
    setCartItems(updatedItems);
  
    if (currentUser) {
      try {
        await fetch('http://localhost:8800/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: currentUser.id,
            product_id: product.id,
            quantity: product.quantity,
          }),
        });
      } catch (error) {
        console.error("Error adding item to backend cart:", error);
      }
    }
  };

  // Remove product from cart
  const removeFromCart = (id, variantId) => {
    const updatedItems = cartItems.filter(
      (item) => !(item.product.id === id && (!variantId || item.product.selectedVariant?.id === variantId))
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save to localStorage
  };
  

  // Update product quantity in cart
  const updateQuantity = (id, variantId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === id && (!variantId || item.product.selectedVariant?.id === variantId)) {
            return { ...item, quantity: Math.max(1, newQuantity) }; // Ensure quantity is at least 1
          }
          return item;
        })
    );
  };
  

  return (
    <CartContext.Provider value={{ cartItems, setCartItems,addToCart, removeFromCart, updateQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
