// app/product/jewelry.tsx
import React from "react";
import Card from "@/components/card";

const JewellryPage = () => {
  // Example data for jewelry products
  const jewelryProducts = [
    {
      id: 0,
      name: "Necklace",
      category: "Gold",
      title: "",
      imageSrc: "/jewellry/necklace.avif",
      description: "Elegant diamond ring, perfect for special occasions.",
      price:35000,
      discountPrice: 3380,
      offer: "5% off",
    },
    {
      id: 1,
      name: "Ring",
      category: "Diamond",
      title: "",
      imageSrc: "/jewellry/ring4.webp",
      description: "Elegant diamond ring, perfect for special occasions.",
      price:35000,
      discountPrice: 3380,
      offer: "5% off",
    },
    {
      id: 2,
      name: "Ring",
      category: "gold",
      title: "",
      imageSrc: "/jewellry/ring2.webp",
      description: "Elegant diamond ring, perfect for special occasions.",
      price:35000,
      discountPrice: 3380,
      offer: "5% off",
    },
    {
      id: 4,
      name: "Braclet",
      category: "Platinum",
      title: "",
      imageSrc: "/jewellry/braclet.webp",
      description: "Elegant Platinum braclet, perfect for special occasions.",
      price:35000,
      discountPrice: 3380,
      offer: "5% off",
    },
    {
      id: 5,
      name: "Ring",
      category: "Diamond",
      title: "",
      imageSrc: "/jewellry/ring-box.png",
      description: "Elegant diamond ring, perfect for special occasions.",
      price:35000,
      discountPrice: 3380,
      offer: "5% off",
    },
    {
      id: 6,
      name: "Ring",
      category: "Diamond",
      title: "",
      imageSrc: "/jewellry/ring3.jpg",
      description: "Elegant diamond ring, perfect for special occasions.",
      price:35000,
      discountPrice: 3380,
      offer: "5% off",
    },
  ];

  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {jewelryProducts.map((product) => (
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

export default JewellryPage;
