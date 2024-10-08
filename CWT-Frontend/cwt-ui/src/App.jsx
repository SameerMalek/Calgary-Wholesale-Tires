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
import CartPage from './routes/CartPage/CartPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartProvider from './context/CartContext';
import User from './AdminPanel/components/users/User';
import AdminProduct from "./AdminPanel/components/adminproduct/adminproduct";
import AdProduct from "./AdminPanel/components/adminproduct/adproduct";
import TermsAndConditions from "./routes/termscondition/termscondition";

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
          element: <Login/>,
        },
        {
          path: "/about",
          element: <AboutUs/>,
        },
        {
          path: "/contact",
          element: <ContactUs/>,
        },
        {
          path: "/form",
          element: <UserForm/>,
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
          path: "/users",  
          element: <User />,
        },
        {
          path: "/product",  
          element: <AdminProduct />,
        },
        {
          path: "/inventory",  
          element: <AdProduct />,
        },
        {
          path: "/termscondition",
          element: <TermsAndConditions />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminHome/>,
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  );
}

export default App;
