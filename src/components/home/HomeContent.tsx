"use client";
import { useCategory } from "@/hooks/useCategory";
import HomeSlider from "@/components/sliders/HomeSlider";
import { AboutIist, Sidebar } from "@/components/home";
import TextAnimation from "@/components/animations/TextAnimation";
import AnimatedGrid from "../animations/AnimatedGrid";
import { BgCard, ProjectCard } from "../cards";
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

          <div className="container mx-auto lg:my-16">
            <TextAnimation text="Project Categories" />
            <div className="max-sm:hidden">
              {categories && categories.data.length > 0 ? (
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
              ) : (
                <>
                  <div className="text-center text-2xl font-bold">
                    No categories found
                  </div>
                </>
              )}
            </div>
            <ScrollArea className="whitespace-nowrap rounded-md border md:hidden">
              <div className="flex w-max space-x-4 p-4">
                {categories?.data?.map((category: Category) => (
                  <div className="w-[250px]" key={category.sno}>
                    <ProjectCard
                      image={category.imageLink}
                      slug={category.slug}
                      title={category.CatName}
                      isLoading={isLoading}
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <BgCard>
              <AboutIist />
            </BgCard>
            <div className="hidden md:block">
              <TextAnimation text="Latest Blog" />
              <div className="container mx-auto ">
                {categories && categories.data.length > 0 ? (
                  <AnimatedGrid>
                    {categories?.data?.map((category: Category) => (
                      <ProjectCard
                        category="blog"
                        key={category.sno}
                        image={category.imageLink}
                        slug={category.slug}
                        title={category.CatName}
                        isLoading={isLoading}
                      />
                    ))}
                  </AnimatedGrid>
                ) : (
                  <>
                    <div className="text-center text-2xl font-bold">
                      No categories found
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
