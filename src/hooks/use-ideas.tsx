"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Idea,
    Category,
    FilterOptions,
    LoadingState,
    ErrorState,
} from "@/types/ideas";
import {
    generateMockIdeasResponse,
    generateMockCategoriesResponse,
} from "@/data/mockIdeas";

// Custom hook for fetching ideas and categories
export const useIdeas = (initialCategory: string = "all") => {
    // State management
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

    // Loading states
    const [loading, setLoading] = useState<LoadingState>({
        ideas: false,
        categories: false,
        filtering: false,
    });

    // Error states
    const [error, setError] = useState<ErrorState>({
        ideas: null,
        categories: null,
        general: null,
    });

    // Simulate API delay for realistic behavior
    const simulateApiDelay = (ms: number = 500) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    // Fetch all ideas
    const fetchIdeas = useCallback(async () => {
        setLoading((prev) => ({ ...prev, ideas: true }));
        setError((prev) => ({ ...prev, ideas: null }));

        try {
            // Simulate API call delay
            await simulateApiDelay(300);

            // In a real implementation, this would be an actual API call
            // const response = await axios.get('/api/ideas');
            const mockResponse = generateMockIdeasResponse();

            if (mockResponse.status === 200) {
                setIdeas(mockResponse.data.ideas);
                return mockResponse.data.ideas;
            } else {
                throw new Error("Failed to fetch ideas");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch ideas";
            setError((prev) => ({ ...prev, ideas: errorMessage }));
            console.error("Error fetching ideas:", err);
            return [];
        } finally {
            setLoading((prev) => ({ ...prev, ideas: false }));
        }
    }, []);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        setLoading((prev) => ({ ...prev, categories: true }));
        setError((prev) => ({ ...prev, categories: null }));

        try {
            // Simulate API call delay
            await simulateApiDelay(200);

            // In a real implementation, this would be an actual API call
            // const response = await axios.get('/api/ideas/categories');
            const mockResponse = generateMockCategoriesResponse();

            if (mockResponse.status === 200) {
                setCategories(mockResponse.data.categories);
                return mockResponse.data.categories;
            } else {
                throw new Error("Failed to fetch categories");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch categories";
            setError((prev) => ({ ...prev, categories: errorMessage }));
            console.error("Error fetching categories:", err);
            return [];
        } finally {
            setLoading((prev) => ({ ...prev, categories: false }));
        }
    }, []);

    // Filter ideas by category
    const filterIdeasByCategory = useCallback(
        async (categorySlug: string) => {
            setLoading((prev) => ({ ...prev, filtering: true }));
            setError((prev) => ({ ...prev, general: null }));

            try {
                // Simulate filtering delay for smooth UX
                await simulateApiDelay(150);

                let filtered: Idea[];

                if (categorySlug === "all") {
                    filtered = ideas;
                } else {
                    filtered = ideas.filter((idea) => idea.category === categorySlug);
                }

                setFilteredIdeas(filtered);
                setActiveCategory(categorySlug);
                return filtered;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to filter ideas";
                setError((prev) => ({ ...prev, general: errorMessage }));
                console.error("Error filtering ideas:", err);
                return [];
            } finally {
                setLoading((prev) => ({ ...prev, filtering: false }));
            }
        },
        [ideas]
    );

    // Advanced filtering with multiple options
    const filterIdeas = useCallback(
        async (filterOptions: FilterOptions) => {
            setLoading((prev) => ({ ...prev, filtering: true }));
            setError((prev) => ({ ...prev, general: null }));

            try {
                await simulateApiDelay(200);

                let filtered = [...ideas];

                // Filter by category
                if (filterOptions.category && filterOptions.category !== "all") {
                    filtered = filtered.filter((idea) => idea.category === filterOptions.category);
                }

                // Filter by featured status
                if (filterOptions.featured !== undefined) {
                    filtered = filtered.filter((idea) => idea.featured === filterOptions.featured);
                }

                // Filter by author
                if (filterOptions.author) {
                    filtered = filtered.filter((idea) => idea.author._id === filterOptions.author);
                }

                // Sort ideas
                if (filterOptions.sort) {
                    switch (filterOptions.sort) {
                        case "newest":
                            filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
                            break;
                        case "oldest":
                            filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
                            break;
                        case "popular":
                            filtered.sort((a, b) => b.engagement.views - a.engagement.views);
                            break;
                        case "trending":
                            filtered.sort((a, b) => b.engagement.likes - a.engagement.likes);
                            break;
                    }
                }

                setFilteredIdeas(filtered);
                if (filterOptions.category) {
                    setActiveCategory(filterOptions.category);
                }
                return filtered;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to filter ideas";
                setError((prev) => ({ ...prev, general: errorMessage }));
                console.error("Error filtering ideas:", err);
                return [];
            } finally {
                setLoading((prev) => ({ ...prev, filtering: false }));
            }
        },
        [ideas]
    );

    // Retry failed operations
    const retry = useCallback(async () => {
        setError({
            ideas: null,
            categories: null,
            general: null,
        });

        const [fetchedIdeas] = await Promise.all([
            fetchIdeas(),
            fetchCategories(),
        ]);

        if (fetchedIdeas.length > 0) {
            await filterIdeasByCategory(activeCategory);
        }
    }, [fetchIdeas, fetchCategories, filterIdeasByCategory, activeCategory]);

    // Initialize data on mount
    useEffect(() => {
        const initializeData = async () => {
            const [fetchedIdeas,] = await Promise.all([
                fetchIdeas(),
                fetchCategories(),
            ]);

            // Set initial filtered ideas based on active category
            if (fetchedIdeas.length > 0) {
                await filterIdeasByCategory(activeCategory);
            }
        };

        initializeData();
    }, []); // Empty dependency array for initial load only

    // Update filtered ideas when ideas or active category changes
    useEffect(() => {
        if (ideas.length > 0) {
            filterIdeasByCategory(activeCategory);
        }
    }, [ideas, activeCategory, filterIdeasByCategory]);

    // Computed values
    const isLoading = loading.ideas || loading.categories || loading.filtering;
    const hasError = error.ideas || error.categories || error.general;
    const isEmpty = filteredIdeas.length === 0 && !isLoading && !hasError;

    return {
        // Data
        ideas,
        categories,
        filteredIdeas,
        activeCategory,

        // Loading states
        loading,
        isLoading,

        // Error states
        error,
        hasError,

        // Computed states
        isEmpty,

        // Actions
        fetchIdeas,
        fetchCategories,
        filterIdeasByCategory,
        filterIdeas,
        retry,
        setActiveCategory,
    };
};

// Simplified hook for basic category filtering
export const useIdeasByCategory = (categorySlug: string = "all") => {
    const {
        filteredIdeas,
        error,
        filterIdeasByCategory,
        isLoading,
        hasError,
        isEmpty,
    } = useIdeas(categorySlug);

    return {
        ideas: filteredIdeas,
        loading: isLoading,
        error: hasError ? error : null,
        isEmpty,
        refetch: () => filterIdeasByCategory(categorySlug),
    };
};

// Hook for fetching categories only
export const useCategories = () => {
    const { categories, loading, error, fetchCategories } = useIdeas();

    return {
        categories,
        loading: loading.categories,
        error: error.categories,
        refetch: fetchCategories,
    };
};