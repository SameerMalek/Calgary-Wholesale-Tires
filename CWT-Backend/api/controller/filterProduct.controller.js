import prisma from '../lib/prisma.js';

export const filterProducts = async (req, res) => {
  const {
    categoryId,
    subCategoryId,
    brand,
    priceRange,
    dimensions,
    tags,
  } = req.query;

  try {
    const filters = {
      AND: [],
    };

    // Add filters based on provided parameters
    if (categoryId) {
      filters.AND.push({ categoryId });
    }

    if (subCategoryId) {
      filters.AND.push({ subCategoryId });
    }

    if (brand) {
      filters.AND.push({ brand: { contains: brand, mode: 'insensitive' } });
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(',').map(Number);
      filters.AND.push({
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      });
    }

    if (dimensions) {
      filters.AND.push({ dimensions: { contains: dimensions, mode: 'insensitive' } });
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filters.AND.push({
        tags: {
          some: {
            tagName: {
              in: tagArray,
            },
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: filters,
      include: {
        variants: true,
        images: true,
        tags: true,
      },
    });

    res.status(200).json({ products });
  } catch (err) {
    console.error('Error filtering products:', err);
    res.status(500).json({ message: 'Error filtering products', error: err.message });
  }
};
