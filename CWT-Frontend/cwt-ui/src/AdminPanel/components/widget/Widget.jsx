// // import "./Widget.scss";
// // import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// // import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// // import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// // import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// // import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

// // const Widget = ({ type }) => {
// //   let data;

// //   //temporary
// //   const amount = 100;
// //   const diff = 20;

// //   switch (type) {
// //     case "user":
// //       data = {
// //         title: "USERS",
// //         isMoney: false,
// //         link: "See all users",
// //         icon: (
// //           <PersonOutlinedIcon
// //             className="icon"
// //             style={{
// //               color: "crimson",
// //               backgroundColor: "rgba(255, 0, 0, 0.2)",
// //             }}
// //           />
// //         ),
// //       };
// //       break;
// //     case "order":
// //       data = {
// //         title: "ORDERS",
// //         isMoney: false,
// //         link: "View all orders",
// //         icon: (
// //           <ShoppingCartOutlinedIcon
// //             className="icon"
// //             style={{
// //               backgroundColor: "rgba(218, 165, 32, 0.2)",
// //               color: "goldenrod",
// //             }}
// //           />
// //         ),
// //       };
// //       break;
// //     case "earning":
// //       data = {
// //         title: "EARNINGS",
// //         isMoney: true,
// //         link: "View net earnings",
// //         icon: (
// //           <MonetizationOnOutlinedIcon
// //             className="icon"
// //             style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
// //           />
// //         ),
// //       };
// //       break;
// //     case "balance":
// //       data = {
// //         title: "BALANCE",
// //         isMoney: true,
// //         link: "See details",
// //         icon: (
// //           <AccountBalanceWalletOutlinedIcon
// //             className="icon"
// //             style={{
// //               backgroundColor: "rgba(128, 0, 128, 0.2)",
// //               color: "purple",
// //             }}
// //           />
// //         ),
// //       };
// //       break;
// //     default:
// //       break;
// //   }

// //   return (
// //     <div className="widget">
// //       <div className="left">
// //         <span className="title">{data.title}</span>
// //         <span className="counter">
// //           {data.isMoney && "$"} {amount}
// //         </span>
// //         <span className="link">{data.link}</span>
// //       </div>
// //       <div className="right">
// //         <div className="percentage positive">
// //           <KeyboardArrowUpIcon />
// //           {diff} %
// //         </div>
// //         {data.icon}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Widget;

// import React, { useEffect, useState } from "react";
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
//   const diff = 20;    // Temporary diff percentage

//   // Fetch user count from the database
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
//         count: userCount, // Display dynamic user count
//         link: "See all users",
//         icon: (
//           <PersonOutlinedIcon
//             className="icon"
//             style={{
//               color: "#000000",
//               backgroundColor: "rgba(0, 0, 0, 0.2)",
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
//             }}
//           />
//         ),
//       };
//       break;
//     case "earning":
//       data = {
//         title: "EARNINGS",
//         isMoney: true,
//         count: amount,
//         link: "View net earnings",
//         icon: (
//           <MonetizationOnOutlinedIcon
//             className="icon"
//             style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
//           />
//         ),
//       };
//       break;
//     case "balance":
//       data = {
//         title: "BALANCE",
//         isMoney: true,
//         count: amount,
//         link: "See details",
//         icon: (
//           <AccountBalanceWalletOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(128, 0, 128, 0.2)",
//               color: "purple",
//             }}
//           />
//         ),
//       };
//       break;
//     default:
//       break;
//   }

//   return (
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
//           <KeyboardArrowUpIcon />
//           {diff} %
//         </div>
//         {data.icon}
//       </div>
//     </div>
//   );
// };

// export default Widget;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
  const [userCount, setUserCount] = useState(0);
  const amount = 100; // Temporary amount for other widgets
  const diff = 20;    // Temporary diff percentage

  useEffect(() => {
    if (type === "user") {
      const fetchUserCount = async () => {
        try {
          const response = await axios.get("http://localhost:8800/api/users");
          setUserCount(response.data.length); // Set the count to the number of users
        } catch (error) {
          console.error("Error fetching user count:", error);
        }
      };
      fetchUserCount();
    }
  }, [type]);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        count: userCount,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "#000000",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        count: amount,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        count: amount,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        count: amount,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  const widgetContent = (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );

  return type === "user" ? (
    <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
      {widgetContent}
    </Link>
  ) : (
    widgetContent
  );
};

export default Widget;
