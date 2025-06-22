"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import TitleCard from "../shared/TitleCard";

interface Logo {
  id: number;
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { id: 1, src: "/Govt-of-bihar-removebg-preview.png", alt: "Logo 1" },
  { id: 2, src: "/digital-india-logo-removebg-preview.png", alt: "Logo 2" },
  { id: 3, src: "/nptel-logo.png", alt: "Logo 3" },
  { id: 4, src: "/ndli.png", alt: "Logo 4" },
  { id: 5, src: "/ndli.png", alt: "Logo 5" },
  { id: 6, src: "/swachh-bharat-logo.png", alt: "Logo 6" },
  // Add more logo objects as needed
];

const LogoSlider: React.FC = () => {
  return (
    <>
      <div className="container mx-auto my-8 flex justify-center">
        <TitleCard
          bgColor="bg-blue-400"
          title="MOU With
"
        />
      </div>
      <Swiper
        modules={[Autoplay, Parallax]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        parallax={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {logos.map((logo) => (
          <SwiperSlide key={logo.id}>
            <img
              src={logo.src}
              alt={logo.alt}
              className="my-auto aspect-video h-auto w-full object-contain  p-5   bg-blend-color-burn lg:p-10 "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LogoSlider;
