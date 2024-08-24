import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../components/Products";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/products",
    element: <Products></Products>,
  },
]);
