import React, { useEffect, useState } from "react";
import "./Featured.scss";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "axios";

const Featured = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/orders/all");
        const data = response.data;

        // Combine all orders into a single array
        const allOrders = [
          ...(data.newOrders || []),
          ...(data.preparing || []),
          ...(data.readyForDelivery || []),
          ...(data.completed || []),
        ];

        // Calculate total revenue
        const total = allOrders.reduce(
          (sum, order) => sum + (order.total_amount || 0),
          0
        );

        // Calculate today's revenue
        const today = new Date().toISOString().split("T")[0];
        const todayTotal = allOrders.reduce((sum, order) => {
          const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
          return orderDate === today ? sum + (order.total_amount || 0) : sum;
        }, 0);

        // Calculate revenue per month for the last 6 months
        const months = [];
        const monthLabels = [];

        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push({
            month: date.getMonth(), // 0-11
            year: date.getFullYear(),
            total: 0,
          });
          monthLabels.push(date.toLocaleString('default', { month: 'short', year: 'numeric' }));
        }

        // Sum revenue for each month
        allOrders.forEach(order => {
          const orderDate = new Date(order.createdAt);
          const orderMonth = orderDate.getMonth();
          const orderYear = orderDate.getFullYear();

          months.forEach(monthData => {
            if (monthData.month === orderMonth && monthData.year === orderYear) {
              monthData.total += order.total_amount || 0;
            }
          });
        });

        const monthlyTotals = months.map(monthData => monthData.total);
        const target = 10000;
        const progressPercentage = (total / target) * 100;

        setTotalRevenue(total);
        setTodayRevenue(todayTotal);
        setMonthlyRevenue(monthlyTotals);
        setProgress(progressPercentage);
        setMonthLabels(monthLabels);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const barChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Revenue ($)",
        data: monthlyRevenue,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Monthly Revenue Overview</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="chartContainer">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
      <div className="bottom">
        <div className="stats">
          <div className="statItem">
            <span className="statTitle">Today's Revenue</span>
            <span className="statValue">${todayRevenue.toFixed(2)}</span>
          </div>
          <div className="statItem">
            <span className="statTitle">Total Revenue</span>
            <span className="statValue">${totalRevenue.toFixed(2)}</span>
          </div>
          <div className="statItem">
            <span className="statTitle">Target Progress</span>
            <div className={`statValue ${progress >= 100 ? "positive" : "negative"}`}>
              {progress >= 100 ? (
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
