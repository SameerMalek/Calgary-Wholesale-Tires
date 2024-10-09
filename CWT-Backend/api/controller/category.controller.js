import prisma from '../lib/prisma.js';
// Category Controller
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true, // Include subcategories
      },
    });

    // Ensure each category has an image before sending
    const categoriesWithImages = categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image, // Make sure this is included
      subCategories: category.subCategories,
    }));

    res.status(200).json({ categories: categoriesWithImages });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

  