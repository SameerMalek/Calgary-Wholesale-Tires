import React, { useEffect, useState } from "react";
import "./filter.scss";
import { useLocation } from "react-router-dom";

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
  const [isFilterActive, setIsFilterActive] = useState(true);

  // Initial state for filters
  const initialFilters = {
    width: "",
    aspectRatio: "",
    rimSize: "",
    productType: "",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    // Regular expression to match /category/:categoryId/products
    const productPathRegex = /^\/category\/[^/]+\/products$/;

    if (productPathRegex.test(location.pathname)) {
      setIsFilterActive(false); // Hide filter bar for the products page with category
    } else {
      setIsFilterActive(true); // Show filter bar on other pages
    }
  }, [location.pathname]);

  // Handle change in select elements
  const handleSelectChange = (filterId, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  // Reset filters to initial state
  const handleReset = () => {
    setSelectedFilters(initialFilters);
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
      <button className="filter-button">SUBMIT</button>
      <button className="reset-button" onClick={handleReset}>
        RESET
      </button>
    </div>
  );
};

export default Filter;
