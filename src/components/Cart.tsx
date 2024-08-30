import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { RootState } from "../redux/store";
import CartDetails from "./CartDetails";
import OrderSummary from "./OrderSummary";

// Define props type
interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const dispatch = useDispatch();
  const { cartItems, subtotal, taxAmount, totalAmount, totalItems } =
    useSelector((state: RootState) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } z-50`}
      aria-hidden={!isOpen}
    >
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        } ${isOpen ? "w-full md:w-1/2" : "w-0"} md:w-1/2 p-4 z-60`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-70"
        >
          <i className="fi fi-rr-cross-circle text-4xl"></i>
        </button>
        <div className="mt-12 lg:grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <CartDetails cartItems={cartItems} />
          </div>
          <div className="col-span-2">
            <OrderSummary
              subtotal={subtotal}
              taxAmount={taxAmount}
              totalAmount={totalAmount}
              totalItems={totalItems}
              handleClearCart={handleClearCart}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
