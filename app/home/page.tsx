"use client";
import React, { useState } from "react";
import Categories from "./categories/categories";
import AllProduct from "./product/page";
import Banner from "../banner/page";

const Page = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected Category ID:", categoryId);
    setSelectedCategoryId(categoryId);
  };
  return (
    <div>
      <Categories
        onCategorySelect={handleCategorySelect}
        selectedCategoryId={selectedCategoryId}
      />
      <Banner />
      <AllProduct selectedCategoryId={selectedCategoryId} />
    </div>
  );
};

export default Page;
