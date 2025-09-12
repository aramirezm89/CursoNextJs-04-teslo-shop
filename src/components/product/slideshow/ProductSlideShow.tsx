"use client";
import React, { useState } from "react";
// Import Swiper React components
import { ProductImage } from "@/components";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideShow.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

interface Props {
  images: string[];
}
export const ProductSlideShow = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!images || images.length === 0) {
    return (
      <ProductImage src={""} alt="Product image" width={1024} height={800} />
    );
  }
  return (
    <div className="hidden md:block">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProductImage
              className="object-fill rounded-lg"
              src={image}
              alt={`Product image ${index + 1}`}
              width={1024}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={images.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProductImage
              className="object-fill rounded-lg"
              src={image}
              alt={`Product image ${index + 1}`}
              width={1024}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
