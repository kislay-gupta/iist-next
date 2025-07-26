"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CategoryTabsProps } from "@/types/ideas";

const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    // Scroll active tab into view when category changes
    useEffect(() => {
        if (activeTabRef.current && tabsRef.current) {
            const activeTab = activeTabRef.current;
            const container = tabsRef.current;

            // Calculate scroll position to center the active tab
            const containerWidth = container.offsetWidth;
            const tabLeft = activeTab.offsetLeft;
            const tabWidth = activeTab.offsetWidth;
            const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);

            container.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });
        }
    }, [activeCategory]);

    // Handle keyboard navigation
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
        categorySlug: string,
        index: number
    ) => {
        const { key } = event;

        if (key === "Enter" || key === " ") {
            event.preventDefault();
            onCategoryChange(categorySlug);
        } else if (key === "ArrowLeft" || key === "ArrowRight") {
            event.preventDefault();

            const direction = key === "ArrowLeft" ? -1 : 1;
            const nextIndex = index + direction;

            if (nextIndex >= 0 && nextIndex < categories.length) {
                const nextButton = tabsRef.current?.children[nextIndex] as HTMLButtonElement;
                nextButton?.focus();
            }
        }
    };

    return (
        <div className="w-full mb-6">
            <ScrollArea className="w-full">
                <div
                    ref={tabsRef}
                    className="flex gap-2 pb-2 min-w-max px-4 md:px-0"
                    role="tablist"
                    aria-label="Category filters"
                >
                    {categories.map((category, index) => {
                        const isActive = activeCategory === category.slug;

                        return (
                            <Button
                                key={category._id}
                                ref={isActive ? activeTabRef : null}
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "flex-shrink-0 transition-all duration-200 ease-in-out",
                                    "hover:scale-105 focus:scale-105",
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                                    isActive && [
                                        "bg-blue-600 hover:bg-blue-700 text-white",
                                        "shadow-md transform scale-105"
                                    ],
                                    !isActive && [
                                        "bg-white hover:bg-gray-50 text-gray-700",
                                        "border-gray-200 hover:border-gray-300"
                                    ]
                                )}
                                onClick={() => onCategoryChange(category.slug)}
                                onKeyDown={(e) => handleKeyDown(e, category.slug, index)}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`tabpanel-${category.slug}`}
                                tabIndex={isActive ? 0 : -1}
                            >
                                <span className="font-medium">{category.name}</span>
                                {category.count > 0 && (
                                    <span
                                        className={cn(
                                            "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                                            isActive
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-600"
                                        )}
                                    >
                                        {category.count}
                                    </span>
                                )}
                            </Button>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};

export default CategoryTabs;