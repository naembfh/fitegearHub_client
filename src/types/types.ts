export interface Product {
  _id: string; // MongoDB's default identifier field
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  categoryImage?: string; // Optional
  stock: number; // If you are tracking stock in the cart
  benefit: string;
}

// Define the structure for an Order
// export interface Order {
//   id: string;
//   items: Product[];
//   totalAmount: number;
//   createdAt: string; // or Date
//   status: string;
//   message?: string; // For handling API responses
// }

// Define the structure for a User
export interface TUser {
  id: string;
  email: string;
  name: string;
  phone?: string; // Optional
  address?: string; // Optional
}

export interface ProductsResponse {
  message: string;
  products: Product[];
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalAmount: number;
  paymentMethod: "cod" | "stripe";
  status: string;
  createdAt: string; // or Date
  message?: string;
}
