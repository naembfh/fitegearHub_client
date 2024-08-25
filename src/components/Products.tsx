import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    [] // Multiple categories can be selected
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, error, isLoading } = useGetProductsQuery();
  const products = data?.products || [];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category.split(","));
    }
  }, [location]);

  // Get unique categories from products for the select dropdown
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter products based on selected categories and search term
  const filteredProducts = products
    .filter((product) =>
      selectedCategory.length
        ? selectedCategory.includes(product.category)
        : true
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(
      selectedCategory.includes(value)
        ? selectedCategory.filter((cat) => cat !== value)
        : [...selectedCategory, value]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSearchTerm("");
    setSortOrder("asc");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Products</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="mb-5 p-2 border rounded"
      />

      {/* Category Filters */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        {categories.map((category) => (
          <label key={category} className="block">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategory.includes(category)}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Sorting Options */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="mb-5 p-2 bg-red-500 text-white rounded"
      >
        Clear Filters
      </button>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
