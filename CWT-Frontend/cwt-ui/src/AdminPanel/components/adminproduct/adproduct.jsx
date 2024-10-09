import React, { useState, useEffect } from 'react';
import "./adproduct.scss";
import productData from "../../../lib/products.json";

const AdProduct = () => {
  const [products, setProducts] = useState([]); // Store products
  const [editingProduct, setEditingProduct] = useState(null); // The product being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    setProducts(productData); // Load products from the JSON file
  }, []);

  // Open modal for a specific product
  const handleEdit = (product) => {
    setEditingProduct({ ...product }); // Clone the product to avoid direct state mutation
    setIsModalOpen(true); // Show modal
  };

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: value,
    });
  };

  // Save changes for the specific product
  const handleSave = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts); // Update only the edited product
    setIsModalOpen(false); // Close the modal after saving
  };

  // Delete a product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Remove the product from the list
  };

  // Close the modal without saving
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="products">
      <h1>Product Inventory</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {/* Modal for editing product */}
      {isModalOpen && editingProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product: {editingProduct.name}</h2>
            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={editingProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="text"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  value={editingProduct.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleSave}>
                  Save
                </button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdProduct;
