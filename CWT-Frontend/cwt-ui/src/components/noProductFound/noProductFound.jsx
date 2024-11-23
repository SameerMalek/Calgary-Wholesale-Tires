import React from "react";
import PropTypes from "prop-types";
import "./noProductFound.scss";

const NoProductsFound = ({ onClearFilters }) => {
  return (
    <div className="no-products-found">
      <img
        src="/assets/no-product-found.png"
        alt="No products found"
        className="no-products-image"
      />
      {/* <h2 className="no-products-title">No Products Found</h2> */}
      <p className="no-products-message">
        We couldn't find any products matching your filters. Try adjusting your filters or explore all products.
      </p>
      <button className="clear-filters-button" onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

NoProductsFound.propTypes = {
  onClearFilters: PropTypes.func.isRequired,
};

export default NoProductsFound;
