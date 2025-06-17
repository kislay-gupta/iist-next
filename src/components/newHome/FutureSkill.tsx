"use client";
import React, { useState } from "react";
import { Category, useCategory } from "@/hooks/useCategory";
import { ProjectCard } from "../cards";
import { BlurHoverWrapper } from "../ui/blur-hover-wrapper";
import SkeletonGrid from "../skeletons/SkeletonGrid";

const FutureSkill = () => {
  const { categories, isLoading } = useCategory();
  const [hovered, setHovered] = useState<number | null>(null);

  // Function to get dynamic grid classes - always max 4 columns
  const getGridClasses = () => {
    return "mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-y-4 text-center sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:text-left lg:mt-20 lg:grid-cols-3 xl:grid-cols-4";
  };

  // Function to group items for proper centering of incomplete rows
  const groupItemsIntoRows = (items: Category[]) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
      rows.push(items.slice(i, i + 4));
    }
    return rows;
  };

  // Function to get row-specific classes for centering
  const getRowClasses = (rowItemCount: number, isLastRow: boolean) => {
    const baseRowClasses = "contents"; // This allows items to participate in the parent grid

    if (isLastRow && rowItemCount < 4) {
      // For incomplete last rows, we'll use a sub-grid approach
      return (
        "col-span-full grid gap-y-4 max-w-4xl gap-x-8 mx-auto  justify-center " +
        `grid-cols-${rowItemCount} sm:grid-cols-${Math.min(rowItemCount, 2)} ` +
        `lg:grid-cols-${Math.min(rowItemCount, 3)} xl:grid-cols-${rowItemCount}`
      );
    }

    return baseRowClasses;
  };

  const items = categories?.data || [];
  const rows = groupItemsIntoRows(items);

  return (
    <section className="bg-orange-600 py-12 text-gray-100 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <h2 className="mb-6 text-lg font-semibold leading-tight text-gray-50 sm:text-xl xl:text-3xl">
            Empowering Kids with the Right Future Skills
          </h2>
          <div className="mx-auto h-1 w-1/4 bg-yellow-500" />
          <p className="mb-4">
            We are creating a tool that helps you be more productive and
            efficient when building websites and webapps
          </p>
        </div>

        {isLoading && <SkeletonGrid />}

        <div className={getGridClasses()}>
          {items.length === 0 && !isLoading && (
            <div className="col-span-full text-center text-gray-500">
              No categories found
            </div>
          )}

          {rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === rows.length - 1;
            const rowItemCount = row.length;

            if (isLastRow && rowItemCount < 4) {
              // Render incomplete last row with centering
              return (
                <div
                  key={`row-${rowIndex}`}
                  className={getRowClasses(rowItemCount, isLastRow)}
                >
                  {row.map((category: Category, index: number) => {
                    const globalIndex = rowIndex * 4 + index;
                    return (
                      <BlurHoverWrapper
                        key={category.sno}
                        index={globalIndex}
                        hovered={hovered}
                        setHovered={setHovered}
                      >
                        <ProjectCard
                          image={category.imageLink}
                          slug={category.slug}
                          title={category.CatName}
                          isLoading={isLoading}
                        />
                      </BlurHoverWrapper>
                    );
                  })}
                </div>
              );
            } else {
              // Render complete rows normally (4 items)
              return row.map((category: Category, index: number) => {
                const globalIndex = rowIndex * 4 + index;
                return (
                  <BlurHoverWrapper
                    key={category.sno}
                    index={globalIndex}
                    hovered={hovered}
                    setHovered={setHovered}
                  >
                    <ProjectCard
                      image={category.imageLink}
                      slug={category.slug}
                      title={category.CatName}
                      isLoading={isLoading}
                    />
                  </BlurHoverWrapper>
                );
              });
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default FutureSkill;
