import React from "react";
import { useGetProductsQuery } from "../redux/api/productsApi";
import { Product, ProductsResponse } from "../types/types"; // Ensure this import is correct

const BenefitsSection: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  const products = (data as ProductsResponse)?.products || [];

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    const errorMessage =
      "status" in error
        ? `Error occurred: ${error.status}`
        : "message" in error
        ? `Error occurred: ${error.message}`
        : "Unknown error occurred";
    return <p>{errorMessage}</p>;
  }

  // Selecting top 6 products for display
  const productsWithBenefits = products.slice(0, 6);

  return (
    <div className="container my-10">
      <h2 className="text-3xl font-bold mb-8">Benefits of Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsWithBenefits.map((product: Product, index: number) => (
          <div
            key={product.id}
            className={`flex border p-4 rounded-lg shadow-md bg-gray-900 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <img
              src={product.imageUrl}
              alt={product.benefit}
              className="w-1/2 h-auto rounded-lg object-cover"
            />
            <div className="w-1/2 p-4">
              <p className="text-gray-100 mt-2">{product.benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
