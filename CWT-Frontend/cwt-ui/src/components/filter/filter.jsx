import React, { useEffect, useState } from "react";
import "./filter.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const filters = [
  {
    id: "width",
    name: "Tire Width",
    options: [
      { value: "35", label: "35" },
      { value: "185", label: "185" },
      { value: "195", label: "195" },
      { value: "205", label: "205" },
      { value: "215", label: "215" },
      { value: "225", label: "225" },
      { value: "235", label: "235" },
      { value: "245", label: "245" },
      { value: "255", label: "255" },
    ],
  },
  {
    id: "aspectRatio",
    name: "Aspect Ratio",
    options: [
      { value: "35", label: "35" },
      { value: "40", label: "40" },
      { value: "45", label: "45" },
      { value: "50", label: "50" },
      { value: "55", label: "55" },
      { value: "60", label: "60" },
      { value: "65", label: "65" },
    ],
  },
  {
    id: "rimSize",
    name: "Rim Size",
    options: [
      { value: "15", label: "15" },
      { value: "16", label: "16" },
      { value: "17", label: "17" },
      { value: "18", label: "18" },
      { value: "19", label: "19" },
      { value: "20", label: "20" },
    ],
  },
  {
    id: "productType",
    name: "Product Type",
    options: [
      { value: "winterTires", label: "Winter Tires" },
      { value: "tirePackage", label: "Tire Package" },
    ],
  },
];

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFilterActive, setIsFilterActive] = useState(true);
  const initialFilters = {
    width: "",
    aspectRatio: "",
    rimSize: "",
    productType: "",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [allProducts, setAllProducts] = useState([]); // State to store all products

  useEffect(() => {
    const productPathRegex = /^\/category\/[^/]+\/products$/;
    if (productPathRegex.test(location.pathname)) {
      setIsFilterActive(false);
    } else {
      setIsFilterActive(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/filter");
        // console.log("API Response:", response.data);
  
        // Check if the data is an array or contains products in a 'products' key
        if (Array.isArray(response.data)) {
          setAllProducts(response.data); // If it's an array, use it directly
        } else if (response.data.products && Array.isArray(response.data.products)) {
          setAllProducts(response.data.products); // If it's an object with 'products' key, use that
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  

  const handleSelectChange = (filterId, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  const handleReset = () => {
    setSelectedFilters(initialFilters);
  };

  // Handle form submission to filter products
  const handleSubmit = async () => {
    const { width, aspectRatio, rimSize, productType } = selectedFilters;
  
    try {
      // Fetch products from the API
      const response = await axios.get("http://localhost:8800/api/filter");
      
      // Ensure you're handling the response properly
      const data = response.data; // Assign the response data
      // console.log("API Response:", data); // Log to verify structure
      
      // If the data contains the products inside an object, adjust this line:
      const allProducts = Array.isArray(data) ? data : data.products; // Use appropriate path if nested
  
      // Now filter the products based on the selected filters
      const filteredProducts = allProducts.filter((product) => {
        return (
          (!width || product.tireWidth === parseInt(width)) &&
          (!aspectRatio || product.aspectRatio === parseInt(aspectRatio)) &&
          (!rimSize || product.rimSize === parseInt(rimSize)) &&
          (!productType || product.productType === productType)
        );
      });
  
  
      // Navigate to the results page with the filtered products
      navigate(`/filter-products`, {
        state: { filteredProducts, allProducts },
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className={`filter-bar ${!isFilterActive ? "hidden" : ""}`}>
      <span className="filter-title">SEARCH BY VEHICLES</span>
      {filters.map((filter) => (
        <select
          key={filter.id}
          className="filter-select"
          value={selectedFilters[filter.id]}
          onChange={(e) => handleSelectChange(filter.id, e.target.value)}
        >
          <option value="" disabled>
            {filter.name}
          </option>
          {filter.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
      <button className="filter-button" onClick={handleSubmit}>
        SUBMIT
      </button>
      <button className="reset-button" onClick={handleReset}>
        RESET
      </button>
    </div>
  );
};

export default Filter;
