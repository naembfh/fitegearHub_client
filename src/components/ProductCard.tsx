import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  // const cartItems = useAppSelector((state) => state.cart.cartItems);
  // const cartItem = cartItems.find((item) => item.id === product.id);

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="relative">
      <div className="border rounded-lg shadow-lg overflow-hidden bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col h-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-75"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
          <p className="text-lg text-gray-900 font-bold text-gray-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleViewDetails}
            className="bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
