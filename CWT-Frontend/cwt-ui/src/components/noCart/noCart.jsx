import React from "react";
import PropTypes from "prop-types";
import "./noCart.scss";

const NoCart = ({ onClearFilters }) => {
  return (
    <div className="no-products-found">
      <img
        src="/assets/11329060.png"
        alt="No products found"
        className="no-products-image"
      />
      {/* <h2 className="no-products-title">No Products Found</h2> */}
      <p className="no-products-message">
      Your cart is empty!
      </p>
    </div>
  );
};

NoCart.propTypes = {
  onClearFilters: PropTypes.func.isRequired,
};

export default NoCart;
