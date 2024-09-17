import React from 'react';
import { useNavigate } from 'react-router-dom';
import productData from '../../lib/brandProductsDetailed.json';
import './ProductPage.scss';

const ProductPage = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-grid">
          {productData.map((product) => (
            <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
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
    </div>
  );
};

export default ProductPage;




