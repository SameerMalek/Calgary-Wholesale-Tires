import React from 'react';
import PropTypes from 'prop-types';
import './productCard.scss';

const ProductCard = ({ name, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
    </div>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
