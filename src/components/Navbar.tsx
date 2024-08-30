import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import CartModal from "./Cart";

const Navbar = () => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const user = useAppSelector((store) => store.auth.user); // Access user directly from state
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
    toast.success("🛒 Your cart will disappear if you refresh.", {
      duration: 5000,
    });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginLogout = () => {
    if (user) {
      dispatch(logout());
      toast.success("Logged out successfully");
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  // const handleLoginSuccess = () => {
  //   toast.success("Logged in successfully");
  //   const { from } = location.state || { from: "/" };
  //   navigate(from);
  // };

  // Example usage: if you have a login action, use handleLoginSuccess there
  // You might use handleLoginSuccess in a login component or after authentication
  // Example: if (loginSuccess) handleLoginSuccess();

  return (
    <nav className="bg-gray-900 text-white rounded-sm px-3">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <span>Fitgear Hub</span>
        </Link>

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
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                to={"/about"}
              >
                About
              </Link>
            </li>
            {user && user.role === "admin" && (
              <li>
                <Link
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                  to={"/management"}
                >
                  Management
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                  to={"/my-orders"}
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <button
            className="rounded-lg p-1 inline-block relative"
            onClick={handleCartToggle}
          >
            <i className="fi fi-rr-dolly-flatbed"></i>
            <span className="rounded-full absolute top-[-10px] left-[20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>

          <button
            onClick={handleLoginLogout}
            className="rounded-lg p-1 inline-block"
          >
            <i
              className={`fi ${
                user ? "fi fi-rr-sign-out-alt" : "fi-rr-circle-user"
              }`}
            ></i>
          </button>
        </div>

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

      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center space-y-5 mt-4">
            <li>
              <span className="rounded-lg p-1 inline-block">Products</span>
            </li>
            <li>
              <span className="rounded-lg p-1 inline-block">About</span>
            </li>
            {user && user.role === "admin" && (
              <li>
                <Link
                  className="rounded-lg p-1 inline-block"
                  to={"/management"}
                >
                  Management
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link className="rounded-lg p-1 inline-block" to={"/my-orders"}>
                  My Orders
                </Link>
              </li>
            )}
            <li className="relative">
              <button
                className="rounded-lg p-1 inline-block"
                onClick={handleCartToggle}
              >
                <i className="fi fi-rr-dolly-flatbed"></i>
              </button>
              <span className="rounded-full absolute top-[-10px] left-[20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </li>
            <li>
              <button
                onClick={handleLoginLogout}
                className="rounded-lg p-1 inline-block"
              >
                <i
                  className={`fi ${
                    user ? "fi fi-rr-sign-out-alt" : "fi-rr-circle-user"
                  }`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={handleCartToggle} />
    </nav>
  );
};

export default Navbar;
