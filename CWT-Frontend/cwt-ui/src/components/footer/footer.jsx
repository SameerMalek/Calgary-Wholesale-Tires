import React from "react";
import "./footer.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/logo.png" alt="Logo" />
          <p>
            A large selection of quality products at a loyal price. Consult your
            manager if you need help with your selection. Using this site, you
            agree to the privacy policy and the terms of the public offer.
          </p>
        </div>
        <div className="footer-contacts">
          <h3>CONTACTS</h3>
          <p>111 42 Ave SW, Calgary, AB T2G 0A4</p>
          <p>+1 (403) 452 4283</p>
          <p>Mon - Sun: 09am - 07pm</p>
        </div>
        <div className="footer-services">
          <h3>SERVICES</h3>
          <ul>
            <li>
              <a href="/about">About Company</a>
            </li>
            <li>
              <a href="/">Payment</a>
            </li>
            <li>
              <a href="/">Delivery</a>
            </li>
            <li>
              <a href="/termscondition">Terms & Conditions</a>
            </li>
            <li>
              <a href="/">Privacy</a>
            </li>
            <li>
              <a href="/admin/admin-login">Admin Dashboard</a>
            </li>
          </ul>
        </div>
        <div className="footer-socials">
          <h3>SOCIALS</h3>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© CWT®. All rights reserved.</p>
        <div className="payment-methods">
          <i className="fab fa-cc-paypal"></i>
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-amex"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
