import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getAllProducts from "../data/product";
import ProductCard from "./ProductCard";

const Products = () => {
  const allProducts = getAllProducts();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Parse query parameters to get the selected category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  // Get unique categories from products for the select dropdown
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
