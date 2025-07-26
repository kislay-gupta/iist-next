"use client";

import React from "react";
import { IdeasGridProps } from "@/types/ideas";
import IdeaCard from "./IdeaCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Loading skeleton component for individual cards
const IdeaCardSkeleton: React.FC = () => (
    <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="p-0">
            {/* Image skeleton */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-gray-200 animate-pulse" />
        </CardHeader>
        <CardContent className="p-4">
            {/* Title skeleton */}
            <div className="mb-2 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="mb-2 h-4 bg-gray-200 rounded w-3/4 animate-pulse" />

            {/* Description skeleton */}
            <div className="mb-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>

            {/* Author and date skeleton */}
            <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1 space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                    <div className="h-2 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
            </div>

            {/* Engagement metrics skeleton */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-2 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-2 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-2 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </CardContent>
    </Card>
);

// Empty state component
const EmptyState: React.FC<{ message?: string }> = ({
    message = "No ideas found. Try selecting a different category or check back later for new content."
}) => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="mb-6 text-6xl opacity-50">💡</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">No Ideas Found</h3>
        <p className="text-gray-600 max-w-md leading-relaxed">
            {message}
        </p>
    </div>
);

const IdeasGrid: React.FC<IdeasGridProps> = ({
    ideas,
    loading,
    onLoadMore,
    onLike,
    onBookmark,
}) => {
    // Show loading skeletons
    if (loading && ideas.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <IdeaCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
        );
    }

    // Show empty state when no ideas and not loading
    if (!loading && ideas.length === 0) {
        return (
            <div className="grid grid-cols-1">
                <EmptyState />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Ideas Grid */}
            <div className={cn(
                "grid gap-6",
                // Responsive grid columns based on screen size
                // Mobile: 1-2 cards per row
                "grid-cols-1 sm:grid-cols-2",
                // Tablet: 2-3 cards per row  
                "md:grid-cols-2 lg:grid-cols-3",
                // Desktop: 3-4 cards per row
                "xl:grid-cols-4",
                // Large desktop: 4-5 cards per row
                "2xl:grid-cols-5"
            )}>
                {ideas.map((idea) => (
                    <IdeaCard
                        key={idea._id}
                        idea={idea}
                        onLike={onLike}
                        onBookmark={onBookmark}
                    />
                ))}

                {/* Loading skeletons for additional content */}
                {loading && ideas.length > 0 && (
                    <>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <IdeaCardSkeleton key={`loading-skeleton-${index}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Load More Button */}
            {onLoadMore && !loading && ideas.length > 0 && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={onLoadMore}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        aria-label="Load more ideas"
                    >
                        Load More Ideas
                    </button>
                </div>
            )}
        </div>
    );
};

export default IdeasGrid;