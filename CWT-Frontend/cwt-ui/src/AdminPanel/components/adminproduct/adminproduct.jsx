import React, { useState, useEffect } from "react";
import "./adminproduct.scss";

const AdminProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    stockQuantity: 0,
    minStockThreshold: 1,
    brand: "",
    weight: 0,
    dimensions: "",
    featuredImage: "",
    compareAtPrice: 0,
    categoryId: "",
    subCategoryId: "",
    tireWidth: "", // Optional field for tires
    aspectRatio: "", // Optional field for tires
    productType: "", 
    availability: "", 
    variants: [], 
    images: [], 
    tags: [], 
    isActive: true,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isTireCategory, setIsTireCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/category");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
    setProduct({
      ...product,
      categoryId: selectedCategoryId,
      subCategoryId: "",
    });
    setIsTireCategory(
      selectedCategory ? selectedCategory.name === "Tires" : false
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct({
      ...product,
      [name]: checked,
    });
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    const tagArray = value.split(",").map((tag) => tag.trim());
    setProduct({ ...product, tags: tagArray });
  };

  const handleAddVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        { title: "", price: 0, sku: "", quantity: 0 },
      ],
    });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...product.variants];
    newVariants[index][name] = value;
    setProduct({ ...product, variants: newVariants });
  };

  const handleAddImage = () => {
    setProduct({
      ...product,
      images: [...product.images, ""],
    });
  };

  const handleImageChange = (index, e) => {
    const { value } = e.target;
    const newImages = [...product.images];
    newImages[index] = value;
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(product);
    try {
      const response = await fetch("http://localhost:8800/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        console.log("Product successfully added");
        setProduct({
          name: "",
          description: "",
          price: 0,
          sku: "",
          stockQuantity: 0,
          minStockThreshold: 1,
          brand: "",
          weight: 0,
          dimensions: "",
          featuredImage: "",
          compareAtPrice: 0,
          categoryId: "",
          subCategoryId: "",
          tireWidth: "",
          aspectRatio: "",
          productType: "",
          availability: "",
          variants: [],
          images: [],
          tags: [],
          isActive: true,
        });
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addProduct">
      <div className="addProductContainer">
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="formGroup">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* SKU */}
          <div className="formGroup">
            <label htmlFor="sku">SKU</label>
            <input
              id="sku"
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              required
              placeholder="Enter SKU"
            />
          </div>

          {/* Price */}
          <div className="formGroup">
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </div>

          {/* Stock Quantity */}
          <div className="formGroup">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              id="stockQuantity"
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleChange}
              required
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Min Stock Threshold */}
          <div className="formGroup">
            <label htmlFor="minStockThreshold">Min Stock Threshold</label>
            <input
              id="minStockThreshold"
              type="number"
              name="minStockThreshold"
              value={product.minStockThreshold}
              onChange={handleChange}
              required
              placeholder="Enter minimum stock threshold"
            />
          </div>

          {/* Brand */}
          <div className="formGroup">
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
              placeholder="Enter brand"
            />
          </div>

          {/* Weight */}
          <div className="formGroup">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              required
              placeholder="Enter weight"
            />
          </div>

          {/* Dimensions */}
          <div className="formGroup">
            <label htmlFor="dimensions">Dimensions (cm)</label>
            <input
              id="dimensions"
              type="text"
              name="dimensions"
              value={product.dimensions}
              onChange={handleChange}
              required
              placeholder="Enter dimensions (L x W x H)"
            />
          </div>

          {/* Compare at Price */}
          <div className="formGroup">
            <label htmlFor="compareAtPrice">Compare At Price ($)</label>
            <input
              id="compareAtPrice"
              type="number"
              name="compareAtPrice"
              value={product.compareAtPrice}
              onChange={handleChange}
              placeholder="Optional: Enter compare at price"
            />
          </div>

          {/* Featured Image */}
          <div className="formGroup">
            <label htmlFor="featuredImage">Featured Image URL</label>
            <input
              id="featuredImage"
              type="text"
              name="featuredImage"
              value={product.featuredImage}
              onChange={handleChange}
              placeholder="Enter featured image URL"
            />
          </div>

          {/* Product Type */}
          <div className="formGroup">
            <label htmlFor="productType">Product Type</label>
            <input
              id="productType"
              type="text"
              name="productType"
              value={product.productType}
              onChange={handleChange}
              placeholder="Enter product type"
            />
          </div>

          {/* Availability */}
          <div className="formGroup">
            <label htmlFor="availability">Availability</label>
            <select
              name="availability"
              value={product.availability}
              onChange={handleChange}
              className="selectInput"
            >
              <option value="">Select Availability</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Tire Width (if category is "Tires") */}
          {isTireCategory && (
            <>
              <div className="formGroup">
                <label htmlFor="tireWidth">Tire Width</label>
                <input
                  id="tireWidth"
                  type="text"
                  name="tireWidth"
                  value={product.tireWidth}
                  onChange={handleChange}
                  placeholder="Enter tire width"
                />
              </div>

              <div className="formGroup">
                <label htmlFor="aspectRatio">Aspect Ratio</label>
                <input
                  id="aspectRatio"
                  type="text"
                  name="aspectRatio"
                  value={product.aspectRatio}
                  onChange={handleChange}
                  placeholder="Enter aspect ratio"
                />
              </div>
            </>
          )}

          {/* Category */}
          <div className="formGroup">
            <label htmlFor="categoryId">Category</label>
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleCategoryChange}
              required
              className="selectInput"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div className="formGroup">
            <label htmlFor="subCategoryId">Sub Category</label>
            <select
              name="subCategoryId"
              value={product.subCategoryId}
              onChange={handleChange}
              className="selectInput"
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Variants */}
          <div className="formGroup">
            <label>Variants</label>
            {product.variants.map((variant, index) => (
              <div key={index} className="variantGroup">
                <input
                  type="text"
                  name="title"
                  value={variant.title}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Variant Title"
                />
                <input
                  type="number"
                  name="price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Price"
                />
                <input
                  type="text"
                  name="sku"
                  value={variant.sku}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="SKU"
                />
                <input
                  type="number"
                  name="quantity"
                  value={variant.quantity}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Quantity"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddVariant}>
              Add Variant
            </button>
          </div>

          {/* Images */}
          <div className="formGroup">
            <label>Product Images</label>
            {product.images.map((image, index) => (
              <input
                key={index}
                type="text"
                name="image"
                value={image}
                onChange={(e) => handleImageChange(index, e)}
                placeholder="Image URL"
              />
            ))}
            <button type="button" onClick={handleAddImage}>
              Add Image
            </button>
          </div>

          {/* Tags */}
          <div className="formGroup">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={product.tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="Enter tags"
            />
          </div>

          {/* Is Active */}
          <div className="formGroup">
            <label htmlFor="isActive">Active</label>
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              checked={product.isActive}
              onChange={handleCheckboxChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductPage;
