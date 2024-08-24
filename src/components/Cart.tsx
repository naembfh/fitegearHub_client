const Cart = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } z-50`} // High z-index for overlay
      aria-hidden={!isOpen}
    >
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        } ${isOpen ? "w-full md:w-1/2" : "w-0"} md:w-1/2 p-4 z-60`} // Higher z-index for the cart content
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-70" // Even higher z-index for the close button
        >
          <i className="fi fi-rr-x"></i>
        </button>
        {/* Modal content */}
        <h2 className="text-xl text-red-500 font-bold mb-4">Your Cart</h2>
        <h2 className="text-xl text-red-500 font-bold mb-4">Your Cart</h2>
        <h2 className="text-xl text-red-500 font-bold mb-4">Your Cart</h2>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {/* Add cart items here */}
      </div>
    </div>
  );
};

export default Cart;
