import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");
  const navigate = useNavigate();

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value as "cod" | "stripe");
  };

  const handlePlaceOrder = () => {
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.phone ||
      !userDetails.address
    ) {
      alert("Please fill in all user details.");
      return;
    }

    if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      navigate("/my-orders");
    } else if (paymentMethod === "stripe") {
      // Handle Stripe payment
      navigate("/stripe-checkout");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 border border-gray-300 rounded-lg mb-4">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleUserDetailsChange}
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleUserDetailsChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="tel"
          name="phone"
          value={userDetails.phone}
          onChange={handleUserDetailsChange}
          placeholder="Phone Number"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="address"
          value={userDetails.address}
          onChange={handleUserDetailsChange}
          placeholder="Delivery Address"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
      </div>

      <div className="p-4 border border-gray-300 rounded-lg">
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
          Pay with Stripe
        </label>
        <button
          onClick={handlePlaceOrder}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
