import prisma from '../lib/prisma.js'; 

async function main() {
  // Create Categories with Subcategories
  const categories = [
    {
      name: 'Tires',
      slug: 'tires',
      isActive: true,
      subCategories: {
        create: [
          { name: 'Winter Tires', slug: 'winter-tires', isActive: true },
          { name: 'All-Season Tires', slug: 'all-season-tires', isActive: true },
        ],
      },
    },
    {
      name: 'Rims',
      slug: 'rims',
      isActive: true,
      subCategories: {
        create: [
          { name: 'Alloy Rims', slug: 'alloy-rims', isActive: true },
          { name: 'Steel Rims', slug: 'steel-rims', isActive: true },
        ],
      },
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      isActive: true,
      subCategories: {
        create: [
          { name: 'Car Covers', slug: 'car-covers', isActive: true },
          { name: 'Floor Mats', slug: 'floor-mats', isActive: true },
        ],
      },
    },
  ];

  // Insert categories and subcategories
  for (const categoryData of categories) {
    await prisma.category.create({
      data: categoryData,
    });
  }

  console.log('Categories and subcategories seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
