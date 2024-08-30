import React from "react";
import { useNavigate } from "react-router-dom";

// Define the Category type
interface Category {
  name: string;
  image: string;
}

// Define the props interface
interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    console.log(`Showing products for ${category.name}`);
    // Navigate to the products page with the selected category
    navigate(`/products?category=${category.name}`);
  };

  return (
    <div className="relative border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">
          {category.name}
        </h3>
        <button
          onClick={handleShopNow}
          className="bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
