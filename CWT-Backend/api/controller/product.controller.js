import prisma from '../lib/prisma.js';

// Add a new product
export const addProduct = async (req, res) => {
  const {
    categoryName,
    subCategoryName,
    name,
    description,
    handle,
    sku,
    price,
    compareAtPrice,
    stockQuantity,
    minStockThreshold,
    brand,
    weight,
    dimensions,
    featuredImage,
    isActive,
  } = req.body;

  console.log('Received data for product creation:', req.body); // Log incoming data

  // Validate incoming data
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Product name is required.' });
  }
  
  if (!categoryName || !subCategoryName) {
    return res.status(400).json({ message: 'Category and Subcategory names are required.' });
  }

  try {
    // Fetch the category by name
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Fetch the subcategory by name
    const subCategory = await prisma.subCategory.findUnique({
      where: { name: subCategoryName },
    });

    if (!subCategory) {
      return res.status(400).json({ message: 'Subcategory not found' });
    }

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        categoryId: category.id,
        subCategoryId: subCategory.id,
        name,
        description,
        handle,
        sku,
        price: parseFloat(price),  // Ensure this is a float
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity, 10) || 0, // Ensure this is an integer
        minStockThreshold: parseInt(minStockThreshold, 10) || 1,
        brand,
        weight: parseFloat(weight) || 0, // Ensure this is a float
        dimensions,
        featuredImage,
        isActive,
      },
    });

    res.status(200).json({ message: 'Product added successfully!', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err); // Log the error for debugging
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
};


// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: 'Product deleted successfully!', product: deletedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    description,
    handle,
    sku,
    price,
    compareAtPrice,
    stockQuantity,
    minStockThreshold,
    brand,
    weight,
    dimensions,
    featuredImage,
    isActive
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        handle,
        sku,
        price,
        compareAtPrice,
        stockQuantity,
        minStockThreshold,
        brand,
        weight,
        dimensions,
        featuredImage,
        isActive,
      },
    });
    res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product', error: err });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true, subCategory: true }, // Include related category and subcategory
    });
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving product', error: err });
  }
};

// Get all products by category
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: { subCategory: true }, // Include subcategories
    });
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving products by category', error: err });
  }
};

// Get all products by subcategory
export const getProductsBySubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: { subCategoryId },
    });
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving products by subcategory', error: err });
  }
};
