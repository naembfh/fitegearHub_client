import getAllProducts from "../data/product";
import CategoryCard from "./CategoryCard";

const CategoryGrid = () => {
  const getUniqueCategories = (products) => {
    const categoryMap = new Map();
    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          name: product.category,
          image: product.categoryImage,
        });
      }
    });
    return Array.from(categoryMap.values());
  };
  const products = getAllProducts();
  const categories = getUniqueCategories(products);

  // Slicing the categories for different rows
  const firstRow = categories.slice(0, 2); // First two categories
  const secondRow = categories.slice(2, 3); // One category
  const thirdRow = categories.slice(3, 5); // Next two categories

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
