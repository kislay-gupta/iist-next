/* eslint-disable @typescript-eslint/no-explicit-any */
import { Idea, Category, SortOption, FilterOptions } from "@/types/ideas";

// Type Guards
export const isValidIdea = (obj: any): obj is Idea => {
  return (
    obj &&
    typeof obj._id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    typeof obj.image === "string" &&
    obj.author &&
    typeof obj.author._id === "string" &&
    typeof obj.author.name === "string" &&
    typeof obj.category === "string" &&
    typeof obj.slug === "string" &&
    typeof obj.publishedAt === "string" &&
    obj.engagement &&
    typeof obj.engagement.views === "number" &&
    typeof obj.engagement.likes === "number" &&
    typeof obj.engagement.comments === "number"
  );
};

export const isValidCategory = (obj: any): obj is Category => {
  return (
    obj &&
    typeof obj._id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.slug === "string" &&
    typeof obj.count === "number"
  );
};

// Utility Functions
export const sortIdeas = (ideas: Idea[], sortOption: SortOption): Idea[] => {
  const sortedIdeas = [...ideas];

  switch (sortOption) {
    case "newest":
      return sortedIdeas.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case "oldest":
      return sortedIdeas.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case "popular":
      return sortedIdeas.sort(
        (a, b) => b.engagement.views - a.engagement.views
      );
    case "trending":
      return sortedIdeas.sort(
        (a, b) =>
          b.engagement.likes +
          b.engagement.comments -
          (a.engagement.likes + a.engagement.comments)
      );
    default:
      return sortedIdeas;
  }
};

export const filterIdeas = (ideas: Idea[], filters: FilterOptions): Idea[] => {
  let filteredIdeas = [...ideas];

  if (filters.category && filters.category !== "all") {
    filteredIdeas = filteredIdeas.filter(
      (idea) => idea.category === filters.category
    );
  }

  if (filters.featured !== undefined) {
    filteredIdeas = filteredIdeas.filter(
      (idea) => idea.featured === filters.featured
    );
  }

  if (filters.author) {
    filteredIdeas = filteredIdeas.filter(
      (idea) => idea.author._id === filters.author
    );
  }

  if (filters.sort) {
    filteredIdeas = sortIdeas(filteredIdeas, filters.sort);
  }

  return filteredIdeas;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatEngagement = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const generateIdeaUrl = (slug: string): string => {
  return `/ideas/${slug}`;
};

export const getCategoryColor = (categorySlug: string): string => {
  const colorMap: Record<string, string> = {
    all: "#3B82F6",
    "science-experiments": "#10B981",
    "art-crafts": "#F59E0B",
    technology: "#8B5CF6",
    environmental: "#059669",
  };

  return colorMap[categorySlug] || "#6B7280";
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const searchIdeas = (ideas: Idea[], query: string): Idea[] => {
  const lowercaseQuery = query.toLowerCase();

  return ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(lowercaseQuery) ||
      idea.description.toLowerCase().includes(lowercaseQuery) ||
      idea.author.name.toLowerCase().includes(lowercaseQuery) ||
      idea.category.toLowerCase().includes(lowercaseQuery)
  );
};
