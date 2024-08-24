import { useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./Cart";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-900 text-white rounded-sm px-3">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo (Home Button) */}
        <Link to="/" className="flex items-center">
          {/* Updated to Italian */}
          <span>Fitgear Hub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow items-center justify-center space-x-5">
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                to={"/products"}
              >
                Products
              </Link>
            </li>
            <li>
              <span className="rounded-lg p-1 inline-block">About</span>
            </li>
          </ul>
        </div>

        {/* Icons (Cart and User) */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Cart Icon */}
          <button
            className="rounded-lg p-1 inline-block relative"
            onClick={handleCartToggle}
          >
            <i className="fi fi-rr-dolly-flatbed"></i>
            <span className="rounded-full absolute top-[-10px] left-[20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Icon */}
          <button className="rounded-lg p-1 inline-block">
            <i className="fi fi-rr-circle-user"></i>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center space-y-5 mt-4">
            <li>
              <span className="rounded-lg p-1 inline-block">Products</span>
            </li>
            <li>
              <span className="rounded-lg p-1 inline-block">About</span>
            </li>
            {/* Cart Icon in Mobile Menu */}
            <li className="relative">
              <button className="rounded-lg p-1 inline-block">
                <i className="fi fi-rr-dolly-flatbed"></i>
              </button>
              <span className="rounded-full absolute top-[-10px] left-[20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                2
              </span>
            </li>
            {/* User Icon in Mobile Menu */}
            <li>
              <button className="rounded-lg p-1 inline-block">
                <i className="fi fi-rr-circle-user"></i>
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={handleCartToggle} />
    </nav>
  );
};

export default Navbar;
