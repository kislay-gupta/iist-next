"use client";
import { useCategory } from "@/hooks/useCategory";
import HomeSlider from "@/components/sliders/HomeSlider";
import { Sidebar } from "@/components/home";
import TextAnimation from "@/components/animations/TextAnimation";
import AnimatedGrid from "../animations/AnimatedGrid";
import { ProjectCard } from "../cards";
import SkeletonHome from "../skeletons/SkeletonHomes";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CustomMarquee from "./CustomMarquee";

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
    return (
      <div>
        <SkeletonHome />
      </div>
    );
  }

  if (!categories) {
    return <div>No categories found</div>;
  }

  return (
    <>
      <CustomMarquee />
      <div className="flex">
        <aside className="block lg:hidden">
          <Sidebar />
        </aside>

        <main className="block w-full">
          <div className="mx-auto">
            <HomeSlider />
          </div>

          <div className="container lg:my-16 mx-auto">
            <TextAnimation text="Project Categories" />
            <div className="max-sm:hidden">
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
            <ScrollArea className="md:hidden   whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {categories?.data?.map((category: Category) => (
                  <ProjectCard
                    key={category.sno}
                    image={category.imageLink}
                    slug={category.slug}
                    title={category.CatName}
                    isLoading={isLoading}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="hidden md:block">
              <TextAnimation text="Latest Blog" />
              <div className="container mx-auto ">
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
