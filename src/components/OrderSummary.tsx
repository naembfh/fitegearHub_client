import React from "react";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  totalItems: number;
  handleClearCart: () => void;
  onProceedToCheckout: () => void; // New prop
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  taxAmount,
  totalAmount,
  totalItems,
  handleClearCart,
  onProceedToCheckout,
}) => {
  const navigate = useNavigate();
  const isCartEmpty = totalItems === 0;

  const handleCheckoutClick = () => {
    if (!isCartEmpty) {
      onProceedToCheckout(); // Hide cart modal
      navigate("/checkout");
    }
  };

  return (
    <div className="lg:w-60 w-full h-full bg-primary bg-opacity-35 border border-gray-300 rounded-lg p-4 text-gray-600">
      <div className="px-6 py-4 space-y-10">
        <h1 className="text-3xl font-bold text-dark">Order Summary</h1>
        <p className="text-sm text-dark mt-2">Selected Items: {totalItems}</p>
        <p className="text-sm text-dark mt-2">
          Total Price: ${subtotal.toFixed(2)}
        </p>
        <p className="text-sm text-dark mt-2">Tax: ${taxAmount.toFixed(2)}</p>
        <h3 className="text-xl font-semibold text-dark mt-4">
          Grand Total: ${totalAmount.toFixed(2)}
        </h3>
      </div>
      <div className="px-4 pb-6">
        <button
          onClick={handleClearCart}
          className="bg-red-500 px-3 py-2 text-white mt-2 rounded-md w-full text-xs flex justify-between items-center mb-4"
        >
          <span>Clear Cart</span>
          <i className="fi fi-rr-trash"></i>
        </button>
        <button
          onClick={handleCheckoutClick}
          className={`bg-indigo-600 px-3 py-2 text-white mt-2 rounded-md w-full text-xs flex justify-between items-center ${
            isCartEmpty ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isCartEmpty}
        >
          <span>{isCartEmpty ? "Cart is Empty" : "Proceed to Checkout"}</span>
          <i className="fi fi-rr-credit-card"></i>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
