import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../filtered-products/filterProductPage.scss";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal/loginModal";

const FilteredProductPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  // console.log("Location state:", location.state);
  const navigate = useNavigate();
  const { filteredProducts = [], allProducts = [] } = location.state || {};

  // Filter out the filteredProducts from allProducts
  const remainingProducts = allProducts.filter(
    (product) =>
      !filteredProducts.some((filtered) => filtered.id === product.id)
  );

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the detailed product page
  };

  return (
    <div className="filteredproduct-page">
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <div className="container">
        {/* Filtered Products Section */}
        <section className="filtered-section">
          <h2>Filtered Product(s)</h2>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-item"
                  onClick={(e) => {if(currentUser) {handleProductClick(product.id)} else{
                    e.preventDefault(); // Prevents navigation
                    setModalOpen(true);
                  }}}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.featuredImage || "placeholder.jpg"}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Price:</strong> ${product.price.toFixed(2)}
                    </p>
                    <p className="product-description">{product.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found with the selected filters.</p>
            )}
          </div>
        </section>

        {/* All Products Section */}
        {remainingProducts.length > 0 && (
          <section className="all-products-section">
            <h2>All Products</h2>
            <div className="product-grid">
              {remainingProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-item"
                  onClick={(e) => {if(currentUser) {handleProductClick(product.id)} else{
                    e.preventDefault(); // Prevents navigation
                    setModalOpen(true);
                  }}}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.featuredImage || "placeholder.jpg"}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Price:</strong> ${product.price.toFixed(2)}
                    </p>
                    <p className="product-description">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FilteredProductPage;
