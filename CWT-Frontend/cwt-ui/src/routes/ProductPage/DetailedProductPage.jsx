import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailedProductPage.scss";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const DetailedProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/product/${id}`
        );
        setProduct(response.data.product);
        setSelectedVariant(response.data.product?.variants?.[0] || null);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      featuredImage: selectedVariant?.image || product?.featuredImage,
      price: selectedVariant?.price || product?.price,
      selectedVariant,
      quantity: 1,
    });
    navigate("/cart");
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="detailed-product-page">
      <div className="container">
        <div className="product-detail">
          {/* Product Image */}
          <img
            src={selectedVariant?.image || product?.featuredImage || "default-image.jpg"}
            alt={selectedVariant?.title || product?.name || "Product Image"}
            className="product-image"
          />

          {/* Product Info */}
          <div className="product-info">
            <h2 className="product-name">{product?.name || selectedVariant?.title}</h2>

            {/* Product Price */}
            <div className="product-price">
              <h3>Price: ${selectedVariant?.price || product?.price}</h3>
              {product?.compareAtPrice && (
                <p className="compare-price">
                  Was: <span>${selectedVariant?.compareAtPrice || product?.compareAtPrice}</span>
                </p>
              )}
            </div>

            {/* Description and Specifications */}
            <div className="description-specifications">
              {/* Description Section */}
              <div className="section description">
                <h3>Description</h3>
                <p>{product?.description || "No description available for this product."}</p>
              </div>

              {/* Specifications Section */}
              <div className="section specifications">
                <h3>Specifications</h3>
                <div className="specifications">
                  <div className="spec">
                    <span>Brand:</span>
                    <p>{product?.brand || "N/A"}</p>
                  </div>
                  <div className="spec">
                    <span>SKU:</span>
                    <p>{selectedVariant?.sku || product?.sku || "N/A"}</p>
                  </div>
                  <div className="spec">
                    <span>Tire Width:</span>
                    <p>{product?.tireWidth || "N/A"} mm</p>
                  </div>
                  <div className="spec">
                    <span>Aspect Ratio:</span>
                    <p>{product?.aspectRatio || "N/A"}</p>
                  </div>
                  <div className="spec">
                    <span>Rim Size:</span>
                    <p>{product?.rimSize || "N/A"} inches</p>
                  </div>
                  <div className="spec">
                    <span>Weight:</span>
                    <p>{product?.weight || "N/A"} kg</p>
                  </div>
                  <div className="spec">
                    <span>Dimensions:</span>
                    <p>
                      {product?.dimensions?.length || "N/A"} x{" "}
                      {product?.dimensions?.width || "N/A"} x{" "}
                      {product?.dimensions?.height || "N/A"} inches
                    </p>
                  </div>
                  <div className="spec">
                    <span>Availability:</span>
                    <p>{selectedVariant?.availability || product?.availability || "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Variants */}
            <div className="product-variants">
              <h3>Available Variants</h3>
              <ul>
                {product?.variants?.length > 0 ? (
                  product.variants.map((variant) => (
                    <li
                      key={variant.id}
                      className={variant.id === selectedVariant?.id ? "active-variant" : ""}
                      onClick={() => handleVariantClick(variant)}
                    >
                      {variant.title} - ${variant.price}
                    </li>
                  ))
                ) : (
                  <li>No variants available</li>
                )}
              </ul>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;
