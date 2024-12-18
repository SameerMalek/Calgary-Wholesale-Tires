import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./AdminHome.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import AdminProduct from "../../components/adminproduct/adminproduct";
import AdProduct from "../../components/adminproduct/adproduct";
import AdminProfile from "../../components/adminprofile/adminprofile";
import User from "../../components/users/User";
import Delivery from "./../../components/delivery/Delivery";
import OrderManagement from "../../components/order/OrderManagement";

const AdminHome = () => {
  // State to track the currently active panel
  const [activePanel, setActivePanel] = useState("dashboard");

  // Function to render content based on the selected panel
  const renderActivePanel = () => {
    switch (activePanel) {
      case "dashboard":
        return (
          <>
            <div className="widgets-container">
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="earning" />
            </div>
            <div className="charts">
              <Featured />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table />
            </div>
          </>
        );
      case "products":
        return <AdminProduct />;
      case "inventory":
        return <AdProduct />;
      case "info":
      case "adminlogo":
        return <AdminProfile />;
      case "users":
        return <User />;
      case "order":
        return <OrderManagement />;
      case "delivery":
        return <Delivery />;
      default:
        return (
          <div className="welcomePanel">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Select a menu item to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="adminHome">
      <Sidebar setActivePanel={setActivePanel} />
      <div className="homeContainer">
        <Navbar setActivePanel={setActivePanel} />
        {renderActivePanel()}
      </div>
    </div>
  );
};

export default AdminHome;
