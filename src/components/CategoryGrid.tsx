import React from "react";
import { useGetProductsQuery } from "../redux/api/productsApi";
import CategoryCard from "./CategoryCard";

const CategoryGrid: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const getUniqueCategories = (products) => {
    const categoryMap = new Map();
    products.products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          name: product.category,
          image: product.categoryImage,
        });
      }
    });
    return Array.from(categoryMap.values());
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  // Ensure products data is available before extracting categories
  const categories = products ? getUniqueCategories(products) : [];
  const firstRow = categories.slice(0, 2);
  const secondRow = categories.slice(2, 3);
  const thirdRow = categories.slice(3, 5);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-10">Categories</h1>

      {/* First row with two categories */}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10">
        {firstRow.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>

      {/* Second row with one category */}
      <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-10 my-10">
        {secondRow.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>

      {/* Third row with two categories */}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10">
        {thirdRow.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
