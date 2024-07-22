"use client";
// Page.tsx

import React, { useState } from "react";
import Categories from "./categories/categories";
import AllProduct from "./product/page";
import Banner from "../banner/page";

const Page = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [key, setKey] = useState<number>(0); // Key to force re-mount

  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected Category ID:", categoryId);
    setSelectedCategoryId(categoryId);
    setKey((prevKey) => prevKey + 1); // Increment key to re-mount AllProduct
  };

  return (
    <div>
      <Categories
        onCategorySelect={handleCategorySelect}
        selectedCategoryId={selectedCategoryId}
      />
      <Banner />
      <AllProduct key={key} selectedCategoryId={selectedCategoryId} />
    </div>
  );
};

export default Page;
