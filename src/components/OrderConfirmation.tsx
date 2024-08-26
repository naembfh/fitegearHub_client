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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View My Orders
      </button>
    </div>
  );
};

export default OrderConfirmation;
