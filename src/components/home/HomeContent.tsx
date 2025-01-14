"use client"

import { useCategory } from "@/hooks/useCategory";
import Marquee from "react-fast-marquee";
import HomeSlider from "@/components/sliders/HomeSlider";
import { Sidebar } from "@/components/home";
import TextAnimation from "@/components/animations/TextAnimation";
import AnimatedGrid from "../animations/AnimatedGrid";
import { ProjectCard } from "../cards";
import SkeletonHome from "../skeletons/SkeletonHomes";

interface Category {
  sno: string;
  CatName: string;
  slug: string;
  description: string;
  image: string;
  imageLink: string;
}

export default function HomeContent() {
  const { categories, isLoading } = useCategory();

  if (isLoading) {
    return <div><SkeletonHome/></div>;
  }

  if (!categories) {
    return <div>No categories found</div>;
  }

  return (
    <>
      <Marquee
        gradient={true}
        gradientColor={"rgb(255, 255, 255)"}
        speed={40}
        className="overflow-hidden bg-gray-100 py-3"
      >
        <p className="text-gray-800 mx-8 font-medium">Welcome Message</p>
      </Marquee>

      <div className="flex">
        <aside className="block lg:hidden">
          <Sidebar />
        </aside>
        
        <main className="block w-full">
          <div className="mx-auto">
            <HomeSlider />
          </div>
          
          <div className="container w-11/12 lg:my-16 mx-8">
            <TextAnimation text="Project Categories" />
            
            <AnimatedGrid>
              {categories?.data?.map((category: Category) => (
                <ProjectCard
                  key={category.sno}
                  image={category.imageLink}
                  slug={category.slug}
                  title={category.CatName}
                  isLoading={isLoading}
                />
              ))}
            </AnimatedGrid>
          </div>
        </main>
      </div>
    </>
  );
}
