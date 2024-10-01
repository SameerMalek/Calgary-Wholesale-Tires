import prisma from '../lib/prisma.js';

// Add a new sales report
export const addSalesReport = async (req, res) => {
  const { date, total_sales, total_orders, total_customers, best_selling_product_id } = req.body;

  try {
    const salesReport = await prisma.salesReport.create({
      data: {
        date: new Date(date),
        total_sales: parseFloat(total_sales),
        total_orders: parseInt(total_orders, 10),
        total_customers: parseInt(total_customers, 10),
        best_selling_product_id,
      },
    });
    res.status(201).json({ message: 'Sales report added successfully', salesReport });
  } catch (err) {
    res.status(500).json({ message: 'Error adding sales report', error: err.message });
  }
};

// Get all sales reports
export const getSalesReports = async (req, res) => {
  try {
    const salesReports = await prisma.salesReport.findMany();
    res.status(200).json({ salesReports });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales reports', error: err.message });
  }
};

// Get sales report by ID
export const getSalesReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    const salesReport = await prisma.salesReport.findUnique({
      where: { id: reportId },
    });

    if (!salesReport) {
      return res.status(404).json({ message: 'Sales report not found' });
    }

    res.status(200).json({ salesReport });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales report', error: err.message });
  }
};
