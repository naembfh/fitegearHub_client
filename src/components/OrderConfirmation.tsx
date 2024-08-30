import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <p className="text-lg mb-4">
        Thank you for your order! Your order has been successfully created.
      </p>
      <button
        onClick={() => navigate("/my-orders")}
        className="bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded"
      >
        View My Orders
      </button>
    </div>
  );
};

export default OrderConfirmation;
