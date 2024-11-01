import { Outlet, useLocation } from "react-router-dom";
import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

 function Layout() {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)
  const location = useLocation();
  const isProductPage = location.pathname === "/products";
  return (
     <div className={`layout ${isProductPage ? 'product-page' : ''}`}>
    <div className="navbar">
    <Navbar/>
    </div>
    <div className="content">
     <Outlet/>
    </div>
    <div className="footer">
     <Footer />
    </div>
  </div>
  )
}


//  function RequireAuth() {
//   const {currentUser} = useContext(AuthContext);
//   return (
//     !currentUser? (
//       <Navigate to="/login"/>
//     ) : (
//     <div className="layout">
//     <div className="navbar">
//     <Navbar/>
//     </div>
//     <div className="content">
//      <Outlet/>
//     </div>
//   </div>
//     )
//   )
// }

export {
  Layout
//   RequireAuth,
}
