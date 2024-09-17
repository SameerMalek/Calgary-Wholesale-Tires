import React from 'react';
import { useParams } from 'react-router-dom';
import productData from '../../lib/brandProductsDetailed.json';
import './DetailedProductPage.scss';

const DetailedProductPage = () => {
  const { id } = useParams();
  const product = productData.find((item) => item.id === id);

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
            <div className="product-rating">
              {Array.from({ length: product.rating }, (_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;
