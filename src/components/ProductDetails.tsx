import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetProductByIdQuery } from "../redux/api/productsApi";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const ProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProductByIdQuery(id ?? "");
  const product = data?.product;

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const cartItem = cartItems.find((item) => item.id === id);

  const isAddToCartDisabled =
    cartItem && product && cartItem.quantity >= product.stock;

  const handleAddToCart = () => {
    if (isAddToCartDisabled) {
      toast.error("Maximum stock limit reached for this product!", {
        duration: 2000,
      });
    } else {
      dispatch(
        addToCart({
          ...product!,
          quantity: 1, // Default quantity to 1
        })
      );
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
      <div className="flex flex-col md:flex-row justify-center items-center border-2 border-gray-200 shadow-xl rounded-xl p-4">
        <div className="md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full" />
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">Price: ${product.price}</p>
          <p className="text-sm mb-4">Stock: {product.stock}</p>
          <button
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
            className={`py-2 px-4 rounded-lg text-white ${
              isAddToCartDisabled ? "bg-gray-400" : "bg-blue-500"
            }`}
          >
            {isAddToCartDisabled ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
