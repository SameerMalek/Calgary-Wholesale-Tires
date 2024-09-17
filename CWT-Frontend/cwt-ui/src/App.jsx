import "./layout.scss"; 
import AboutUs from "./routes/about/aboutUs";
import ContactUs from "./routes/contact/contactUs";
import Home from "./routes/homepage/homepage";
import { Layout } from "./routes/Layout/layout";
import Login from "./routes/login/login";
import ProductPage from './routes/ProductPage/ProductPage'; 
import DetailedProductPage from './routes/ProductPage/DetailedProductPage'; // Import the new component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
          path: "/products", 
          element: <ProductPage />,
        },
        {
          path: "/products/:id",  // New Route
          element: <DetailedProductPage />, // Route for Detailed Product Page
        }
      ],
    },
  ]);

  return <RouterProvider router={router}/>;
}

export default App;




