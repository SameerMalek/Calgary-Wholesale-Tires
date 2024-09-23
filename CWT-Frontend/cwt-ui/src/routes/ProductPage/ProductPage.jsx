import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import productData from "../../lib/brandProductsDetailed.json";
import "./ProductPage.scss";

const filters = [
  {
    id: "width",
    name: "Tire Width",
    options: [
      { value: "35", label: "35", checked: false },
      { value: "185", label: "185", checked: false },
      { value: "195", label: "195", checked: false },
      { value: "205", label: "205", checked: false },
      { value: "215", label: "215", checked: false },
      { value: "225", label: "225", checked: false },
      { value: "235", label: "235", checked: false },
      { value: "245", label: "245", checked: false },
      { value: "255", label: "255", checked: false },
    ],
  },
  {
    id: "aspectRatio",
    name: "Aspect Ratio",
    options: [
      { value: "35", label: "35", checked: false },
      { value: "40", label: "40", checked: false },
      { value: "45", label: "45", checked: false },
      { value: "50", label: "50", checked: false },
      { value: "55", label: "55", checked: false },
      { value: "60", label: "60", checked: false },
      { value: "65", label: "65", checked: false },
    ],
  },
  {
    id: "rimSize",
    name: "Rim Size",
    options: [
      { value: "15", label: "15", checked: false },
      { value: "16", label: "16", checked: false },
      { value: "17", label: "17", checked: false },
      { value: "18", label: "18", checked: false },
      { value: "19", label: "19", checked: false },
      { value: "20", label: "20", checked: false },
    ],
  },
  {
    id: "productType",
    name: "Product Type",
    options: [
      { value: "winterTires", label: "Winter Tires", checked: false },
      { value: "tirePackage", label: "Tire Package", checked: false },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "habilead", label: "Habilead", checked: false },
      { value: "austone", label: "Austone", checked: false },
      { value: "haida", label: "Haida", checked: false },
      { value: "lanvigator", label: "Lanvigator", checked: false },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      { value: "onSale", label: "On sale", checked: false },
      { value: "new", label: "New", checked: false },
    ],
  },
];

const ProductPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    width: [],
    aspectRatio: [],
    rimSize: [],
    productType: [],
    brand: [],
    availability: [],
  });

  const handleFilterChange = (filterId, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: prevFilters[filterId].includes(value)
        ? prevFilters[filterId].filter((item) => item !== value)
        : [...prevFilters[filterId], value],
    }));
  };

  const filteredProducts = productData.filter((product) => {
    const widthMatch =
      selectedFilters.width.length === 0 ||
      selectedFilters.width.includes(product.width.toString());
    const aspectRatioMatch =
      selectedFilters.aspectRatio.length === 0 ||
      selectedFilters.aspectRatio.includes(product.aspectRatio.toString());
    const rimSizeMatch =
      selectedFilters.rimSize.length === 0 ||
      selectedFilters.rimSize.includes(product.rimSize.toString());
    const productTypeMatch =
      selectedFilters.productType.length === 0 ||
      selectedFilters.productType.includes(product.type.toLowerCase());
    const brandMatch =
      selectedFilters.brand.length === 0 ||
      selectedFilters.brand.includes(product.brand.toLowerCase());
    const availabilityMatch =
      selectedFilters.availability.length === 0 ||
      selectedFilters.availability.includes(product.availability.toLowerCase());

    return (
      widthMatch &&
      aspectRatioMatch &&
      rimSizeMatch &&
      productTypeMatch &&
      brandMatch &&
      availabilityMatch
    );
  });

  return (
    <div className="product-page">
      <div className="container">
        {/* Sidebar Filters */}
        <aside className="filter-section">
          <form>
            {filters.map((section) => (
              <Disclosure as="div" key={section.id} className="filter-group">
                {({ open }) => (
                  <>
                    <DisclosureButton className="disclosure-button">
                      <span className="filter-title">{section.name}</span>
                      <span className="toggle-icon">
                        {open ? (
                          <MinusIcon className="icon" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="icon" aria-hidden="true" />
                        )}
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel className="filter-panel">
                      <div className="space-y-4">
                        {section.options.map((option, idx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${idx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              checked={selectedFilters[section.id].includes(option.value)}
                              onChange={() => handleFilterChange(section.id, option.value)}
                              className="checkbox"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${idx}`}
                              className="label"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </form>
        </aside>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description-title">DESCRIPTION</p>
                    <p className="product-description">{product.description}</p>
                    <p>
                      <strong>Diameter(in'):</strong> {product.diameter}
                    </p>
                    <p>
                      <strong>Offset:</strong> {product.offset}
                    </p>
                    <p>
                      <strong>Width(in'):</strong> {product.width}
                    </p>
                    <p>
                      <strong>Bolt Pattern:</strong> {product.boltPattern}
                    </p>
                    <p>
                      <strong>Center Bore:</strong> {product.centerBore}
                    </p>
                    <p>
                      <strong>Color:</strong> {product.color}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found with selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
