import React, { useEffect, useState } from "react";
import "./product.scss";
import axios from "axios";
import ProductCard from "../productCard/productCard"; // Adjust the path if necessary

const ProductGrid = () => {
  const [categories, setCategories] = useState([]); // Initialize categories as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/category"); // Adjust API endpoint to fetch categories
        // console.log(response.data);
        if (response.data && response.data.categories) {
          // Defensive check for categories data
          setCategories(response.data.categories); // Assuming API returns { categories: [...] }
        } else {
          throw new Error("No categories found");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories: " + err.message); // Handle errors
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="title">Product Categories</div>
      <div className="product-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <ProductCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image} 
            />
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </>
  );
};

export default ProductGrid;
