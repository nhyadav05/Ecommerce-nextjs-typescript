import React from "react";
import Card from "@/components/card";
const AllProduct = () => {
    const allProducts = [
      {
        id: 0,
        name: "Strawberry Rabbit Soft Toy",
        category: "Soft Toy",
        title: "Strawberry Rabbit Soft Toy",
        imageSrc: "/product/strawberry-rabbit.webp",
        description: "A cute soft toy shaped like a strawberry rabbit.",
        price: 499,
        discountPrice: 399,
        offer: "20% off",
      },
      {
        id: 1,
        name: "iPhone 12 Pro Max",
        category: "Feature Phone",
        title: "iPhone 12 Pro Max",
        imageSrc: "/mobile/iphone1.jpeg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        price: 84999,
        discountPrice: 79999,
        offer: "5% off",
      },
      {
        id: 2,
        name: "Women's Sandal",
        category: "Footwear",
        title: "Women's Sandal",
        imageSrc: "/product/sandal.webp",
        description: "Comfortable sandals for women, suitable for casual wear.",
        price: 799,
        discountPrice: 599,
        offer: "25% off",
      },
        {
          id: 3,
          name: "Slipper",
          category: "Footwear",
          title: "Slipper",
          imageSrc: "/product/slipper.webp",
          description: "Simple and cozy slippers for indoor use.",
          price: 899,
          discountPrice: 799,
          offer: "10% off",
        },
        {
          id: 4,
          name: "Ring",
          category: "Diamond",
          title: "Ring",
          imageSrc: "/jewellry/ring2.webp",
          description: "Elegant diamond ring, perfect for special occasions.",
          price:35000,
          discountPrice: 3380,
          offer: "5% off",
        },
        {
          id: 5,
          name: "Mobile 2",
          category: "Feature Phone",
          title: "Mobile 2",
          imageSrc: "/mobile/mobile2.jpeg",
          description: "Description for Mobile 2 goes here.",
          price: 17999,
          discountPrice: 15999,
          offer: "5% off",
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
          name: "door-curtain",
          category: "Curtain",
          title: "Polyester Semi Transparent Door Curtain",
          imageSrc: "/product/door-curtain.webp",
          description: "Pack of 3 semi-transparent door curtains.",
          price: 799,
          discountPrice: 599,
          offer: "25% off",
        },
        {
          id: 8,
          name: "Buddha Monk Statue",
          category: "Statue",
          title: "Buddha Monk Statue",
          imageSrc: "/product/buddhamonk.webp",
          description: "Decorative Buddha monk statue for home or office.",
          price: 299,
          discountPrice: 199,
          offer: "15% off",
        },
        {
          id: 9,
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
          id: 10,
          name: "Men Solid T-shirt",
          category: "T-shirt",
          title: "Men Solid T-shirt",
          imageSrc: "/product/tshirt1.webp",
          description: "Solid color t-shirt for men, available in various sizes.",
          price: 499,
          discountPrice: 399,
          offer: "10% off",
        },
        {
          id: 11,
          name: "Fresh from Loom 274 cm (9 ft) Polyester Room Darkening Long Door Curtain (Pack Of 2) (Abstract, Grey)",
          category: "Curtain",
          title: "Polyester Room Darkening Long Door Curtain",
          imageSrc: "/product/window-curtain.webp",
          description: "Pack of 2 room darkening door curtains in abstract grey design.",
          price: 799,
          discountPrice: 699,
          offer: "10% off",
        },
      ];
      

  return   (
    <div className="px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {allProducts.map((product) => (
      
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
  )};
export default AllProduct;
