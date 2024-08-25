import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetProductByIdQuery } from "../redux/api/productsApi";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  let { data: product, error, isLoading } = useGetProductByIdQuery(id);
  product = product?.product;
  console.log(product);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === Number(id));
  const isAddToCartDisabled =
    cartItem && product && cartItem.quantity >= product.stock;

  const handleAddToCart = () => {
    if (isAddToCartDisabled) {
      toast.error("Maximum stock limit reached for this product!", {
        duration: 2000,
      });
    } else {
      dispatch(addToCart(product));
      toast.success("Item added to cart!", {
        duration: 2000,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center items-center border-2 border-indigo-700 p-4">
        <div className="w-full md:w-1/2 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover border border-indigo-700"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            {product.name}
          </h2>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-bold text-indigo-600 mb-4">
            ${product.price ? product.price.toFixed(2) : "N/A"}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            In Stock: {product.stock}
          </p>
          <button
            onClick={handleAddToCart}
            className={`bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-800 transition duration-300 shadow-md hover:shadow-lg ${
              isAddToCartDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isAddToCartDisabled}
          >
            {isAddToCartDisabled ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
