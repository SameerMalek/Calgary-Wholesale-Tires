import fs from "fs";
import path from "path";
import csv from "csv-parser";
import prisma from "../lib/prisma.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define dirname equivalent for ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Utility function to read file without BOM
const readFileWithoutBOM = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  return content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
};

// Main function to upload products in bulk
const uploadProductsBulk = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads/", req.file.filename);
    console.log("Uploaded file path:", filePath);

    // Read and parse CSV content without BOM
    const csvContent = readFileWithoutBOM(filePath);
    const products = [];

    fs.createReadStream(filePath)
      .pipe(csv({
        mapHeaders: ({ header }) => header.replace(/^"|"$/g, '').toLowerCase() // Remove quotes and convert headers to lowercase
      }))
      .on("data", (data) => {
        // Ensure correct data parsing and handle each row
        console.log("CSV Parsed each line:", data);
        products.push({
          categoryName: data.categoryname,
          subCategoryName: data.subcategoryname,
          name: data.name,
          description: data.description,
          handle: data.handle,
          sku: data.sku,
          price: parseFloat(data.price),
          compareAtPrice: data.compareatprice ? parseFloat(data.compareatprice) : null,
          stockQuantity: parseInt(data.stockquantity, 10) || 0,
          minStockThreshold: parseInt(data.minstockthreshold, 10) || 1,
          brand: data.brand,
          tireWidth: data.tirewidth ? parseInt(data.tirewidth, 10) : null,
          aspectRatio: data.aspectratio ? parseInt(data.aspectratio, 10) : null,
          rimSize: data.rimsize ? parseInt(data.rimsize, 10) : null,
          productType: data.producttype,
          availability: data.availability,
          weight: parseFloat(data.weight) || 0,
          dimensions: data.dimensions ? safelyParseJSON(data.dimensions) : null,
          featuredImage: data.featuredimage,
          isActive: data.isactive.toLowerCase() === "true",
          tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
          variants: data.variants ? safelyParseJSON(data.variants) : [],
          images: data.images ? safelyParseJSON(data.images) : [],
        });
      })
      .on("end", async () => {
        try {
          for (const product of products) {
            // Verify category and subcategory exist before inserting
            const category = await prisma.category.findUnique({
              where: { name: product.categoryName },
            });
            const subCategory = await prisma.subCategory.findUnique({
              where: { name: product.subCategoryName },
            });

            // Debug logs for missing categories or subcategories
            if (!category) {
              console.warn(`Skipping product "${product.name}" due to missing category: ${product.categoryName}`);
              continue;
            }
            if (!subCategory) {
              console.warn(`Skipping product "${product.name}" due to missing subcategory: ${product.subCategoryName}`);
              continue;
            }

            console.log(`Found category and subcategory for product "${product.name}". Category: ${product.categoryName}, SubCategory: ${product.subCategoryName}`);

            // Insert product into the database
            await prisma.product.create({
              data: {
                category: { connect: { id: category.id } },
                subCategory: { connect: { id: subCategory.id } },
                name: product.name,
                description: product.description,
                handle: product.handle,
                sku: product.sku,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                stockQuantity: product.stockQuantity,
                minStockThreshold: product.minStockThreshold,
                brand: product.brand,
                tireWidth: product.tireWidth,
                aspectRatio: product.aspectRatio,
                rimSize: product.rimSize,
                productType: product.productType,
                availability: product.availability,
                weight: product.weight,
                dimensions: product.dimensions,
                featuredImage: product.featuredImage,
                isActive: product.isActive,
                tags: {
                  create: product.tags.map((tag) => ({ tagName: tag })),
                },
                images: {
                  create: product.images.map((image) => ({
                    src: image.src,
                    altText: image.altText || '',
                  })),
                },
                variants: {
                  create: product.variants.map((variant) => ({
                    title: variant.title,
                    price: parseFloat(variant.price),
                    sku: variant.sku,
                    quantity: parseInt(variant.quantity, 10) || 0,
                  })),
                },
              },
            });
            console.log(`Product "${product.name}" added successfully.`);
          }

          fs.unlinkSync(filePath); // Clean up uploaded file after processing
          res.status(201).json({ message: "Products uploaded successfully" });
        } catch (error) {
          console.error("Error saving products:", error);
          res.status(500).json({ message: "Error saving products" });
        }
      });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Bulk upload error" });
  }
};

// Utility function to safely parse JSON and handle errors
const safelyParseJSON = (value) => {
  try {
    value = value.trim();
    return value.startsWith("{") || value.startsWith("[") ? JSON.parse(value) : null;
  } catch (error) {
    console.error("JSON parsing error:", error);
    return null;
  }
};

export { uploadProductsBulk };
