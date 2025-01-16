"use client";
import React from "react";
import { Category, useCategory } from "@/hooks/useCategory";
import AnimatedGrid from "@/components/animations/AnimatedGrid";
import { ProjectCard } from "@/components/cards/ProjectCard";
import SkeletonHome from "@/components/skeletons/SkeletonHomes";

const ProjectComponent = () => {
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
    <div className="lg:container w-full  lg:my-16 mx-auto">
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
  );
};

export default ProjectComponent;
