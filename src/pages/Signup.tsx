import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignUpMutation } from "../redux/api/authApi";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  // Specify the type for the event parameter
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({ username, name, email, password }).unwrap();
      toast.success("Sign up successful, please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error("Sign up failed, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="w-1/3 max-w-sm p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`w-full bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
