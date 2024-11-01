import prisma from "../lib/prisma.js";

// Add a new product
export const addProduct = async (req, res) => {
  const {
    categoryName,
    subCategoryName,
    name,
    description,
    handle, // Handle is now optional, we'll generate if it's undefined or duplicated
    sku,
    price,
    compareAtPrice,
    stockQuantity,
    minStockThreshold,
    brand,
    tireWidth,
    aspectRatio,
    rimSize,
    productType,
    availability,
    weight,
    dimensions,
    featuredImage,
    isActive,
    variants,
    images,
    tags,
  } = req.body;

  console.log("Received data for product creation:", req.body);

  try {
    // Check or generate unique handle
    let productHandle =
      handle || name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    const existingProduct = await prisma.product.findUnique({
      where: { handle: productHandle },
    });

    // If the handle already exists, append a timestamp to make it unique
    if (existingProduct) {
      productHandle = `${productHandle}-${Date.now()}`;
    }

    // Find or create the category and subcategory
    let category = await prisma.category.findUnique({
      where: { name: categoryName },
    });
    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, description: `${categoryName} Category` },
      });
    }

    let subCategory = await prisma.subCategory.findUnique({
      where: { name: subCategoryName },
    });
    if (!subCategory) {
      subCategory = await prisma.subCategory.create({
        data: {
          name: subCategoryName,
          description: `${subCategoryName} Subcategory`,
          category: { connect: { id: category.id } },
        },
      });
    }

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        handle: productHandle, // Use the generated unique handle
        sku,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity, 10) || 0,
        minStockThreshold: parseInt(minStockThreshold, 10) || 1,
        brand,
        tireWidth: parseInt(tireWidth, 10),
        aspectRatio: parseInt(aspectRatio, 10),
        rimSize: rimSize ? parseInt(rimSize, 10) : null,
        productType,
        availability,
        weight: parseFloat(weight) || 0,
        dimensions,
        featuredImage,
        isActive,
        category: { connect: { id: category.id } },
        subCategory: { connect: { id: subCategory.id } },
        variants: {
          create:
            variants?.map((variant) => ({
              title: variant.title,
              price: parseFloat(variant.price),
              sku: variant.sku,
              quantity: parseInt(variant.quantity, 10) || 0,
            })) || [],
        },
        images: {
          create:
            images?.map((image) => ({
              src: image.src,
              altText: image.altText || "",
            })) || [],
        },
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
    console.error("Error adding product:", err);
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete product with ID:", id);

  try {
    // First, delete related records that have productId foreign key
    await prisma.variant.deleteMany({ where: { productId: id } });
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productTag.deleteMany({ where: { productId: id } });

    // Now, delete the main product
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Product and associated data deleted successfully!",
      product: deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: "Error deleting product",
      error: err.message,
    });
  }
};

// Update a product by ID
// Ensure the response format in the backend is consistent
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
    tireWidth,
    aspectRatio,
    rimSize,
    productType,
    availability,
    weight,
    dimensions,
    featuredImage,
    isActive,
    variants,
    images,
    tags,
  } = req.body;

  try {
    // Step 1: Delete existing related data for `variants`, `images`, and `tags`
    await prisma.variant.deleteMany({ where: { productId } });
    await prisma.productImage.deleteMany({ where: { productId } });
    await prisma.productTag.deleteMany({ where: { productId } });

    // Step 2: Update the main product fields
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
        tireWidth: parseInt(tireWidth, 10),
        aspectRatio: parseInt(aspectRatio, 10),
        rimSize: parseInt(rimSize, 10),
        productType,
        availability,
        weight: parseFloat(weight) || 0,
        dimensions,
        featuredImage,
        isActive,
      },
    });

    // Step 3: Recreate related data
    if (variants) {
      await prisma.variant.createMany({
        data: variants.map((variant) => ({
          productId,
          title: variant.title,
          price: parseFloat(variant.price),
          sku: variant.sku,
          quantity: parseInt(variant.quantity, 10) || 0,
        })),
      });
    }

    if (images) {
      await prisma.productImage.createMany({
        data: images.map((image) => ({
          productId,
          src: image.src,
          altText: image.altText || "",
        })),
      });
    }

    if (tags) {
      await prisma.productTag.createMany({
        data: tags.map((tag) => ({
          productId,
          tagName: tag,
        })),
      });
    }

    console.log("Product updated successfully:", updatedProduct);

    // Send the response back to client
    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      message: "Error updating product",
      error: err.message,
    });
  }
};

// Get all products:
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true, // Include variants in the response
        images: true, // Include images in the response
        tags: true, // Include tags in the response
      },
    });

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
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
