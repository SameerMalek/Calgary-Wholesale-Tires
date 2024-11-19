// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

// const Widget = ({ type }) => {
//   const [userCount, setUserCount] = useState(0);
//   const amount = 100; // Temporary amount for other widgets
  
//   useEffect(() => {
//     if (type === "user") {
//       const fetchUserCount = async () => {
//         try {
//           const response = await axios.get("http://localhost:8800/api/users");
//           setUserCount(response.data.length); // Set the count to the number of users
//         } catch (error) {
//           console.error("Error fetching user count:", error);
//         }
//       };
//       fetchUserCount();
//     }
//   }, [type]);

//   let data;

//   switch (type) {
//     case "user":
//       data = {
//         title: "USERS",
//         isMoney: false,
//         count: userCount,
//         link: "See all users",
//         icon: (
//           <PersonOutlinedIcon
//             className="icon"
//             style={{
//               color: "#000000",
//               backgroundColor: "rgba(0, 0, 0, 0.2)",
//               width: "30px", height: "30px"
//             }}
//           />
//         ),
//       };
//       break;
//     case "order":
//       data = {
//         title: "ORDERS",
//         isMoney: false,
//         count: amount,
//         link: "View all orders",
//         icon: (
//           <ShoppingCartOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(218, 165, 32, 0.2)",
//               color: "goldenrod",
//               width: "30px", height: "30px"
//             }}
//           />
//         ),
//       };
//       break;
//     case "earning":
//       data = {
//         title: "PRODUCTS",
//         isMoney: false,
//         count: amount,
//         link: "View net earnings",
//         icon: (
//           <MonetizationOnOutlinedIcon
//             className="icon"
//             style={{ 
//               backgroundColor: "rgba(0, 128, 0, 0.2)", 
//               color: "green",
//               width: "30px", height: "30px"}}
//           />
//         ),
//       };
//       break;
    
//     default:
//       break;
//   }

//   const widgetContent = (
//     <div className="widget">
//       <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">
//           {data.isMoney && "$"} {data.count}
//         </span>
//         <span className="link">{data.link}</span>
//       </div>
//       <div className="right">
//         <div className="percentage positive">
//           {/*<KeyboardArrowUpIcon />*/}
          
//         </div>
//         {data.icon}
//       </div>
//     </div>
//   );

//   return type === "user" ? (
//     <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
//       {widgetContent}
//     </Link>
//   ) : (
//     widgetContent
//   );
// };
// export default Widget;

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
          response = await axios.get("http://localhost:8800/api/users");
          setDataCount(response.data.length);
        } else if (type === "earning") {
          response = await axios.get("http://localhost:8800/api/products");
          setDataCount(response.data.length);
        } else if (type === "order") {
          response = await axios.get("http://localhost:8800/api/orders");
          setDataCount(response.data.length);
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
        count: 8,
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
        count: 8,
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
