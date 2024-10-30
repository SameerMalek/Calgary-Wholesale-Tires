import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adproduct.scss';

const AdProduct = () => {
  const [products, setProducts] = useState([]); // Store products
  const [editingProduct, setEditingProduct] = useState(null); // The product being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/product');
        console.log('Full API response:', response); // Log the full response
        console.log('Extracted products:', response.data.products); // Corrected field
        setProducts(response.data.products || []); // Set products from response.data.products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts(); // Call the function to fetch products on component mount
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

  // Save changes for the specific product (send update request to backend)
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8800/api/product/${editingProduct.id}`, editingProduct); // Send updated product to the backend
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      );
      setProducts(updatedProducts); // Update only the edited product in state
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product (send delete request to backend)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/product/${id}`); // Send delete request to the backend
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts); // Remove the product from the list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Close the modal without saving
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="products">
      <h1>Product Inventory</h1>
      <div className="product-list">
      {console.log('Products state in render:', products)} {/* Log products in render */}
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
        <p>No products found or loading...</p>
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
