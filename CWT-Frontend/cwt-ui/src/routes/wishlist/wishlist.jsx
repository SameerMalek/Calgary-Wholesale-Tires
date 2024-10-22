import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 'user-id-from-auth'; // Replace with actual authenticated user ID

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch(`/api/wishlist/${userId}`);
        const data = await response.json();
        setWishlistItems(data.wishlistItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [userId]);

  const handleRemoveItem = async (wishlistId) => {
    try {
      await fetch(`/api/wishlist/${wishlistId}`, {
        method: 'DELETE',
      });
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (wishlistItems.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div>
      <h1>Your Wishlist</h1>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id}>
            <h2>{item.product.name}</h2>
            <p>{item.product.description}</p>
            <p>Price: ${item.product.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove from Wishlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
