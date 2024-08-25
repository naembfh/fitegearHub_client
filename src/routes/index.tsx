// Import necessary components and libraries
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../components/Products";

import CheckoutPage from "../components/CheckoutPage";
import ProductDetails from "../components/ProductDetails";
import Home from "../pages/Home";
import LoginForm from "../pages/Login";

// Define the routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

export default router;
