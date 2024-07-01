"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "@/components/card";
import API_BASE_URL from '@/apiConfig';

const AllProduct: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product: any) => (
          <Card
            key={product._id}
            imageSrc={product.images[0]} // Assuming first image is used for simplicity
            name={product.name}
            title={product.name}
            category={product.categoryId} // You might need to fetch category name based on categoryId
            price={product.price}
            discountPrice={product.price * 0.9} // Example discount calculation
            offer="10% off" // Example offer, adjust as needed
          />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
