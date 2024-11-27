import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailedProductPage.scss";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext"; // Ensure AuthContext is imported if token is stored there

const DetailedProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext); // Get currentUser for token access
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://calgary-wholesale-tires.onrender.com/api/product/${id}`
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


  const handleAddToWishlist = async () => {
    try {
        // Function to get the token from cookies
        const getTokenFromCookies = () => {
            // console.log("All cookies:", document.cookie); // Log all cookies for debugging
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find(row => row.startsWith("token="));
            return tokenCookie ? tokenCookie.split("=")[1] : null;
        };

        const token = getTokenFromCookies();
        
        if (!token) {
            console.error("Token is missing or invalid.");
            alert("You need to log in to add items to your wishlist.");
            return;
        }

        const response = await axios.post(
          "https://calgary-wholesale-tires.onrender.com/api/wishlist",
          { product_id: product.id },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              withCredentials: true // Enable cookies for cross-origin requests
          }
      );
        alert("Item added to wishlist!");
    } catch (error) {
        console.error("Error adding item to wishlist:", error.response || error);

        if (error.response?.status === 403) {
            alert("Session expired or invalid token. Please log in again.");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear token cookie
        } else {
            alert("Failed to add item to wishlist. Please try again.");
        }
    }
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
          <img
            src={selectedVariant?.image || product?.featuredImage || "default-image.jpg"}
            alt={selectedVariant?.title || product?.name || "Product Image"}
            className="product-image"
          />
          <div className="product-info">
            <h2 className="product-name">{product?.name || selectedVariant?.title}</h2>
            <p className="product-description-title">DESCRIPTION</p>
            <p className="product-description">{product?.description || "No description available"}</p>
            <p><strong>Brand:</strong> {product?.brand || "N/A"}</p>
            <p><strong>SKU:</strong> {selectedVariant?.sku || product?.sku || "N/A"}</p>
            <p><strong>Price:</strong> ${selectedVariant?.price || product?.price}</p>
            {product?.compareAtPrice && (
              <p><strong>Was:</strong> ${selectedVariant?.compareAtPrice || product.compareAtPrice}</p>
            )}
            <p><strong>Availability:</strong> {selectedVariant?.availability || product?.availability || "Unknown"}</p>

            <h3>Specifications</h3>
            <p><strong>Tire Width:</strong> {product?.tireWidth || "N/A"} mm</p>
            <p><strong>Aspect Ratio:</strong> {product?.aspectRatio || "N/A"}</p>
            <p><strong>Rim Size:</strong> {product?.rimSize || "N/A"} inches</p>
            <p><strong>Weight:</strong> {product?.weight || "N/A"} kg</p>
            <p><strong>Dimensions:</strong> {product?.dimensions?.length || "N/A"} x {product?.dimensions?.width || "N/A"} x {product?.dimensions?.height || "N/A"} inches</p>
            <div className="product-variants">
              <h3>Available Variants</h3>
              <ul>
                {product?.variants?.length > 0 ? (
                  product.variants.map((variant) => (
                    <li
                      key={variant.id}
                      className={variant.id === selectedVariant?.id ? "active-variant" : ""}
                      onClick={() => handleVariantClick(variant)}
                      style={{
                        cursor: "pointer",
                        fontWeight: variant.id === selectedVariant?.id ? "bold" : "normal",
                      }}
                    >
                      {variant.title} - ${variant.price}
                    </li>
                  ))
                ) : (
                  <li>No variants available</li>
                )}
              </ul>

              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>

              {/* <button
                className="add-to-wishlist-button"
                onClick={handleAddToWishlist}
                style={{ marginLeft: "10px" }}
              >
                Add to Wishlist
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;
