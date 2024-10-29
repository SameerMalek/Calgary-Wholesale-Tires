import prisma from "../lib/prisma.js";

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
    tireWidth, // New field: Tire width
    aspectRatio, // New field: Aspect ratio
    rimSize, // New field: Rim size
    productType, // New field: Product type
    availability, // New field: Availability status
    weight,
    dimensions,
    featuredImage,
    isActive,
    variants, // Adding variants to the product
    images, // Adding images to the product
    tags, // Adding tags to the product
  } = req.body;

  console.log("Received data for product creation:", req.body); // Log incoming data

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Product name is required." });
  }

  if (!categoryName || !subCategoryName) {
    return res
      .status(400)
      .json({ message: "Category and Subcategory names are required." });
  }

  // Optionally parse numeric inputs for tireWidth and aspectRatio, defaulting to null if not provided
  const parsedTireWidth = tireWidth != null ? parseInt(tireWidth, 10) : null;
  const parsedAspectRatio =
    aspectRatio != null ? parseInt(aspectRatio, 10) : null;

  try {
    // Fetch the category by name
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Fetch the subcategory by name
    const subCategory = await prisma.subCategory.findUnique({
      where: { name: subCategoryName },
    });

    if (!subCategory) {
      return res.status(400).json({ message: "Subcategory not found" });
    }

    // Create the product with relationships to variants, images, and tags
    const newProduct = await prisma.product.create({
      data: {
        category: {
          connect: {
            id: category.id, // Connect to the category
          },
        },
        subCategory: {
          connect: {
            id: subCategory.id, // Connect to the subcategory
          },
        },

        name,
        description,
        handle,
        sku,
        price: parseFloat(price), // Ensure price is a float
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity, 10) || 0, // Ensure stockQuantity is an integer
        minStockThreshold: parseInt(minStockThreshold, 10) || 1,
        brand,
        tireWidth: parsedTireWidth, // Use parsed value, which can be null
        aspectRatio: parsedAspectRatio, // Use parsed value, which can be null
        rimSize: parseInt(rimSize, 10), // Ensure rimSize is an integer
        productType, // New field: Product type as string
        availability, // New field: Availability status as string
        weight: parseFloat(weight) || 0, // Ensure weight is a float
        dimensions,
        featuredImage,
        isActive,

        // Create variants associated with the product
        variants: {
          create:
            variants?.map((variant) => ({
              title: variant.title,
              price: parseFloat(variant.price),
              sku: variant.sku,
              quantity: parseInt(variant.quantity, 10) || 0,
            })) || [],
        },

        // Create product images
        images: {
          create:
            images?.map((image) => ({
              src: image.src,
              altText: image.altText || "",
            })) || [],
        },

        // Create product tags
        tags: {
          create:
            tags?.map((tag) => ({
              tagName: tag,
            })) || [],
        },
      },
    });

    res
      .status(200)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    console.error("Error adding product:", err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    res.status(200).json({
      message: "Product deleted successfully!",
      product: deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
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
    tireWidth, // New field: Tire width
    aspectRatio, // New field: Aspect ratio
    rimSize, // New field: Rim size
    productType, // New field: Product type
    availability, // New field: Availability status
    weight,
    dimensions,
    featuredImage,
    isActive,
    variants,
    images,
    tags,
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        handle,
        sku,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity, 10) || 0,
        minStockThreshold: parseInt(minStockThreshold, 10) || 1,
        brand,
        tireWidth: parseInt(tireWidth, 10), // New field: Ensure tireWidth is an integer
        aspectRatio: parseInt(aspectRatio, 10), // New field: Ensure aspectRatio is an integer
        rimSize: parseInt(rimSize, 10), // New field: Ensure rimSize is an integer
        productType, // New field: Product type as string
        availability, // New field: Availability status as string
        weight: parseFloat(weight) || 0,
        dimensions,
        featuredImage,
        isActive,

        // Update variants
        variants: {
          deleteMany: {}, // First delete existing variants
          create:
            variants?.map((variant) => ({
              title: variant.title,
              price: parseFloat(variant.price),
              sku: variant.sku,
              quantity: parseInt(variant.quantity, 10) || 0,
            })) || [],
        },

        // Update images
        images: {
          deleteMany: {}, // First delete existing images
          create:
            images?.map((image) => ({
              src: image.src,
              altText: image.altText || "",
            })) || [],
        },

        // Update tags
        tags: {
          deleteMany: {}, // First delete existing tags
          create:
            tags?.map((tag) => ({
              tagName: tag,
            })) || [],
        },
      },
    });

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// Get all products:
export const getAllProducts = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include: {
        variants: true, // Include variants in the response
        images: true, // Include images in the response
        tags: true, // Include tags in the response
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: true, // Include variants in the response
        images: true, // Include images in the response
        tags: true, // Include tags in the response
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

// Get all products by category
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: {
        variants: true,
        images: true,
        tags: true,
      },
    });

    res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({
      message: "Error fetching products by category",
      error: err.message,
    });
  }
};

// Get all products by subcategory
export const getProductsBySubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: { subCategoryId },
      include: {
        variants: true,
        images: true,
        tags: true,
      },
    });

    res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching products by subcategory:", err);
    res.status(500).json({
      message: "Error fetching products by subcategory",
      error: err.message,
    });
  }
};
