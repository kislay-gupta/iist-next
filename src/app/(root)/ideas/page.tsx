"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from "@/components/cards/";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import EmptySearch from "@/components/shared/EmptySearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Create an axios instance with base URL
const api = axios.create({
    baseURL: 'https://api.iistbihar.com/api/v1/idea.php',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface Idea {
    id: number;
    name: string;
    slug: string;
    CatID: number;
    pdf: string;
    pdfLink: string;
    price: string;
    discPrice: string;
    description: string;
    image: string;
    imageLink: string;
    created_at: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

// Main Component
function IdeasPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Fetch categories and ideas in parallel
                const [categoriesResponse, ideasResponse] = await Promise.all([
                    api.get('?req_data=GetIdeaCat'),
                    api.get('?req_data=getAllIdea')
                ]);

                setCategories(categoriesResponse.data?.data || []);
                const initialIdeas = ideasResponse.data?.data || [];
                setIdeas(initialIdeas);
                setFilteredIdeas(initialIdeas);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Filter ideas based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredIdeas(ideas);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = ideas.filter(idea =>
            idea.name.toLowerCase().includes(query) ||
            idea.description.toLowerCase().includes(query)
        );
        setFilteredIdeas(filtered);
    }, [searchQuery, ideas]);

    const fetchIdeasByCategory = async (categorySlug: string) => {
        if (activeCategory === categorySlug) {
            // If clicking the same category, reset to show all ideas
            setFilteredIdeas(ideas);
            setActiveCategory(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(`?req_data=getIdeaByCatSlufOrId&CatSlug=${categorySlug}`);

            if (!response.data || !Array.isArray(response.data.data)) {
                throw new Error('Invalid data format received from server');
            }

            setFilteredIdeas(response.data.data);
            setActiveCategory(categorySlug);
        } catch (error) {
            console.error("Error fetching ideas by category:", error);
            setError(error instanceof Error ? error.message : 'Failed to load category');
            setFilteredIdeas(ideas);
            setActiveCategory(null);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setActiveCategory(null);
        setFilteredIdeas(ideas);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Breadcrumb category="ideas" />

                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Ideas Gallery
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                        Discover innovative ideas and projects to inspire your next big thing
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-8 space-y-4">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            className="w-full rounded-full bg-white pl-10 pr-4 py-6 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
                            placeholder="Search ideas..."
                            type="search"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Button
                            variant={!activeCategory && !searchQuery ? "default" : "ghost"}
                            className="rounded-full"
                            onClick={resetFilters}
                            disabled={isLoading}
                        >
                            All Ideas
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.slug ? "default" : "ghost"}
                                className="rounded-full"
                                onClick={() => fetchIdeasByCategory(category.slug)}
                                disabled={isLoading}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        {activeCategory
                            ? `Showing ${filteredIdeas.length} ideas in ${categories.find(c => c.slug === activeCategory)?.name || 'this category'}`
                            : `Showing all ${filteredIdeas.length} ideas`}
                    </p>
                </div>

                {/* Ideas Grid */}
                {isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="h-48 w-full rounded-t-lg" />
                                <CardContent className="p-4">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredIdeas.length > 0 ? (
                            filteredIdeas.map((idea) => (
                                <div key={idea.id} className="transition-transform hover:scale-[1.02]">
                                    <ProductCard
                                        category="ideas"
                                        sno={idea.id}
                                        slug={idea.slug}
                                        title={idea.name}
                                        image={idea.imageLink}
                                        price={Number(idea.discPrice)}
                                        originalPrice={Number(idea.price)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <EmptySearch />
                                <p className="mt-4 text-lg font-medium text-gray-900">No ideas found</p>
                                <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Load More Button */}
                {filteredIdeas.length > 0 && !activeCategory && !searchQuery && (
                    <div className="mt-12 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8"
                            onClick={resetFilters}
                        >
                            Load More Ideas
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default IdeasPage;