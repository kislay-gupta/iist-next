"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
            <div className="flex justify-center mx-auto container my-8">

                <TitleCard bgColor="bg-blue-400" title="MOU With
" />
            </div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={4}
                loop={true}
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
                            className="w-full bg-blend-color-burn p-5 lg:p-10 aspect-video  my-auto   h-auto object-contain "
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default LogoSlider;
