import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import productData from '../../lib/brandProductsDetailed.json';
import './DetailedProductPage.scss';
import { CartContext } from '../../context/CartContext';

const DetailedProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate
  const product = productData.find((item) => item.id === id);
  const [rating, setRating] = useState(0); 

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    console.log(`${product.name} added to cart`);
    navigate('/cart'); // Redirect to cart page after adding item to cart
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="detailed-product-page">
      <div className="container">
        <div className="product-detail">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description-title">DESCRIPTION</p>
            <p className="product-description">{product.description}</p>
            <p><strong>Diameter:</strong> {product.diameter}</p>
            <p><strong>Offset:</strong> {product.offset}</p>
            <p><strong>Width:</strong> {product.width}</p>
            <p><strong>Bolt Pattern:</strong> {product.boltPattern}</p>
            <p><strong>Center Bore:</strong> {product.centerBore}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p className="product-price"><strong>Price:</strong> ${product.price}</p>

            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              style={{ cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;


