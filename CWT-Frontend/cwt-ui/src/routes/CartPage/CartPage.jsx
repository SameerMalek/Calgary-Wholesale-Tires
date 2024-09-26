import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.scss';

const CartPage = () => {
  const { cartItems, totalAmount, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="quantity">QUANTITY: {item.quantity}</p>
                  <p className="price">${item.price}</p>
                  <div className="quantity-controls">
                    <div className="quantity-buttons-container">
                      <button className="quantity-button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <button className="quantity-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <p className="cart-total">CART TOTAL: <span className="total-amount">${totalAmount.toFixed(2)}</span></p>
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms"><b>*TERMS AND CONDITIONS</b></label>
          </div>
          <div className="cart-options">
            <button className="back-button" onClick={handleBackClick}>BACK</button>
            <button className="checkout-button">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;