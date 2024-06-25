"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import { Alert } from "@/components/alert"; // Assuming you have your own Alert component

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && password.length <= 16;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password should be 8-16 characters long.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.1.11:8001/api/auth/sign-up",
        {
          name,
          email,
          password,
        }
      );
      console.log("Signup success:", response.data);
      // Handle success scenario, e.g., show success message or redirect
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error scenario, e.g., display error message to user
      setError("Signup failed. Please try again.");
      setIsLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-indigo-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center space-y-6 max-w-md px-6 sm:px-4 lg:px-8 py-8 bg-gray-100 border rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Signup</h2>
        {/* Name input */}
        <div className="w-full">
          <label
            htmlFor="name"
            className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
          >
            Name
          </label>
          <div className="flex items-center border border-gray-300 rounded focus-within:border-blue-500">
            <input
              className="w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 focus:outline-none"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="Enter your name"
            />{" "}
            <FaUser className="h-5 w-5 text-gray-700 mx-3" /> {/* User icon */}
          </div>
        </div>
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
          <button
            type="button"
            className="absolute bottom-0 top-[25px] right-0 flex items-center px-3 text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>
        {error && <Alert>{error}</Alert>}
        <button
          className="inline-flex items-center justify-center w-full h-11 px-8 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
