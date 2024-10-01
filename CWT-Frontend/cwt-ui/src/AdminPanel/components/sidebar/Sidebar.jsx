// import "./Sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import { Link } from "react-router-dom";


// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <div className="top">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo">Admin Dashboard</span>
//         </Link>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           <p className="title">MAIN</p>
//           <li>
//             <DashboardIcon className="icon" />
//             <span>Dashboard</span>
//           </li>
//           <p className="title">LISTS</p>
//           <Link to="/users" style={{ textDecoration: "none" }}>
//             <li>
//               <PersonOutlineIcon className="icon" />
//               <span>Users</span>
//             </li>
//           </Link>
//           <Link to="/product" style={{ textDecoration: "none" }}>
//             <li>
//               <StoreIcon className="icon" />
//               <span>Products</span>
//             </li>
//           </Link>
//           <li>
//             <CreditCardIcon className="icon" />
//             <span>Orders</span>
//           </li>
//           <li>
//             <LocalShippingIcon className="icon" />
//             <span>Delivery</span>
//           </li>
//           <p className="title">USEFUL</p>
//           <li>
//             <InsertChartIcon className="icon" />
//             <span>Stats</span>
//           </li>
//           <li>
//             <NotificationsNoneIcon className="icon" />
//             <span>Notifications</span>
//           </li>
//           <p className="title">SERVICE</p>
//           <li>
//             <PsychologyOutlinedIcon className="icon" />
//             <span>Reports</span>
//           </li>

//           <p className="title">USER</p>
//           <li>
//             <AccountCircleOutlinedIcon className="icon" />
//             <span>Profile</span>
//           </li>
//           <li>
//             <ExitToAppIcon className="icon" />
//             <span>Logout</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = ({ setActivePanel }) => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
           <span className="logo">Admin Dashboard</span>
         </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => setActivePanel('dashboard')}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <li onClick={() => setActivePanel('users')}>
            <PersonOutlineIcon className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => setActivePanel('products')}>
            <StoreIcon className="icon" />
            <span>Products</span>
          </li>
          <li onClick={() => setActivePanel('orders')}>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li onClick={() => setActivePanel('delivery')}>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li onClick={() => setActivePanel('stats')}>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li onClick={() => setActivePanel('notifications')}>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li onClick={() => setActivePanel('reports')}>
            <PsychologyOutlinedIcon className="icon" />
            <span>Reports</span>
          </li>
          <p className="title">USER</p>
          <li onClick={() => setActivePanel('profile')}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={() => setActivePanel('logout')}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
