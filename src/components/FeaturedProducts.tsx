import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApi";
import { Product, ProductsResponse } from "../types/types"; // Ensure this import is correct
import ProductCart from "./ProductCard";

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductsQuery();

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state with proper type checking
  if (error) {
    const errorMessage =
      "status" in error
        ? `Error occurred: ${error.status}` // Example: Check for status property
        : "Unknown error occurred";
    return <p>{errorMessage}</p>;
  }

  // Ensure data is defined and cast it to ProductsResponse
  const productsResponse = data as ProductsResponse;
  const products: Product[] = productsResponse?.products || [];

  // Slice the products to get the top-rated ones
  const topRatedProducts = products.slice(0, 3);

  const handleExploreMore = () => {
    navigate("/products");
  };

  return (
    <div className="container my-10">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {topRatedProducts.map((product: Product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={handleExploreMore}
          className="bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
