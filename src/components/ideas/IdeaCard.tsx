"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Eye, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IdeaCardProps } from "@/types/ideas";

const IdeaCard: React.FC<IdeaCardProps> = ({
    idea,
    onLike,
    onBookmark,
}) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
        onLike?.(idea._id);
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        onBookmark?.(idea._id);
    };

    const formatEngagementNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    const getCategoryColor = (category: string): string => {
        const colors: Record<string, string> = {
            "science-experiments": "bg-green-100 text-green-800 border-green-200",
            "art-crafts": "bg-amber-100 text-amber-800 border-amber-200",
            "technology": "bg-purple-100 text-purple-800 border-purple-200",
            "environmental": "bg-emerald-100 text-emerald-800 border-emerald-200",
            "all": "bg-blue-100 text-blue-800 border-blue-200",
        };
        return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    const formatCategoryName = (category: string): string => {
        return category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Card className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-gray-300">
            <Link href={`/ideas/${idea.slug}`} className="block">
                <CardHeader className="p-0 relative">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-gray-100">
                        {!imageError ? (
                            <Image
                                src={idea.image}
                                alt={idea.title}
                                fill
                                className={cn(
                                    "object-cover transition-all duration-300 group-hover:scale-105",
                                    imageLoading ? "blur-sm" : "blur-0"
                                )}
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    setImageError(true);
                                    setImageLoading(false);
                                }}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                priority={idea.featured}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                <div className="text-center text-gray-500">
                                    <div className="mb-2 text-2xl">📷</div>
                                    <p className="text-sm">Image not available</p>
                                </div>
                            </div>
                        )}

                        {/* Loading Skeleton */}
                        {imageLoading && !imageError && (
                            <div className="absolute inset-0 animate-pulse bg-gray-200" />
                        )}

                        {/* Category Badge */}
                        <div className="absolute left-3 top-3">
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "text-xs font-medium border",
                                    getCategoryColor(idea.category)
                                )}
                            >
                                {formatCategoryName(idea.category)}
                            </Badge>
                        </div>

                        {/* Featured Badge */}
                        {idea.featured && (
                            <div className="absolute right-3 top-3">
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                                    Featured
                                </Badge>
                            </div>
                        )}

                        {/* Engagement Actions Overlay */}
                        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Button
                                size="sm"
                                variant="secondary"
                                className={cn(
                                    "h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm",
                                    isLiked && "text-red-500"
                                )}
                                onClick={handleLike}
                                aria-label={isLiked ? "Unlike idea" : "Like idea"}
                            >
                                <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                            </Button>
                            <Button
                                size="sm"
                                variant="secondary"
                                className={cn(
                                    "h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm",
                                    isBookmarked && "text-blue-500"
                                )}
                                onClick={handleBookmark}
                                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark idea"}
                            >
                                <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-4">
                    {/* Title */}
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {idea.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {idea.description}
                    </p>

                    {/* Author and Date */}
                    <div className="mb-4 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={idea.author.avatar} alt={idea.author.name} />
                            <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                {idea.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {idea.author.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(idea.publishedAt), {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{formatEngagementNumber(idea.engagement.views)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                <span>{formatEngagementNumber(idea.engagement.likes)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{formatEngagementNumber(idea.engagement.comments)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default IdeaCard;