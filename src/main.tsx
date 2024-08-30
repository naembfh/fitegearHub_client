import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { store } from "./redux/store";
import { router } from "./routes";
import usePageUnloadWarning from "./util/usePageUnloadWarning";

// Define a component that uses the hook inside the Provider
const AppWrapper: React.FC = () => {
  usePageUnloadWarning(); // Now it's inside the context of Provider

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper /> {/* Use the component here */}
    </Provider>
  </StrictMode>
);
