"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link"; // Ensure Link is imported for navigation
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa"; // Icons for password visibility toggle
import { Alert } from "@/components/alert"; // Assuming you have a custom alert component
import "tailwindcss/tailwind.css"; // Import Tailwind CSS for styling

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  // Validate password length
  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && password.length <= 16;
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Validate password length
    if (!validatePassword(password)) {
      setError("Password should be 8-16 characters long.");
      return;
    }
    // Reset error state
    setError(null);
    setIsLoading(true);

    try {
      // Make API call to login
      const response = await axios.post(
        "http://192.168.1.11:8001/api/auth/sign-in",
        {
          email,
          password,
        }
      );
      console.log("Login success:", response.data);
      // Show success message
      setSuccessMessage("Login successful! Redirecting...");
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/home"); // Navigate to home page
      }, 2000); // 2 seconds timeout
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-indigo-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center space-y-6 max-w-md px-6 sm:px-4 lg:px-8 py-8 bg-gray-100 border rounded-lg shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
          Login
        </h2>

        {/* Success message */}
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Email input */}
        <div className="w-full relative">
          <label
            htmlFor="email"
            className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
          >
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded focus-within:border-blue-500">
            <input
              className="w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Enter your email"
            />
            <FaEnvelope className="h-5 w-5 text-gray-700 mx-3" />{" "}
            {/* Mail icon */}
          </div>
        </div>
        {/* Password input */}
        <div className="w-full relative">
          <label
            htmlFor="password"
            className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
          />
          {/* Password visibility toggle */}
          <button
            type="button"
            className="absolute bottom-0 top-[25px] right-0 flex items-center px-3 text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-700" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Submit button */}
        <button
          className="inline-flex items-center justify-center w-full h-11 md:h-12 lg:h-14 px-8 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        {/* Link to Signup */}
        <p className="text-center text-gray-700 text-sm sm:text-base mt-2">
          Need to create an account?{" "}
          <Link href="/signup" passHref>
            <span className="text-blue-500 hover:underline">
              Create Account
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
