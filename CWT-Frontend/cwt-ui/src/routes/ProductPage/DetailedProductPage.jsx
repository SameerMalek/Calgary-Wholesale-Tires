import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailedProductPage.scss";
import { CartContext } from "../../context/CartContext";

const DetailedProductPage = () => {
  const { id } = useParams(); // Get product id from the route
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate
  const [product, setProduct] = useState(null); // Product state
  const [selectedVariant, setSelectedVariant] = useState(null); // State for selected variant
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/product/${id}`
        ); // Adjust API URL as needed
        setProduct(response.data.product); // Set the product data
        setSelectedVariant(response.data.product?.variants?.[0] || null); // Default to first variant if available
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProduct(); // Call the function to fetch product details
  }, [id]);

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      featuredImage: selectedVariant?.image || product?.featuredImage,
      price: selectedVariant?.price || product?.price,
      selectedVariant,
      quantity: 1,
    });

    console.log(`${selectedVariant?.title || product?.name} added to cart`);
    navigate("/cart"); // Redirect to cart page after adding item to cart
  };

  // Function to handle adding product to wishlist
  const handleAddToWishlist = async () => {
    try {
      // Send only the product ID since user ID will be derived from the JWT in the backend
      await axios.post("/api/wishlist", {
        product_id: product.id,
      });
      console.log(`${selectedVariant?.title || product?.name} added to wishlist`);
      alert('Product added to wishlist!');
    } catch (err) {
      console.error("Error adding item to wishlist:", err);
      alert('Error adding product to wishlist');
    }
  };

  // Function to handle variant selection
  const handleVariantClick = (variant) => {
    setSelectedVariant(variant); // Update selected variant
  };

  // Display loading message while fetching data
  if (loading) {
    return <div>Loading product details...</div>;
  }

  // Display error message if there was an issue fetching data
  if (error) {
    return <div>{error}</div>;
  }

  // Display if the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="detailed-product-page">
      <div className="container">
        <div className="product-detail">
          <img
            src={
              selectedVariant?.image ||
              product?.featuredImage ||
              "default-image.jpg"
            }
            alt={selectedVariant?.title || product?.name || "Product Image"}
            className="product-image"
          />
          <div className="product-info">
            <h2 className="product-name">
              {product?.name || selectedVariant?.title}
            </h2>
            <p className="product-description-title">DESCRIPTION</p>
            <p className="product-description">
              {product?.description || "No description available"}
            </p>
            <p>
              <strong>Brand:</strong> {product?.brand || "N/A"}
            </p>
            <p>
              <strong>SKU:</strong>{" "}
              {selectedVariant?.sku || product?.sku || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${selectedVariant?.price || product?.price}
            </p>
            {product?.compareAtPrice && (
              <p>
                <strong>Was:</strong> ${selectedVariant?.compareAtPrice || product.compareAtPrice}
              </p>
            )}
            <p>
              <strong>Availability:</strong> {selectedVariant?.availability || product?.availability || "Unknown"}
            </p>

            <h3>Specifications</h3>
            <p>
              <strong>Tire Width:</strong> {product?.tireWidth || "N/A"} mm
            </p>
            <p>
              <strong>Aspect Ratio:</strong> {product?.aspectRatio || "N/A"}
            </p>
            <p>
              <strong>Rim Size:</strong> {product?.rimSize || "N/A"} inches
            </p>
            <p>
              <strong>Weight:</strong> {product?.weight || "N/A"} kg
            </p>
            <p>
              <strong>Dimensions:</strong>{" "}
              {product?.dimensions?.length || "N/A"} x{" "}
              {product?.dimensions?.width || "N/A"} x{" "}
              {product?.dimensions?.height || "N/A"} inches
            </p>
            <div className="product-variants">
              <h3>Available Variants</h3>
              <ul>
                {product?.variants?.length > 0 ? (
                  product.variants.map((variant) => (
                    <li
                      key={variant.id}
                      className={
                        variant.id === selectedVariant?.id
                          ? "active-variant"
                          : ""
                      }
                      onClick={() => handleVariantClick(variant)}
                      style={{
                        cursor: "pointer",
                        fontWeight:
                          variant.id === selectedVariant?.id
                            ? "bold"
                            : "normal",
                      }}
                    >
                      {variant.title} - ${variant.price}
                    </li>
                  ))
                ) : (
                  <li>No variants available</li>
                )}
              </ul>

              {/* Add to Cart Button */}
              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                style={{ cursor: "pointer" }}
              >
                Add to Cart
              </button>

              {/* Add to Wishlist Button */}
              <button
                className="add-to-wishlist-button"
                onClick={handleAddToWishlist}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;
