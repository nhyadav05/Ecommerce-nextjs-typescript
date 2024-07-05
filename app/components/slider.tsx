import React from 'react';
import Slider from 'react-slick';

interface ImgSliderProps {
  images: string[];
  onClick: (imgSrc: string, index: number) => void;
}

const ImgSlider: React.FC<ImgSliderProps> = ({ images, onClick }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="flex mb-4 gap-2">
      {images.map((imgSrc, index) => (
        <div key={index} onClick={() => onClick(imgSrc, index)}>
          <img
            src={imgSrc}
            alt={`Product ${index + 1}`}
            className="w-[23%] h-[25%] shadow-md cursor-pointer"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImgSlider;


