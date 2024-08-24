import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, error, isLoading } = useGetProductsQuery();
  const products = data?.products || [];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  // Get unique categories from products for the select dropdown
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Products</h1>

      {/* Category Select Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mb-5 p-2 border rounded"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
