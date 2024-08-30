import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { clearCart } from "../redux/features/cartSlice";
import { RootState } from "../redux/store"; // Adjust the import path as needed

const usePageUnloadWarning = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        // Modern browsers will show a generic message, not the custom one
        event.preventDefault();
        event.returnValue = ""; // Required for the warning dialog to appear
      }
    };

    const handleUnload = () => {
      if (cartItems.length > 0) {
        // Ask for confirmation before clearing the cart and logging out
        const confirmationMessage =
          "You have items in your cart. If you leave this page, you will lose your cart items and be logged out. Are you sure you want to leave?";
        if (window.confirm(confirmationMessage)) {
          // Clear the cart and log out
          dispatch(clearCart());
          dispatch(logout());
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [cartItems, dispatch]);
};

export default usePageUnloadWarning;
