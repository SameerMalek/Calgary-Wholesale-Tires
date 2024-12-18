import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './wishlist.scss';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext for user data

const Wishlist = () => {
  const { currentUser } = useContext(AuthContext); // Get current user from AuthContext
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(`/api/wishlist/user/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
        });
        setWishlistItems(response.data.wishlistItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist items:', err);
        setError('Error fetching wishlist items');
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchWishlistItems();
    } else {
      setError('Please log in to view your wishlist.');
      setLoading(false);
    }
  }, [currentUser]);

  const handleRemoveItem = async (wishlistId) => {
    try {
      await axios.delete(`/api/wishlist/${wishlistId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== wishlistId));
      alert('Item removed from wishlist successfully');
    } catch (error) {
      console.error('Error removing wishlist item:', error);
      alert('Error removing item from wishlist');
    }
  };

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (wishlistItems.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id} className="wishlist-item">
            <img src={item.product.featuredImage} alt={item.product.name} className="wishlist-image" />
            <div className="wishlist-details">
              <h2>{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p>Price: ${item.product.price}</p>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                Remove from Wishlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
