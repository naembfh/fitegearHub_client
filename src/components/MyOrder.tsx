import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetOrdersByEmailQuery } from "../redux/api/orderApi";
import { selectCurrentUser } from "../redux/features/authSlice";

const MyOrders = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // Fetch orders by user email using RTK Query
  const {
    data: orders,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error loading orders</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
