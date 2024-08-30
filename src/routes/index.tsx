import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CheckoutPage from "../components/CheckoutPage";
import ProductDetails from "../components/ProductDetails";
import Products from "../components/Products";

import Container from "../components/Container";
import MyOrders from "../components/MyOrder";
import OrderConfirmation from "../components/OrderConfirmation";
import ProductManagement from "../components/ProductManagement";
import AboutUs from "../pages/AboutUs";
import Home from "../pages/Home";
import LoginForm from "../pages/Login";
import SignUpForm from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

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
        element: (
          <Container>
            <Products></Products>
          </Container>
        ),
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "management",
        element: (
          <ProtectedRoute>
            <ProductManagement></ProductManagement>
          </ProtectedRoute>
        ),
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUpForm></SignUpForm>,
  },
]);

export default router;
