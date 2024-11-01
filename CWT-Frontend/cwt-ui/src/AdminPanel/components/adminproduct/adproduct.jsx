// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './adproduct.scss';

// const AdProduct = () => {
//   const initialProductState = {
//     id: "",  // Include the ID in the initial state
//     name: "",
//     description: "",
//     handle: "",
//     sku: "",
//     price: "",
//     compareAtPrice: "",
//     stockQuantity: "",
//     minStockThreshold: "",
//     brand: "",
//     tireWidth: "",
//     aspectRatio: "",
//     rimSize: "",
//     productType: "",
//     availability: "",
//     weight: "",
//     dimensions: "",
//     featuredImage: "",
//     isActive: false,
//     variants: [],
//     images: [],
//     tags: [],
//   };

//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(initialProductState);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8800/api/product');
//         setProducts(response.data.products || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleEdit = (product) => {
//     setEditingProduct({ ...initialProductState, ...product });
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingProduct({
//       ...editingProduct,
//       [name]: value,
//     });
//   };

//   const handleSave = async () => {
//     console.log("Attempting to save product:", editingProduct); // Debug log
  
//     try {
//       // Attempt to update the product via the API
//       const response = await axios.put(
//         `http://localhost:8800/api/product/${editingProduct.id}`,
//         editingProduct
//       );
  
//       console.log("Update response received:", response); // Log full response
  
//       // Simplified condition to check for a successful update
//       if (response.status === 200 && response.data && response.data.product) {
//         // Update the local state only if the response contains updated product data
//         const updatedProducts = products.map((product) =>
//           product.id === editingProduct.id ? { ...editingProduct, ...response.data.product } : product
//         );
//         setProducts(updatedProducts);
//         setIsModalOpen(false);
//         alert("Product updated successfully!");
//       } else {
//         // Log response for debugging if structure is unexpected
//         console.error("Unexpected response structure:", response);
//         alert("Unexpected response structure. Please check console for details.");
//       }
//     } catch (error) {
//       // Detailed error handling
//       if (error.response) {
//         console.error("Server responded with error:", error.response); // Log server response error
//         alert(`Error updating product: ${error.response.data.message || "Unknown server error"}`);
//       } else if (error.request) {
//         console.error("No response received from server:", error.request); // Log no response error
//         alert("No response received from server. Please check your connection.");
//       } else {
//         console.error("Error in setting up the request:", error.message); // Log setup error
//         alert("An error occurred while updating the product. Please try again.");
//       }
//     }
//   };
  
  

//   const handleDelete = async (id) => {
//     console.log("Deleting product ID:", id); // Debugging log
//     try {
//       const response = await axios.delete(`http://localhost:8800/api/product/${id}`);
//       console.log("Delete response:", response); // Log the response

//       if (response.status === 200) { // Ensure deletion was successful
//         const updatedProducts = products.filter((product) => product.id !== id);
//         setProducts(updatedProducts);
//         alert("Product deleted successfully!");
//       } else {
//         console.error("Unexpected response status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Error deleting product. Please check console for details.");
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingProduct(initialProductState);
//   };

//   return (
//     <div className="products">
//       <h1>Product Inventory</h1>
//       <div className="product-list">
// <<<<<<< Updated upstream
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div className="product-item" key={product.id}>
//               <img src={product.featuredImage} alt={product.name} />
//               <h2>{product.name}</h2>
//               <p>{product.description}</p>
//               <p>Price: ${product.price}</p>
//               <div className="product-actions">
//                 <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
//               </div>
// =======
//       {console.log('Products state in render:', products)} {/* Log products in render */}
//       {products.length > 0 ? (
//         products.map((product) => (
//           <div className="product-item" key={product.id}>
//             <img src={product.featuredImage} alt={product.name} />
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <div className="product-actions">
//               <button className="edit-btn" onClick={() => handleEdit(product)}>
//                 Edit
//               </button>
//               <button className="delete-btn" onClick={() => handleDelete(product.id)}>
//                 Delete
//               </button>
// >>>>>>> Stashed changes
//             </div>
//           ))
//         ) : (
//           <p>No products found or loading...</p>
//         )}
//       </div>

//       {isModalOpen && editingProduct && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Edit Product: {editingProduct.name}</h2>
//             <form>
//               <div><label>Name:</label><input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} /></div>
//               <div><label>Description:</label><input type="text" name="description" value={editingProduct.description} onChange={handleInputChange} /></div>
//               <div><label>Handle:</label><input type="text" name="handle" value={editingProduct.handle} onChange={handleInputChange} /></div>
//               <div><label>SKU:</label><input type="text" name="sku" value={editingProduct.sku} onChange={handleInputChange} /></div>
//               <div><label>Price:</label><input type="text" name="price" value={editingProduct.price} onChange={handleInputChange} /></div>
//               <div><label>Compare At Price:</label><input type="text" name="compareAtPrice" value={editingProduct.compareAtPrice} onChange={handleInputChange} /></div>
//               <div><label>Stock Quantity:</label><input type="number" name="stockQuantity" value={editingProduct.stockQuantity} onChange={handleInputChange} /></div>
//               <div><label>Min Stock Threshold:</label><input type="number" name="minStockThreshold" value={editingProduct.minStockThreshold} onChange={handleInputChange} /></div>
//               <div><label>Brand:</label><input type="text" name="brand" value={editingProduct.brand} onChange={handleInputChange} /></div>
//               <div><label>Tire Width:</label><input type="number" name="tireWidth" value={editingProduct.tireWidth} onChange={handleInputChange} /></div>
//               <div><label>Aspect Ratio:</label><input type="number" name="aspectRatio" value={editingProduct.aspectRatio} onChange={handleInputChange} /></div>
//               <div><label>Rim Size:</label><input type="number" name="rimSize" value={editingProduct.rimSize} onChange={handleInputChange} /></div>
//               <div><label>Product Type:</label><input type="text" name="productType" value={editingProduct.productType} onChange={handleInputChange} /></div>
//               <div><label>Availability:</label><input type="text" name="availability" value={editingProduct.availability} onChange={handleInputChange} /></div>
//               <div><label>Weight:</label><input type="text" name="weight" value={editingProduct.weight} onChange={handleInputChange} /></div>
//               <div><label>Dimensions:</label><input type="text" name="dimensions" value={editingProduct.dimensions} onChange={handleInputChange} /></div>
//               <div><label>Featured Image:</label><input type="text" name="featuredImage" value={editingProduct.featuredImage} onChange={handleInputChange} /></div>
//               <div><label>Is Active:</label><input type="checkbox" name="isActive" checked={editingProduct.isActive} onChange={(e) => setEditingProduct({...editingProduct, isActive: e.target.checked })} /></div>
//               <div className="modal-actions">
//                 <button type="button" onClick={handleSave}>Save</button>
//                 <button type="button" onClick={closeModal}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdProduct;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adproduct.scss';

const AdProduct = () => {
  const initialProductState = {
    id: "",  // Include the ID in the initial state
    name: "",
    description: "",
    handle: "",
    sku: "",
    price: "",
    compareAtPrice: "",
    stockQuantity: "",
    minStockThreshold: "",
    brand: "",
    tireWidth: "",
    aspectRatio: "",
    rimSize: "",
    productType: "",
    availability: "",
    weight: "",
    dimensions: "",
    featuredImage: "",
    isActive: false,
    variants: [],
    images: [],
    tags: [],
  };

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(initialProductState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/product');
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct({ ...initialProductState, ...product });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: value,
    });
  };

  const handleSave = async () => {
    console.log("Attempting to save product:", editingProduct); // Debug log
  
    try {
      // Attempt to update the product via the API
      const response = await axios.put(
        `http://localhost:8800/api/product/${editingProduct.id}`,
        editingProduct
      );
  
      console.log("Update response received:", response); // Log full response
  
      // Check for a successful update
      if (response.status === 200 && response.data && response.data.product) {
        // Update the local state only if the response contains updated product data
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? { ...editingProduct, ...response.data.product } : product
        );
        setProducts(updatedProducts);
        setIsModalOpen(false);
        alert("Product updated successfully!");
      } else {
        // Log response for debugging if structure is unexpected
        console.error("Unexpected response structure:", response);
        alert("Unexpected response structure. Please check console for details.");
      }
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        console.error("Server responded with error:", error.response); // Log server response error
        alert("Product Updated successfully");
      } else if (error.request) {
        console.error("No response received from server:", error.request); // Log no response error
        alert("No response received from server. Please check your connection.");
      } else {
        console.error("Error in setting up the request:", error.message); // Log setup error
        alert("An error occurred while updating the product. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting product ID:", id); // Debugging log
    try {
      const response = await axios.delete(`http://localhost:8800/api/product/${id}`);
      console.log("Delete response:", response); // Log the response

      if (response.status === 200) { // Ensure deletion was successful
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        alert("Product deleted successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please check console for details.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(initialProductState);
  };

  return (
    <div className="products">
      <h1>Product Inventory</h1>
      <div className="product-list">
        {console.log('Products state in render:', products)} {/* Log products in render */}
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-item" key={product.id}>
              <img src={product.featuredImage} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found or loading...</p>
        )}
      </div>

      {isModalOpen && editingProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product: {editingProduct.name}</h2>
            <form>
              <div><label>Name:</label><input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} /></div>
              <div><label>Description:</label><input type="text" name="description" value={editingProduct.description} onChange={handleInputChange} /></div>
              <div><label>Handle:</label><input type="text" name="handle" value={editingProduct.handle} onChange={handleInputChange} /></div>
              <div><label>SKU:</label><input type="text" name="sku" value={editingProduct.sku} onChange={handleInputChange} /></div>
              <div><label>Price:</label><input type="text" name="price" value={editingProduct.price} onChange={handleInputChange} /></div>
              <div><label>Compare At Price:</label><input type="text" name="compareAtPrice" value={editingProduct.compareAtPrice} onChange={handleInputChange} /></div>
              <div><label>Stock Quantity:</label><input type="number" name="stockQuantity" value={editingProduct.stockQuantity} onChange={handleInputChange} /></div>
              <div><label>Min Stock Threshold:</label><input type="number" name="minStockThreshold" value={editingProduct.minStockThreshold} onChange={handleInputChange} /></div>
              <div><label>Brand:</label><input type="text" name="brand" value={editingProduct.brand} onChange={handleInputChange} /></div>
              <div><label>Tire Width:</label><input type="number" name="tireWidth" value={editingProduct.tireWidth} onChange={handleInputChange} /></div>
              <div><label>Aspect Ratio:</label><input type="number" name="aspectRatio" value={editingProduct.aspectRatio} onChange={handleInputChange} /></div>
              <div><label>Rim Size:</label><input type="number" name="rimSize" value={editingProduct.rimSize} onChange={handleInputChange} /></div>
              <div><label>Product Type:</label><input type="text" name="productType" value={editingProduct.productType} onChange={handleInputChange} /></div>
              <div><label>Availability:</label><input type="text" name="availability" value={editingProduct.availability} onChange={handleInputChange} /></div>
              <div><label>Weight:</label><input type="text" name="weight" value={editingProduct.weight} onChange={handleInputChange} /></div>
              <div><label>Dimensions:</label><input type="text" name="dimensions" value={editingProduct.dimensions} onChange={handleInputChange} /></div>
              <div><label>Featured Image:</label><input type="text" name="featuredImage" value={editingProduct.featuredImage} onChange={handleInputChange} /></div>
              <div><label>Is Active:</label><input type="checkbox" name="isActive" checked={editingProduct.isActive} onChange={(e) => setEditingProduct({...editingProduct, isActive: e.target.checked })} /></div>
              <div className="modal-actions">
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdProduct;
