
"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { RootState, AppDispatch } from '@/app/redux/store';
import { login } from '@/app/redux/features/authSlice';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().matches(emailRegex, 'Invalid email address').email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required').min(8, 'Password should be at least 8 characters').max(16, 'Password should not exceed 16 characters'),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(login({ email: values.email, password: values.password }));
        toast.success('Login successful! Redirecting to home...');
        router.push("/home"); 
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/login-shopping.jpg" alt="Background Image" className="w-full h-full object-cover filter blur-sm" />
      </div>
      {/* Login Form */}
      <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900">
        <div className="w-full justify-center items-center max-w-screen-lg flex flex-col md:flex-row">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6 px-6 sm:px-4 lg:px-8 py-8 bg-gray-100 bg-opacity-70 backdrop-blur-lg border rounded-lg shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 text-center">Login</h2>

            {/* Email Input */}
            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                Email
              </label>
              <div className="flex bg-white items-center border rounded focus-within:border-blue-500">
                <input
                  className={`w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 focus:outline-none ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  placeholder="Enter your email"
                />
                <FaEnvelope className="h-5 w-5 text-gray-700 mx-3" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="w-full mb-4">
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 text-sm sm:text-base leading-tight text-gray-700 border rounded focus:outline-none ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-700" /> : <FaEye className="h-5 w-5 text-gray-700" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-8 md:h-10 lg:h-12 px-8 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>

            {/* Link to Signup */}
            <div className="text-center text-gray-700 text-sm sm:text-base mt-2">
              Need to create an account?{' '}
              <Link href="/signup" passHref>
                <div className="text-blue-500 hover:underline">Create Account</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
