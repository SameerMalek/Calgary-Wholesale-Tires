import "./layout.scss"; 
import AboutUs from "./routes/about/aboutUs";
import ContactUs from "./routes/contact/contactUs";
import Home from "./routes/homepage/homepage";
import { Layout } from "./routes/Layout/layout";
import Login from "./routes/login/login";
import DetailedProductPage from './routes/ProductPage/DetailedProductPage';
import ProductPage from './routes/ProductPage/ProductPage';
import AdminHome from "./AdminPanel/pages/home/AdminHome";
import UserForm from "./routes/form/userform";
import ProfilePage from "./routes/profilePage/profilePage";
import CartPage from './routes/CartPage/CartPage';
import PaymentStatusPage from "./routes/PaymentStatusPage/PaymentStatusPage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartProvider from './context/CartContext';
import AdminProduct from "./AdminPanel/components/adminproduct/adminproduct";
import OrderManagement from './AdminPanel/components/order/OrderManagement';
import AdProduct from "./AdminPanel/components/adminproduct/adproduct";
import TermsAndConditions from "./routes/termscondition/termscondition";
import AdminProfile from "./AdminPanel/components/adminprofile/adminprofile";
import Wishlist from "./routes/wishlist/wishlist";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";
import ResetPassword from "./routes/ForgotPassword/ResetPassword";
import VerifyOtp from "./routes/ForgotPassword/VerifyOtp";
import UpdatePassword from "./routes/ForgotPassword/UpdatePassword";
import FilteredProductPage from "./routes/filtered-products/filterProductPage";
import Delivery from "./AdminPanel/components/delivery/Delivery"; 
import OrderHistory from './components/orderhistory/orderhistory';
import User from "./AdminPanel/components/users/User";
import AdminRegister from "./AdminPanel/pages/AdminRegister/AdminRegister";
import AdminLogin from "./AdminPanel/pages/AdminLogin/AdminLogin";
import ScrollToTop from "./scrollToTop";
import LoadingProvider from "./context/loadingContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/ProfilePage",
          element:<ProfilePage />,
        },
        {
          path: "/forgot-password",
          element:<ForgotPassword />,
        },
        {
          path: "/verify-otp",
          element: <VerifyOtp/>,
        },
        {
          path: "/update-password",
          element: <UpdatePassword/>,
        },
        {
          path: "/reset-password",
          element:<ResetPassword />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/form",
          element: <UserForm />,
        },
        {
          path: "/category/:categoryId/products", 
          element: <ProductPage />,
        },
        {
          path: "/product/:id", 
          element: <DetailedProductPage />,
        },
        {
          path: "/cart",  
          element: <CartPage />,
        },
        {
          path: "/payment-status",   
          element: <PaymentStatusPage />,  
        },
        {
          path: "/users",  
          element: <User />,
        },
        {
          path: "/product",  
          element: <Home />,
        },
        {
          path: "/inventory",  
          element: <AdProduct />,
        },
        {
          path: "/termscondition",
          element: <TermsAndConditions />,
        },
        {
          path: "/products",
          element: <Home />,
        },
        {
          path: "/orderHistory",
          element: <OrderHistory />,
        },
        
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path:"/filter-products" ,
          element:<FilteredProductPage />,
        },
      ],
    },
    {
      path: "/admin/dashboard",
      element: <AdminHome />,
    },
    {
      path: "/admin/admin-register",
      element: <AdminRegister />,
    },
    {
      path: "/admin/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/orders",  
      element: <OrderManagement />, 
    },
    {
      path: "/admin/delivery",  
      element: <Delivery />,
    },
    {
      path: "/admin/products",  
      element: <AdProduct />,
    },
    {
      path: "/admin/users",  
      element: <User />,
    },
  ]);

  return (
    <LoadingProvider>
    <CartProvider>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </CartProvider>
  </LoadingProvider>
  );
}

export default App;
