"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "@/apiConfig";

const Signup: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be at least 3 characters")
        .max(50, "Name should not exceed 50 characters"),
      email: yup
        .string()
        .matches(emailRegex, 'Invalid email address')
        .email("Invalid email")
        .required("Email is required")
        .test('firstLetter', 'Email first letter should not be uppercase', function(value) {
          const emailParts = value.split('@');
          if (emailParts.length === 2) {
            const localPart = emailParts[0];
            return !/^[A-Z]/.test(localPart); // Ensure first letter of local part is not uppercase
          }
          return true;
        }),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password should be at least 8 characters")
        .max(16, "Password should not exceed 16 characters"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${API_BASE_URL}/api/auth/sign-up`, values);
        console.log("Signup success:", response.data);
        toast.success("Signup successful! Redirecting to home...");
        setTimeout(() => {
          router.push("/home"); // Redirect to home page after successful signup
        }, 2000); // Redirect to home page after successful signup
      } catch (error: any) { // Explicitly declare error as any
        console.error("Signup error:", error);
        if (error.response && error.response.status === 409) {
          toast.error("Email already exists. Please use a different email.");
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/signup-img.jpg"
          alt="Background Image"
          className="w-full h-full object-cover filter blur-sm"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900">
        <div className="w-full justify-center items-center max-w-screen-lg flex flex-col md:flex-row">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6 px-6 sm:px-4 lg:px-8 py-8 bg-gray-100 bg-opacity-70 backdrop-blur-lg border rounded-lg shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
              Signup
            </h2>

            {/* Name input */}
            <div className="w-full mb-4">
              <label
                htmlFor="name"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Name
              </label>
              <div className="flex bg-white items-center border rounded focus-within:border-blue-500">
                <input
                  className={`w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 focus:outline-none ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  placeholder="Enter your name"
                />
                <FaUser className="h-5 w-5 text-gray-700 mx-3" />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              ) : null}
            </div>

            {/* Email Input */}
            <div className="w-full mb-4">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Email
              </label>
              <div className="flex bg-white items-center border rounded focus-within:border-blue-500">
                <input
                  className={`w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 focus:outline-none ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  placeholder="Enter your email"
                />
                <FaEnvelope className="h-5 w-5 text-gray-700 mx-3" />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Password Input */}
            <div className="w-full mb-4">
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 border rounded focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-700" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              ) : null}
            </div>

            {/* Submit button */}
            <button
              className="w-full h-11 px-8 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Signup"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;






