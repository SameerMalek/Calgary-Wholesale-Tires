import React from 'react';
import DetailedCard from '../../components/detailedCard/DetailedCard';
import productData from '../../lib/brandProductsDetailed.json';
import './ProductPage.scss';

const ProductPage = () => {
  return (
    <div className="product-page">
      {/* The Navbar should only be included in the Layout, not here */}
      <div className="container">
        <div className="product-grid">
          {productData.slice(0, 4).map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description-title">DESCRIPTION</p>
                <p className="product-description">{product.description}</p>
                <p><strong>Diameter:</strong> {product.diameter}</p>
                <p><strong>Offset:</strong> {product.offset}</p>
                <p><strong>Width:</strong> {product.width}</p>
                <p><strong>Bolt Pattern:</strong> {product.boltPattern}</p>
                <p><strong>Center Bore:</strong> {product.centerBore}</p>
                <p><strong>Color:</strong> {product.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Removed Footer Section */}
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="logo">
            <img src="/assets/logo.png" alt="Logo" />
          </div>
          <div className="contacts">
            <h3>CONTACTS</h3>
            <p>2099 Walnut, Hill Ln Undefined Lafayette, California 53682</p>
            <p>+1 (250) 10 87 000</p>
            <p>Mon - Sat: 10am - 6pm<br />Sunday: 10am - 4pm</p>
          </div>
          <div className="services">
            <h3>SERVICES</h3>
            <p>About Company</p>
            <p>Payment</p>
            <p>Delivery</p>
            <p>Terms & Conditions</p>
            <p>Privacy</p>
          </div>
          <div className="socials">
            <h3>SOCIALS</h3>
            <p>
              <a href="#">Instagram</a><br />
              <a href="#">Facebook</a><br />
              <a href="#">Twitter</a>
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default ProductPage;




