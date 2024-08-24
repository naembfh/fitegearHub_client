import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
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
          className="bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-900 transition duration-300 shadow-md hover:shadow-lg"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
