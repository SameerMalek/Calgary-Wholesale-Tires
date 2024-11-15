import React, { useState } from "react";
import "./Sidebar.scss";
import {
  Dashboard,
  PersonOutline,
  LocalShipping,
  CreditCard,
  Store,
  ExitToApp,
  AccountCircleOutlined,
  Menu,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ setActivePanel }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className="top">
        <span className="menu-icon" onClick={toggleSidebar}>
          <Menu />
        </span>
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => setActivePanel("dashboard")}>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <li onClick={() => setActivePanel("users")}>
            <PersonOutline className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => setActivePanel("products")}>
            <Store className="icon" />
            <span>Inventory</span>
          </li>
          <li onClick={() => setActivePanel("inventory")}>
            <Store className="icon" />
            <span>Products</span>
          </li>
          <li onClick={() => setActivePanel("order")}>
            <CreditCard className="icon" />
            <span>Orders</span>
          </li>
          <li onClick={() => setActivePanel("delivery")}>
            <LocalShipping className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USER</p>
          <li onClick={() => setActivePanel("info")}>
            <AccountCircleOutlined className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={() => setActivePanel("logout")}>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
