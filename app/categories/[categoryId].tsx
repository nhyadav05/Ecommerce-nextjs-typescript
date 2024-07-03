// app/categories/[categoryId].tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';

interface Product {
  _id: string;
  name: string;
  // Add more fields as per your product schema
}

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchProducts(categoryId as string);
    }
  }, [categoryId]);

  const fetchProducts = (categoryId: string) => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/products?categoryId=${categoryId}`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Category Page for ID: {categoryId}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product._id}>
              <p>{product.name}</p>
              {/* Add more product details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
