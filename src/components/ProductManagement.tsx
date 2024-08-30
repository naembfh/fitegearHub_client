import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../redux/api/productsApi";
import { Product } from "../types/types";
import Modal from "./Modal";

const ProductManagement: React.FC = () => {
  const { data = { products: [] }, refetch } = useGetProductsQuery();
  const products: Product[] = data.products || [];

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
    category: "",
    categoryImage: "",
    stock: 0,
    benefit: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || 0,
        description: editingProduct.description || "",
        imageUrl: editingProduct.imageUrl || "",
        category: editingProduct.category || "",
        categoryImage: editingProduct.categoryImage || "",
        stock: editingProduct.stock || 0,
        benefit: editingProduct.benefit || "",
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
        category: "",
        categoryImage: "",
        stock: 0,
        benefit: "",
      });
    }
  }, [editingProduct]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      await addProduct(formData as Partial<Product>).unwrap();
      toast.success("Product added successfully");
      refetch();
      setFormData({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
        category: "",
        categoryImage: "",
        stock: 0,
        benefit: "",
      });
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct({
        id: editingProduct.id,
        product: formData as Partial<Product>,
      }).unwrap();
      toast.success("Product updated successfully");
      refetch();
      setEditingProduct(null);
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
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
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded"
        >
          Create Product
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
              Stock
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
              <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setShowModal(true);
                  }}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Create/Update Product */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? "Update Product" : "Add New Product"}
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price
              <input
                type="number"
                name="price"
                value={formData.price || 0}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Stock
              <input
                type="number"
                name="stock"
                value={formData.stock || 0}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
              <input
                type="text"
                name="description"
                value={formData.description || ""}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Image URL
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
              <input
                type="text"
                name="category"
                value={formData.category || ""}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category Image URL
              <input
                type="text"
                name="categoryImage"
                value={formData.categoryImage || ""}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Benefit
              <input
                type="text"
                name="benefit"
                value={formData.benefit || ""}
                onChange={handleFormChange}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={
                editingProduct ? handleUpdateProduct : handleCreateProduct
              }
              className="bg-blue-500 text-white p-2 rounded"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
