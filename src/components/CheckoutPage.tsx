import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCreateOrderMutation } from "../redux/api/orderApi.ts";
import { clearCart } from "../redux/features/cartSlice.ts";
import { RootState } from "../redux/store";
import CartDetails from "./CartDetails";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, subtotal, taxAmount, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [createOrder] = useCreateOrderMutation();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [invalidFields, setInvalidFields] = useState<{
    name: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
  }>({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setInvalidFields((prevInvalid) => ({
      ...prevInvalid,
      [name]: false,
    }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value as "cod" | "stripe");
  };

  const handlePlaceOrder = async () => {
    const newInvalidFields = {
      name: !userDetails.name,
      email: !userDetails.email,
      phone: !userDetails.phone,
      address: !userDetails.address,
    };

    if (Object.values(newInvalidFields).some((field) => field)) {
      setInvalidFields(newInvalidFields);
      toast("Please fill in all user details.");
      return;
    }

    // Prepare order details
    const orderDetails = {
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
      items: cartItems,
      totalAmount,
      paymentMethod,
    };

    try {
      // Create the order in the backend
      const response = await createOrder(orderDetails).unwrap();

      if (response.message === "Order created successfully") {
        // Clear the cart
        dispatch(clearCart());

        // Navigate to the My Orders page if user is logged in
        if (user) {
          navigate("/my-orders");
        } else {
          // Show success message and navigate to order confirmation page
          toast.success("Your order has been created successfully!");
          navigate("/order-confirmation");
        }
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container lg:grid grid-cols-6 gap-4 w-md-7xl mx-auto p-4 flex flex-col">
      <div className="col-span-3 p-4 border border-gray-300 rounded-lg mb-4">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleUserDetailsChange}
          placeholder="Name"
          className={`w-full p-2 mb-4 border ${
            invalidFields.name ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleUserDetailsChange}
          placeholder="Email"
          className={`w-full p-2 mb-4 border ${
            invalidFields.email ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        <input
          type="tel"
          name="phone"
          value={userDetails.phone}
          onChange={handleUserDetailsChange}
          placeholder="Phone Number"
          className={`w-full p-2 mb-4 border ${
            invalidFields.phone ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        <input
          type="text"
          name="address"
          value={userDetails.address}
          onChange={handleUserDetailsChange}
          placeholder="Delivery Address"
          className={`w-full p-2 mb-4 border ${
            invalidFields.address ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
      </div>

      <div className="col-span-2 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Cart Details</h2>
        <CartDetails cartItems={cartItems} />
        <div className="mt-4">
          <p className="text-sm">Subtotal: ${subtotal.toFixed(2)}</p>
          <p className="text-sm">Tax: ${taxAmount.toFixed(2)}</p>
          <h3 className="text-xl font-semibold">
            Grand Total: ${totalAmount.toFixed(2)}
          </h3>
        </div>
      </div>

      <div className="col-span-1 p-4 border border-gray-300 rounded-lg mb-4">
        <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
        <label className="flex items-center mb-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Cash on Delivery
        </label>
        <label className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentMethod"
            value="stripe"
            checked={paymentMethod === "stripe"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Stripe Payment
        </label>
        <button
          onClick={handlePlaceOrder}
          className="bg-indigo-600 px-4 py-2 text-white rounded-md"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
