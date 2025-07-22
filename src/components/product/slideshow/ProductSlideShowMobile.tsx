"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideShow.css";

// import required modules
import Image from "next/image";
import {
  Autoplay,
  FreeMode,
  Pagination

} from "swiper/modules";

interface Props {
  images: string[];
}
export const ProductSlideShowMobile = ({ images }: Props) => {

  return (
    <div className="block md:hidden">
      <Swiper
      style={{
        width: '100vw',
        height: '500px',
      }}
     
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
            className="object-fill"
              src={`/products/${image}`}
              alt={`Product image ${index + 1}`}
              width={600}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
