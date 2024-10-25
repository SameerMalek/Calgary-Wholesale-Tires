import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import TermsAndConditionsModal from '../../components/termsandconditionmodal/TermsAndConditionsModal';
import "./CartPage.scss";


const stripePromise = loadStripe("pk_test_51QCPgyI59y4OZCeY8ClSbS7YB3M1Crp6nRDbEcR9T9eoAW312Gy8uqXNWE4Ob5bI3MnN84SPxFUnKYftkoqP3Avw00Pp2oHaCc");

const CartPage = () => {
  const { cartItems, totalAmount, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    console.log("Stripe instance:", stripe); 

    try {
      const response = await fetch("http://localhost:8800/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const session = await response.json();
      console.log("Stripe Session ID:", session.id); 

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
      }
    } catch (error) {
      console.error("Error during Stripe checkout:", error);
    }
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
                <img src={item?.featuredImage} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="quantity">QUANTITY: {item.quantity}</p>
                  <p className="price">${item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <div className="quantity-buttons-container">
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.selectedVariant.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.selectedVariant.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.selectedVariant.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <p className="cart-total">
            CART TOTAL: <span className="total-amount">${totalAmount.toFixed(2)}</span>
          </p>
          <div className="cart-options">
            <button className="back-button" onClick={() => navigate(-1)}>
              BACK
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <TermsAndConditionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CartPage;
