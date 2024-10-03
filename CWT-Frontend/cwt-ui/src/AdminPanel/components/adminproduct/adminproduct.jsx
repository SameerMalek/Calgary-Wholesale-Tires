// import React, { useState } from "react";
// import "./adminproduct.scss";

// const AdminProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     sku: "",
//     stockQuantity: 0,
//     brand: "",
//     weight: 0,
//     dimensions: "",
//     isActive: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Product submitted: ", product);
//   };

//   return (
//     <div className="addProduct">
//       <div className="addProductContainer">
//         <h1>Add New Product</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="formGroup">
//             <label>Product Name</label>
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="formGroup">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="formGroupRow">
//             <div className="formGroup">
//               <label>Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="formGroup">
//               <label>SKU</label>
//               <input
//                 type="text"
//                 name="sku"
//                 value={product.sku}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="formGroupRow">
//             <div className="formGroup">
//               <label>Stock Quantity</label>
//               <input
//                 type="number"
//                 name="stockQuantity"
//                 value={product.stockQuantity}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="formGroup">
//               <label>Brand</label>
//               <input
//                 type="text"
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="formGroupRow">
//             <div className="formGroup">
//               <label>Weight</label>
//               <input
//                 type="number"
//                 name="weight"
//                 value={product.weight}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="formGroup">
//               <label>Dimensions</label>
//               <input
//                 type="text"
//                 name="dimensions"
//                 value={product.dimensions}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="formGroup">
//             <label>Is Active</label>
//             <input
//               type="checkbox"
//               name="isActive"
//               checked={product.isActive}
//               onChange={(e) =>
//                 setProduct({ ...product, isActive: e.target.checked })
//               }
//             />
//           </div>

//           <button type="submit">Add Product</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminProduct;

import React, { useState } from "react";
import "./adminproduct.scss";

const AdminProduct = () => {
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
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("YOUR_API_ENDPOINT/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        console.log("Product successfully added");
        // Reset form after successful submission
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
          isActive: true,
        });
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setIsLoading(false);
    }
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
                min="0"
              />
            </div>
            <div className="formGroup">
              <label>Compare At Price</label>
              <input
                type="number"
                name="compareAtPrice"
                value={product.compareAtPrice}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="formGroupRow">
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
            <div className="formGroup">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="formGroupRow">
            <div className="formGroup">
              <label>Minimum Stock Threshold</label>
              <input
                type="number"
                name="minStockThreshold"
                value={product.minStockThreshold}
                onChange={handleChange}
                min="1"
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
                min="0"
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
            <label>Featured Image URL</label>
            <input
              type="text"
              name="featuredImage"
              value={product.featuredImage}
              onChange={handleChange}
            />
          </div>

          <div className="formGroupRow">
            <div className="formGroup">
              <label>Category</label>
              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                required
                className="selectInput"
              >
                <option value="">Select Category</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
                {/* Replace with actual category options */}
              </select>
            </div>
            <div className="formGroup">
              <label>Subcategory</label>
              <select
                name="subCategoryId"
                value={product.subCategoryId}
                onChange={handleChange}
                required
                className="selectInput"
              >
                <option value="">Select Subcategory</option>
                <option value="sub1">Subcategory 1</option>
                <option value="sub2">Subcategory 2</option>
                {/* Replace with actual subcategory options */}
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={product.isActive}
                onChange={handleCheckboxChange}
              />
              Is Active
            </label>
          </div>

          <button type="submit" className={isLoading ? "loading" : ""}>
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProduct;
