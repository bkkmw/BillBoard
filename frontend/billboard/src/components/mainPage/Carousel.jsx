import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./Carousel.css";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function Carousel() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://cataas.com/cat"
            alt="Slide 1"
            // style={{ width: "20vw", height: "30vh" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cataas.com/cat"
            alt="Slide 2"
            // style={{ width: "20vw", height: "30vh" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cataas.com/cat"
            alt="Slide 3"
            // style={{ width: "20vw", height: "30vh" }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
