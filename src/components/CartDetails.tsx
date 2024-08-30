import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { removeFromCart, updateQuantity } from "../redux/features/cartSlice";

// Define the CartItem interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Define the props interface
interface CartDetailsProps {
  cartItems: CartItem[];
}

const CartDetails = ({ cartItems }: CartDetailsProps) => {
  const dispatch = useDispatch();

  const handleIncrement = (id: string) => {
    dispatch(updateQuantity({ id, change: "increment" }));
    toast.success("Quantity increased!", { duration: 2000 });
  };

  const handleDecrement = (id: string) => {
    dispatch(updateQuantity({ id, change: "decrement" }));
    toast.success("Quantity decreased!", { duration: 2000 });
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ id }));
    toast.success("Item removed from cart!", { duration: 2000 });
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border border-gray-300 rounded-lg p-4 bg-white shadow-md"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="flex-grow mx-4">
            <h3 className="text-lg font-semibold text-gray-700 truncate mb-2">
              {item.name}
            </h3>
            <p className="text-lg font-bold text-gray-600">${item.price}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDecrement(item.id)}
              className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800"
            >
              <i className="fi fi-rr-minus-circle"></i>
            </button>
            <span className="text-lg font-semibold text-gray-500">
              {item.quantity}
            </span>
            <button
              onClick={() => handleIncrement(item.id)}
              className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800"
            >
              <i className="fi fi-rr-add"></i>
            </button>
          </div>
          <button
            onClick={() => handleRemove(item.id)}
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 ml-2"
          >
            <i className="fi fi-rr-trash"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartDetails;
