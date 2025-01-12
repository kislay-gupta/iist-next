// Import Swiper React components

"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles

import "swiper/css";

import "swiper/css/pagination";

import silder1 from "@/assets/slider/1.png";
import silder2 from "@/assets/slider/2.png";
import silder3 from "@/assets/slider/3.png";
import silder4 from "@/assets/slider/4.png";
import silder5 from "@/assets/slider/5.png";
import styles from "./styles.module.css";

const sliderImages = [silder1, silder2, silder3, silder4, silder5];

export default function HomeSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className={styles["swiper-container"]}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index} className={styles["swiper-slide-content"]}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={1920}
              height={1080}
              priority={index === 0}
              className={styles["swiper-slide-image"]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
