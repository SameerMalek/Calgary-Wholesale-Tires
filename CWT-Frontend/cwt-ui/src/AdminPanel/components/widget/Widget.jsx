import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    const fetchDataCount = async () => {
      try {
        let response;
        if (type === "user") {
          response = await axios.get("https://calgary-wholesale-tires.onrender.com/api/users");
          setDataCount(response.data.length);
        } else if (type === "earning") {
          response = await axios.get("https://calgary-wholesale-tires.onrender.com/api/product");
          setDataCount(response.data.products.length);
        } else if (type === "order") {
          response = await axios.get("https://calgary-wholesale-tires.onrender.com/api/orders/all");
          setDataCount(response.data.length);
          const totalOrders =
          (response.data.newOrders?.length || 0) +
          (response.data.preparing?.length || 0) +
          (response.data.readyForDelivery?.length || 0) +
          (response.data.completed?.length || 0);
        setDataCount(totalOrders);
        }
      } catch (error) {
        console.error(`Error fetching ${type} count:`, error);
      }
    };

    fetchDataCount();
  }, [type]);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        count: dataCount,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "#000000",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              width: "30px",
              height: "30px",
            }}
          />
        ),
        linkUrl: "/admin/users",
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        count: dataCount,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
              width: "30px",
              height: "30px",
            }}
          />
        ),
        linkUrl: "/admin/orders",
      };
      break;
    case "earning":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        count: dataCount,
        link: "View all products",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
              width: "30px",
              height: "30px",
            }}
          />
        ),
        linkUrl: "/admin/products",
      };
      break;

    default:
      break;
  }

  return (
    <Link
      to={data.linkUrl}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.isMoney && "$"} {data.count}
          </span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">{data.icon}</div>
      </div>
    </Link>
  );
};

export default Widget;
