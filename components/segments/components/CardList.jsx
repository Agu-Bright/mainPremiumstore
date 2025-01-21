"use client";
import React, { useRef, useState } from "react";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import "@components/segments/components/swiper.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Card from "@components/Card/Card";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const CardList = ({ restaurants }) => {
  return (
    <>
      <SwiperComponent
        breakpoints={{
          // when window width is >= 320px
          200: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          460: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          500: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          700: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation]}
        navigation
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {restaurants &&
          restaurants?.map((item) => (
            <SwiperSlide key={item._id} style={{ width: "250px" }}>
              <Card item={item} />
            </SwiperSlide>
          ))}
      </SwiperComponent>
    </>
  );
};

export default CardList;
