import React from "react";
import MotionFade from "../shared/MotionFade";
import { getProducts } from "@/hooks/get-product";
import Project from "@/interfaces/Project";
import Carousel from "../shared/carousel";
import { ProductCard } from "../cards";
import TitleCard from "../shared/TitleCard";

const InnovativeFeatures = async () => {
  const data = await getProducts("arduino-projects");
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-16 md:py-24">
      <div className="flex w-full flex-col items-center text-center">
        <MotionFade delay={0}>
          <h4 className="mb-6 text-center text-3xl font-extrabold leading-tight text-orange-400 md:text-5xl">
            Shaping Future Innovators through Projectovation
          </h4>
        </MotionFade>
        <MotionFade delay={0.2}>
          <p className="mx-auto  flex max-w-3xl justify-center text-center text-base leading-relaxed text-gray-700 md:max-w-4xl md:text-lg lg:max-w-5xl lg:text-xl">
            Founded in 2020, PROJECTOVATION is committed to advancing innovation
            through Embedded Systems and IoT. With a strong emphasis on academic
            and industrial projects, we deliver smart solutions while nurturing
            future ready skills among students and professionals. Supported by
            experts, educators, and industry leaders, PROJECTOVATION bridges the
            gap between emerging technologies and real-world
            applications—empowering the next generation of innovators.
          </p>
        </MotionFade>
      </div>

      <TitleCard
        bgColor="bg-red-600"
        title="Innovative Features for Smart Living"
      />
      <div className="container mx-auto mt-6 max-w-7xl">
        <Carousel
          cardsPerView={{ base: 1, md: 2, lg: 4 }}
          autoPlay={true}
          interval={4000}
        >
          {data.map((data: Project) => (
            <ProductCard
              key={data.name}
              category={"arduino-projects"}
              image={data.imageLink}
              price={Number(data.DiscPrice)}
              originalPrice={Number(data.price)}
              slug={data.slug}
              sno={data.sno}
              title={data.name}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default InnovativeFeatures;
