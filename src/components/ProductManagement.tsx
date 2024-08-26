import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../redux/api/productsApi";

const ProductManagement = () => {
  const { data = {}, refetch } = useGetProductsQuery();
  const products = data.products || []; // Ensure products is an array

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        imageUrl: editingProduct.imageUrl || "",
        category: editingProduct.category || "",
        stock: editingProduct.stock || "",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
        stock: "",
      });
    }
  }, [editingProduct]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async () => {
    try {
      await addProduct(formData).unwrap();
      toast.success("Product added successfully");
      refetch();
      setFormData({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct({
        id: editingProduct._id,
        product: formData,
      }).unwrap();
      toast.success("Product updated successfully");
      refetch();
      setEditingProduct(null);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {editingProduct ? "Update Product" : "Add New Product"}
        </h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Product Name"
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleFormChange}
          placeholder="Price"
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          placeholder="Description"
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleFormChange}
          placeholder="Image URL"
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleFormChange}
          placeholder="Category"
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleFormChange}
          placeholder="Stock"
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setFormData({
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      imageUrl: product.imageUrl,
                      category: product.category,
                      stock: product.stock,
                    });
                  }}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
