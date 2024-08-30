import React from "react";
import { default as image1, default as image4 } from "../assets/image (1).jpg";
import image2 from "../assets/image (1).webp";
import image3 from "../assets/image (2).jpg";
import image5 from "../assets/image (4).jpg";
import image6 from "../assets/image (5).jpg";
import image7 from "../assets/image (6).jpg";
import image8 from "../assets/image (7).jpg";

type Product = {
  id: number;
  image: string;
  name: string;
  feedback: string;
  customerName: string;
};

const products: Product[] = [
  {
    id: 1,
    image: image1,
    name: "Premium Yoga Mat",
    feedback:
      "An exceptional yoga mat with excellent grip and cushioning. Perfect for all levels of practice.",
    customerName: "John Doe",
  },
  {
    id: 2,
    image: image2,
    name: "Adjustable Dumbbells Set",
    feedback:
      "Highly versatile dumbbells with adjustable weights, ideal for a wide range of exercises.",
    customerName: "Jane Smith",
  },
  {
    id: 3,
    image: image3,
    name: "Smart Fitness Tracker",
    feedback:
      "Tracks your activity, sleep, and heart rate with precision. A must-have for staying on top of your fitness goals.",
    customerName: "Michael Brown",
  },
  {
    id: 4,
    image: image4,
    name: "High-Performance Running Shoes",
    feedback:
      "Designed for comfort and durability, these running shoes offer excellent support and traction for every stride.",
    customerName: "Emily Davis",
  },
  {
    id: 5,
    image: image5,
    name: "Durable Resistance Bands",
    feedback:
      "These resistance bands are perfect for strength training and flexibility exercises, built to last with varied resistance levels.",
    customerName: "Chris Wilson",
  },
  {
    id: 6,
    image: image6,
    name: "Premium Foam Roller",
    feedback:
      "Ideal for muscle recovery and relief, this foam roller provides effective deep tissue massage for better performance.",
    customerName: "Patricia Taylor",
  },
  {
    id: 7,
    image: image7,
    name: "Compact Exercise Bike",
    feedback:
      "Space-saving design with adjustable resistance levels, perfect for an effective workout at home without compromising on quality.",
    customerName: "David Anderson",
  },
  {
    id: 8,
    image: image8,
    name: "Versatile Jump Rope",
    feedback:
      "A sturdy and adjustable jump rope that enhances cardio workouts. Ideal for building endurance and coordination.",
    customerName: "Laura Martinez",
  },
  {
    id: 9,
    image: image1,
    name: "Ergonomic Adjustable Bench",
    feedback:
      "A solid and adjustable bench that provides great support for various weightlifting exercises. Built for stability and comfort.",
    customerName: "James Lee",
  },
];

// Shuffle function to randomize product order
const shuffleArray = (array: Product[]): Product[] => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const ImageGallery: React.FC = () => {
  const shuffledProducts = shuffleArray([...products]);

  return (
    <div className="container my-10">
      <h2 className="text-3xl font-bold mb-8">Top Picks from Our Clients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {shuffledProducts.slice(0, 5).map((product: Product) => (
          <div key={product.id} className="relative w-full h-60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full rounded-lg object-cover shadow-lg border border-gray-300 filter brightness-90 sharpness-100"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white p-4 rounded-lg">
              <p className="text-sm italic">{`"${product.feedback}"`}</p>
              <p className="font-bold text-lg">{product.name}</p>
              <p className="text-xs italic mt-2">{product.customerName}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {shuffledProducts.slice(5).map((product: Product) => (
          <div key={product.id} className="relative w-full h-60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full rounded-lg object-cover shadow-lg border border-gray-300 filter brightness-90 sharpness-100"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white p-4 rounded-lg">
              <p className="text-sm italic">{`"${product.feedback}"`}</p>
              <p className="font-bold text-lg">{product.name}</p>
              <p className="text-xs italic mt-2">{product.customerName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
