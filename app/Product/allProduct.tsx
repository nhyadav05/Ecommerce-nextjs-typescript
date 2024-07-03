"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import Loader from '@/components/loader';

interface Product {
  _id: string;
  name: string;
  images: string[];
  categoryId: string;
  price: number;
}

interface PaginationData {
  totalPages: number;
}

interface ApiResponse {
  products: Product[];
  pagination: PaginationData;
}

interface Props {
  selectedCategoryId: string | null;
}

const AllProduct: React.FC<Props> = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, selectedCategoryId]);

  const fetchProducts = (page: number) => {
    setLoading(true);
    setError(null);

    let apiUrl = `${API_BASE_URL}/api/products?page=${page}&limit=10&maxPrice=150`;
    if (selectedCategoryId) {
      apiUrl += `&categoryId=${selectedCategoryId}`;
    }

    axios.get<ApiResponse>(apiUrl)
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product: Product) => (
              <Card
                key={product._id}
                imageSrc={product.images[0]}
                name={product.name}
                title={product.name}
                category={product.categoryId}
                price={product.price}
                discountPrice={product.price * 0.9}
                offer="10% off"
                productId={product._id} // Ensure productId is passed
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
          <p className="text-center font-semibold text-red-500">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
