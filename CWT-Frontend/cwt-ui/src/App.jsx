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
          path: "/products", 
          element: <ProductPage />,
        },
        {
          path: "/products/:id", 
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
