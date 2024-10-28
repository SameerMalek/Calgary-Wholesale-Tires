import fs from "fs";
import path from "path";
import csv from "csv-parser";
import prisma from "../lib/prisma.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadProductsBulk = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads/", req.file.filename);
    console.log("Uploaded file path:", filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "File does not exist" });
    }

    const products = [];

    // Parse CSV file and create product objects
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        products.push({
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          sku: data.sku,
          stockQuantity: parseInt(data.stockQuantity),
          minStockThreshold: parseInt(data.minStockThreshold),
          brand: data.brand,
          weight: parseFloat(data.weight),
          dimensions: data.dimensions ? safelyParseJSON(data.dimensions) : null,
          featuredImage: data.featuredImage,
          compareAtPrice: parseFloat(data.compareAtPrice),
          tireWidth: parseInt(data.tireWidth),
          aspectRatio: parseInt(data.aspectRatio),
          rimSize: parseInt(data.rimSize),
          productType: data.productType,
          availability: data.availability,
          isActive: data.isActive === "true",
          tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
          variants: data.variants ? safelyParseJSON(data.variants) : [],
          images: data.images ? safelyParseJSON(data.images) : [],
          categoryName: data.categoryName,
          subCategoryName: data.subCategoryName,
        });
      })
      .on("end", async () => {
        try {
          for (const product of products) {
            const category = await prisma.category.findUnique({
              where: { name: product.categoryName },
            });
            const subCategory = await prisma.subCategory.findUnique({
              where: { name: product.subCategoryName },
            });

            // Skip products if category or subcategory is missing
            if (!category || !subCategory) continue;

            await prisma.product.create({
              data: {
                ...product,
                categoryId: category.id,
                subCategoryId: subCategory.id,
                tags: {
                  create: product.tags.map((tag) => ({ tagName: tag })),
                },
                images: {
                  create: product.images.map((src) => ({ src })),
                },
                variants: {
                  create: product.variants.map((variant) => ({
                    title: variant.title,
                    price: parseFloat(variant.price),
                    sku: variant.sku,
                    quantity: parseInt(variant.quantity),
                  })),
                },
              },
            });
          }

          fs.unlinkSync(filePath); // Remove file after processing
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

// Utility function to safely parse JSON and log errors
// Utility function to safely parse JSON and log errors
const safelyParseJSON = (value) => {
  console.log("Attempting to parse JSON:", value); // Log the value before parsing
  try {
    // Remove any leading or trailing whitespace
    value = value.trim();

    // Check if value is a valid JSON format
    if (value.startsWith("{") || value.startsWith("[")) {
      return JSON.parse(value);
    } else {
      console.warn("Invalid JSON format:", value); // Log a warning if format is not valid
      return null; // or an empty array/object if preferable
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return null; // or an empty array/object if preferable
  }
};

export { uploadProductsBulk };
