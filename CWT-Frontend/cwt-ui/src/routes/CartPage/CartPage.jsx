import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import TermsAndConditionsModal from "../../components/termsandconditionmodal/TermsAndConditionsModal";
import "./CartPage.scss";
import OrderHistory from "../../components/orderhistory/orderhistory.jsx";

const stripePromise = loadStripe(
  "pk_test_51QCPgyI59y4OZCeY8ClSbS7YB3M1Crp6nRDbEcR9T9eoAW312Gy8uqXNWE4Ob5bI3MnN84SPxFUnKYftkoqP3Avw00Pp2oHaCc"
);

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateQuantity,
    removeFromCart,
    setCartItems,
  } = useContext(CartContext); // Use cart items and total amount from CartContext
  const { currentUser } = useContext(AuthContext); // Get current user from AuthContext
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  console.log("Cart items:", cartItems);
  
  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, [setCartItems]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!isTermsAccepted) {
      alert("Please accept the Terms and Conditions before proceeding.");
      return;
    }

    if (!currentUser) {
      alert("You must be logged in to complete the purchase.");
      return;
    }

    const userId = currentUser.id; // Use user ID from AuthContext
    console.log("Current User ID:", userId); // Debugging: Log user ID

    // Get the user's address from the currentUser object
    const address = currentUser.address; // Adjust according to your data structure
    const shippingAddress = address;
    const billingAddress = address;

    console.log("Shipping Address:", shippingAddress); // Debugging: Log shipping address
    console.log("Billing Address:", billingAddress); // Debugging: Log billing address

    if (paymentMethod === "stripe") {
      const stripe = await stripePromise;
      try {
        console.log("Sending data to backend for Stripe Checkout...");
        const response = await fetch(
          "http://localhost:8800/api/stripe/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: cartItems.map((item) => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
              })),
              user_id: userId,
              shipping_address: shippingAddress,
              billing_address: billingAddress,
              total_amount: totalAmount,
            }),
          }
        );

        const session = await response.json();

        // Log the response from the server
        console.log("Stripe Session Response:", session);

        // Check if the session ID exists in the response
        if (!session.id) {
          console.error("No session ID received from the backend");
          return;
        }

        if (session.id) {
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) {
            console.error("Stripe redirect error:", result.error.message);
          }
        }
      } catch (error) {
        console.error("Error during Stripe checkout:", error);
      }
    } else if (paymentMethod === "cod") {
      // Create the order on backend even for COD
      try {
        const response = await fetch("http://localhost:8800/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              productId: item.product.id,
              quantity: item.product.quantity,
              price: item.product.price,
            })),
            total_amount: totalAmount,
            user_id: userId,
            shipping_address: shippingAddress,
            billing_address: billingAddress,
          }),
        });

        const order = await response.json();
        console.log("Order created:", order); // Debugging: Log the created order response
        navigate(`/payment-status?status=cod&orderId=${order.id}`);
      } catch (error) {
        console.error("Error creating order:", error); // Debugging: Catch any error creating the order
      }
    }
  };

  const handleRemoveFromCart = async (id) => {
    console.log("Removing item with cartId:", id);
    try {
      const response = await fetch(`http://localhost:8800/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Check if the item was removed from the backend
        console.log("Item removed from backend successfully");
  
        // Directly update the cartItems state to remove the item
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  
        // Update CartContext by calling removeFromCart (if necessary)
        removeFromCart(id);
        window.location.reload(); 
      } else {
        console.error("Failed to remove item from cart in the database");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
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
            cartItems
              .filter((item) => item && item.product.id)
              .map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.product?.featuredImage}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="variant">
                      Variant: {item.selectedVariant?.title}
                    </p>
                    <p className="quantity">QUANTITY: {item.quantity}</p>
                    <p className="price">${item.product.price}</p>

                    <div className="quantity-controls">
                      <div className="quantity-buttons-container">
                        <button
                          className="quantity-button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.product.selectedVariant?.id,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.product.selectedVariant?.id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
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
            CART TOTAL:{" "}
            <span className="total-amount">${totalAmount.toFixed(2)}</span>
          </p>

          {/* Payment Method Selection */}
          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="payment-method"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              Pay with Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery (COD)
            </label>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={isTermsAccepted}
              onChange={() => setIsTermsAccepted(!isTermsAccepted)}
            />
            <label htmlFor="terms">
              <b>*TERMS AND CONDITIONS</b>
            </label>
            <span className="terms-link" onClick={() => setIsModalOpen(true)}>
              (Read Terms and Conditions)
            </span>
          </div>

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
      <TermsAndConditionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <OrderHistory />
    </div>
  );
};

export default CartPage;
