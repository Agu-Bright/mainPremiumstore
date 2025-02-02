import { Box } from "@mui/system";
import React from "react";
import { Swiper as _swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Swiper = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e6dede",
        borderRadius: { md: "40px", xs: "20px" },
        width: "100%",
        marginBottom: "20px",
        // padding: "5px",
        overflow: "hidden",
      }}
    >
      <_swiper
        style={{ width: "100%", height: "100%" }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <a href="https://t.me/activest0re" target="_blank">
            <img
              src="/img/flier-3.png"
              alt="flier"
              style={{ width: "100%", visibility: "hidden" }}
            />
          </a>
        </SwiperSlide>
      </_swiper>
    </Box>
  );
};

export default Swiper;
