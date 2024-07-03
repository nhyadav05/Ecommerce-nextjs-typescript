// pages/wishlist/WishListPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import WishlistCard from '../../components/wishListCard'

const WishListPage: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = '667be96a1912e70bb1b8ba44'; // Replace with actual user ID
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`);
        setWishlist(response.data); // Assuming the API response contains wishlist items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToWishlist = async (productId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/api/wishlist/add`, {
        userId: '667be96a1912e70bb1b8ba44', // Replace with actual user ID
        productId,
      });
      // Optionally update local state or fetch wishlist again
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, {
        data: {
          userId: '667be96a1912e70bb1b8ba44', // Replace with actual user ID
          productId,
        },
      });
      // Optionally update local state or fetch wishlist again
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };


  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {wishlist.map((product: any) => (
            <WishlistCard
              key={product._id}
              imageSrc={product.imageSrc}
              name={product.name}
              title={product.title}
              category={product.category}
              price={product.price}
              discountPrice={product.discountPrice}
              offer={product.offer}
              onAddToWishlist={() => handleAddToWishlist(product._id)}
              onRemoveFromWishlist={() => handleRemoveFromWishlist(product._id)}
              isAdded={true} // Adjust based on actual logic to check if in wishlist
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-14">
          <img src="/oops-wishlist.png" alt="No Wishlist" className="mx-auto h-16 w-16  "  />
          <p className="text-md  font-semibold text-gray-600 mt-4">Oops! No items in your wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
