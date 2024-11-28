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
    setTotalAmount(Number(total.toFixed(2)));
  };

  // Calculate total and update localStorage whenever cart items change
  useEffect(() => {
    calculateTotal(cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load cart data from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (Array.isArray(storedCartItems)) {
        setCartItems(storedCartItems);
      }
    } catch (error) {
      console.error('Error parsing cartItems from localStorage:', error);
    }
  }, []);

  // Fetch cart items from backend when user logs in
  useEffect(() => {
    const fetchCartItems = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`https://calgary-wholesale-tires.onrender.com/api/user/${currentUser.id}/cart`);
          const data = await response.json();
          
          // Merge backend cart with local cart
          const mergedCartItems = mergeCartItems(cartItems, data.cartItems);
          setCartItems(mergedCartItems);
        } catch (error) {
          console.error("Failed to fetch cart items from backend:", error);
        }
      }
    };

    fetchCartItems();
  }, [currentUser]);

  // Merge local and backend cart items
  const mergeCartItems = (localItems, backendItems) => {
    const mergedItems = [...localItems];

    backendItems.forEach(backendItem => {
      const existingItemIndex = mergedItems.findIndex(
        item => item.product.id === backendItem.product.id && 
                item.product.selectedVariant?.id === backendItem.product.selectedVariant?.id
      );

      if (existingItemIndex === -1) {
        mergedItems.push(backendItem);
      } else {
        // If item exists, update quantity
        mergedItems[existingItemIndex].quantity += backendItem.quantity;
      }
    });

    return mergedItems;
  };

  // Add to cart function with improved backend sync
  const addToCart = async (product) => {
    try {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === product.id && 
                  item.product.selectedVariant?.id === product.selectedVariant?.id
      );

      const updatedItems = [...cartItems];
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + product.quantity
        };
      } else {
        // Add new item
        updatedItems.push({ 
          product, 
          quantity: product.quantity,
          id: Date.now() // Add a unique identifier
        });
      }

      // Immediately update local state
      setCartItems(updatedItems);

      // Sync with backend if user is logged in
      if (currentUser) {
        await fetch('https://calgary-wholesale-tires.onrender.com/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: currentUser.id,
            product_id: product.id,
            quantity: product.quantity,
            variant_id: product.selectedVariant?.id
          }),
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove product from cart
  const removeFromCart = async (id) => {
    try {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);

      // Sync with backend if user is logged in
      if (currentUser) {
        await fetch(`https://calgary-wholesale-tires.onrender.com/api/cart/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Update product quantity in cart
  const updateQuantity = async (id, variantId, newQuantity) => {
    try {
      const updatedItems = cartItems.map((item) => {
        if (item.product.id === id && (!variantId || item.product.selectedVariant?.id === variantId)) {
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });

      // Immediately update local state
      setCartItems(updatedItems);

      // Sync with backend if user is logged in
      if (currentUser) {
        const itemToUpdate = updatedItems.find(
          item => item.product.id === id && (!variantId || item.product.selectedVariant?.id === variantId)
        );

        if (itemToUpdate) {
          await fetch('https://calgary-wholesale-tires.onrender.com/api/cart/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: currentUser.id,
              product_id: id,
              quantity: itemToUpdate.quantity,
              variant_id: variantId
            }),
          });
        }
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      totalAmount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;