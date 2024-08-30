import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState<string[]>([]);

  const { data, error, isLoading } = useGetProductsQuery();
  const products = data?.products || [];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category.split(","));
    } else {
      // Clear selectedCategory if no category is provided in URL
      setSelectedCategory([]);
    }
  }, [location.search]);

  useEffect(() => {
    if (products.length > 0) {
      setCategories([...new Set(products.map((p) => p.category))]);
    }
  }, [products]);

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.category)
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value === "") {
      // Handle "All Categories"
      setSelectedCategory([]);
    } else {
      setSelectedCategory(
        selectedCategory.includes(value)
          ? selectedCategory.filter((cat) => cat !== value)
          : [...selectedCategory, value]
      );
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSearchTerm("");
    setSortOrder("asc");
  };

  // Handle error and display message
  let errorMessage = "Unknown error";
  if (error) {
    if ("status" in error && "data" in error) {
      errorMessage = `Error ${error.status}: ${JSON.stringify(error.data)}`;
    } else if ("message" in error && typeof error.message === "string") {
      errorMessage = error.message;
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {errorMessage}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold my-10 text-center">All Products</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="mb-5 md:mb-0 p-2 border rounded w-full md:w-1/4"
        />

        {/* Category Dropdown */}
        <div className="mb-5 md:mb-0 w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-2">Category</h2>
          <select
            value={selectedCategory.join(",")}
            onChange={handleCategoryChange}
            className="p-2 border rounded w-full"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Options */}
        <div className="mb-5 md:mb-0 w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="mb-5 md:mb-0 p-2 bg-red-500 text-white rounded w-full md:w-auto"
        >
          Clear Filters
        </button>
      </div>

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
