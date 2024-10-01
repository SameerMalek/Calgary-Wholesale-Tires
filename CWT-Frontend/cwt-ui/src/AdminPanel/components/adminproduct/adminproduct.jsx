import React, { useState } from "react";
import "./adminproduct.scss";

const AdminProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    stockQuantity: 0,
    brand: "",
    weight: 0,
    dimensions: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product submitted: ", product);
  };

  return (
    <div className="addProduct">
      <div className="addProductContainer">
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="formGroupRow">
            <div className="formGroup">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formGroupRow">
            <div className="formGroup">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formGroupRow">
            <div className="formGroup">
              <label>Weight</label>
              <input
                type="number"
                name="weight"
                value={product.weight}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label>Dimensions</label>
              <input
                type="text"
                name="dimensions"
                value={product.dimensions}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formGroup">
            <label>Is Active</label>
            <input
              type="checkbox"
              name="isActive"
              checked={product.isActive}
              onChange={(e) =>
                setProduct({ ...product, isActive: e.target.checked })
              }
            />
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminProduct;
