"use client";

import React from "react";
import { useIdeas } from "@/hooks/use-ideas";
import TitleCard from "@/components/shared/TitleCard";
import CategoryTabs from "@/components/ideas/CategoryTabs";
import IdeasGrid from "@/components/ideas/IdeasGrid";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const IdeasGalleryPage: React.FC = () => {
    const {
        filteredIdeas,
        categories,
        activeCategory,
        loading,
        error,
        isLoading,
        hasError,
        isEmpty,
        filterIdeasByCategory,
        retry,
    } = useIdeas();

    // Handle category change
    const handleCategoryChange = async (categorySlug: string) => {
        await filterIdeasByCategory(categorySlug);
    };

    // Handle engagement actions (placeholder implementations)
    const handleLike = (ideaId: string) => {
        // TODO: Implement like functionality in future tasks
        console.log("Liked idea:", ideaId);
    };

    const handleBookmark = (ideaId: string) => {
        // TODO: Implement bookmark functionality in future tasks
        console.log("Bookmarked idea:", ideaId);
    };

    // Error state component
    const ErrorState: React.FC = () => (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Something went wrong
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
                We encountered an error while loading the ideas. Please try again.
            </p>
            <Button
                onClick={retry}
                className="flex items-center gap-2"
                disabled={isLoading}
            >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Try Again
            </Button>
        </div>
    );

    // Loading state for initial page load
    if (loading.ideas && loading.categories) {
        return (
            <div className="container mx-auto px-4 py-8">
                {/* Title */}
                <div className="flex justify-center mb-8">
                    <TitleCard bgColor="bg-purple-500" title="Ideas Gallery" />
                </div>

                {/* Loading skeleton for tabs */}
                <div className="mb-6">
                    <div className="flex gap-2 pb-2 px-4 md:px-0">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={`tab-skeleton-${index}`}
                                className="h-8 bg-gray-200 rounded-md animate-pulse"
                                style={{ width: `${80 + Math.random() * 40}px` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Loading skeleton for grid */}
                <IdeasGrid
                    ideas={[]}
                    loading={true}
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            <div className="flex justify-center mb-8">
                <TitleCard bgColor="bg-purple-500" title="Ideas Gallery" />
            </div>

            {/* Error Alert */}
            {hasError && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        {error.general || error.ideas || error.categories || "An error occurred while loading content."}
                    </AlertDescription>
                </Alert>
            )}

            {/* Category Tabs */}
            {categories.length > 0 && (
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />
            )}

            {/* Main Content */}
            {hasError && !filteredIdeas.length ? (
                <ErrorState />
            ) : (
                <IdeasGrid
                    ideas={filteredIdeas}
                    loading={loading.filtering}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                />
            )}

            {/* Empty State Message for specific categories */}
            {isEmpty && activeCategory !== "all" && (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                        No ideas found in the &quot;{categories.find(cat => cat.slug === activeCategory)?.name}&quot; category.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => handleCategoryChange("all")}
                    >
                        View All Ideas
                    </Button>
                </div>
            )}
        </div>
    );
};

export default IdeasGalleryPage;