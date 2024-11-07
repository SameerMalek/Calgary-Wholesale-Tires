import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Helper function to calculate total cart amount
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  // Add product to cart or update quantity if variant exists
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedVariant &&
          item.selectedVariant.id === product.selectedVariant?.id
      );

      if (existingItemIndex >= 0) {
        // If product with the same variant already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        calculateTotal(updatedItems);
        return updatedItems;
      } else {
        // Add new variant/product to cart
        const updatedItems = [...prevItems, product];
        calculateTotal(updatedItems);
        return updatedItems;
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (id, variantId) => {
    const updatedItems = cartItems.filter(
      (item) => !(item.id === id && item.selectedVariant?.id === variantId)
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // Update product quantity in cart
  const updateQuantity = (id, variantId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.id === id && item.selectedVariant?.id === variantId) {
            return { ...item, quantity: Math.max(0, newQuantity) }; // Prevent negative quantities
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Automatically remove items with 0 quantity

      calculateTotal(updatedItems);
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
