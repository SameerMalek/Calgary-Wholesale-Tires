import React from "react";
import PropTypes from "prop-types";
import "./productCard.scss";
import {Link}  from "react-router-dom";

const ProductCard = ({ name,id, image }) => {
  return (
    <div className="product-card">
      <Link to={`/category/${id}/products`}>
        <img src={image} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
