import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentStatusPage.scss';

const PaymentStatusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  return (
    <div className="payment-status-page">
      <div className={`payment-status-container ${status}`}>
        {status === 'success' ? (
          <div className="success">
            <h1>Payment Successful!</h1>
            <p>Your payment has been processed successfully. Thank you for your purchase!</p>
            <button className="home-button" onClick={() => navigate('/')}>
              Go to Home
            </button>
          </div>
        ) : status === 'cod' ? (
          <div className="cod">
            <h1>Order Confirmed for Cash on Delivery!</h1>
            <p>Your order has been placed successfully. You can pay at the time of delivery. Thank you for choosing COD!</p>
            <button className="home-button" onClick={() => navigate('/')}>
              Go to Home
            </button>
          </div>
        ) : (
          <div className="failure">
            <h1>Payment Failed</h1>
            <p>Unfortunately, your payment could not be processed. Please try again later or use a different payment method.</p>
            <button className="home-button" onClick={() => navigate('/')}>
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusPage;
