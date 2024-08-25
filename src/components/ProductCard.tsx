import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const isAddToCartDisabled = cartItem && cartItem.quantity >= product.stock;

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="relative">
      <div className="border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col h-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-75"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
          <p className="text-lg font-bold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleViewDetails}
            className="bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-800 transition duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
