import prisma from '../lib/prisma.js';

export const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    // Fetch products where name or tags match the query
    const filteredProducts = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { tags: { some: { tagName: { contains: query, mode: 'insensitive' } } } },
        ],
      },
      include: { tags: true }, // Include associated tags
    });

    const allProducts = await prisma.product.findMany(); // Fetch all products

    return res.status(200).json({ filteredProducts, allProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};
