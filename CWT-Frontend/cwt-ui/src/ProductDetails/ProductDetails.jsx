import React from 'react';
import { useParams } from 'react-router-dom';
import productData from '../../lib/brandProductsDetailed.json';
import './ProductDetails.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const product = productData.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="product-item">
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
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating} stars</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
