// app/product/mobile.tsx
import React from "react";
import Card from "@/components/card";

const MobileTab = () => {
  // Example data for mobile products
  const mobileProducts = [
    {
      id: 0,
      name: "Smartphone",
      category: "Smartphone",
      title: "",
      imageSrc: "/mobile/mobile1.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 1,
      name: "Mobile 2",
      category: "Feature Phone",
      title: "",
      imageSrc: "/mobile/mobile2.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 2,
      name: "Mobile 2",
      category: "Feature Phone",
      title: "",
      imageSrc: "/mobile/tab4.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 3,
      name: "Mobile 1",
      category: "Smartphone",
      title: "",
      imageSrc: "/mobile/iphone1.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 4,
      name: "Mobile 2",
      category: "Feature Phone",
      title: "",
      imageSrc: "/mobile/iphone2.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 5,
      name: "Mobile 2",
      category: "Feature Phone",
      title: "",
      imageSrc: "/mobile/iphone3.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 6,
      name: "Smartphone Tablet",
      category: "Tablet",
      title: "Smartphone Tablet",
      imageSrc: "/mobile/tab1.jpeg",
      description: "Description for Smartphone goes here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 7,
      name: "Tablet",
      category: "Feature Tablet",
      title: "Tablet",
      imageSrc: "/mobile/tab3.jpeg",
      description: "Description for Tablet goes here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 8,
      name: "Tablet",
      category: "Feature Tablet",
      title: "Tablet",
      imageSrc: "/mobile/tab3.jpeg",
      description: "Description for Tablet goes here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 9,
      name: "Mobile 1",
      category: "Smartphone",
      title: "",
      imageSrc: "/mobile/iphone6.jpeg",
      description: "Description for iphone here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 10,
      name: "Smartphone Tablet",
      category: "Tablet",
      title: "Smartphone Tablet",
      imageSrc: "/mobile/tab1.jpeg",
      description: "Description for Smartphone goes here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
    {
      id: 11,
      name: "Tablet",
      category: "Feature Tablet",
      title: "Tablet",
      imageSrc: "/mobile/tab3.jpeg",
      description: "Description for Tablet goes here.",
      price: 50099,
      discountPrice: 40099,
      offer: "10% off",
    },
  ];

  return (
    <div className=" container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {mobileProducts.map((product) => (
          <Card
            key={product.id}
            imageSrc={product.imageSrc}
            name={product.name}
            title={product.title}
            category={product.category}
            description={product.description}
            price={product.price}
            discountPrice={product.discountPrice}
            offer={product.offer}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileTab;
