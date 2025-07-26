import { Idea, Category } from "@/types/ideas";

// Mock Categories Data
export const mockCategories: Category[] = [
  {
    _id: "cat-1",
    name: "All Ideas",
    slug: "all",
    description: "All creative ideas and projects",
    color: "#3B82F6",
    count: 24,
    order: 0,
  },
  {
    _id: "cat-2",
    name: "Science Experiments",
    slug: "science-experiments",
    description: "Fun and educational science experiments",
    color: "#10B981",
    count: 8,
    order: 1,
  },
  {
    _id: "cat-3",
    name: "Art & Crafts",
    slug: "art-crafts",
    description: "Creative art and craft projects",
    color: "#F59E0B",
    count: 6,
    order: 2,
  },
  {
    _id: "cat-4",
    name: "Technology",
    slug: "technology",
    description: "Tech projects and innovations",
    color: "#8B5CF6",
    count: 5,
    order: 3,
  },
  {
    _id: "cat-5",
    name: "Environmental",
    slug: "environmental",
    description: "Eco-friendly and sustainability projects",
    color: "#059669",
    count: 5,
    order: 4,
  },
];

// Mock Ideas Data
export const mockIdeas: Idea[] = [
  {
    _id: "idea-1",
    title: "DIY Volcano Eruption Experiment",
    description:
      "Learn about chemical reactions with this exciting volcano experiment using household items.",
    content:
      "A detailed guide to creating a safe and educational volcano experiment...",
    image: "/images/volcano-experiment.jpg",
    author: {
      _id: "author-1",
      name: "Dr. Sarah Johnson",
      avatar: "/images/authors/sarah-johnson.jpg",
    },
    category: "science-experiments",
    slug: "diy-volcano-eruption-experiment",
    publishedAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    engagement: {
      views: 1250,
      likes: 89,
      comments: 23,
    },
    featured: true,
    status: "published",
  },
  {
    _id: "idea-2",
    title: "Recycled Paper Art Collage",
    description:
      "Create beautiful artwork while learning about recycling and environmental conservation.",
    content:
      "Step-by-step instructions for creating stunning collages from recycled materials...",
    image: "/images/paper-collage.jpg",
    author: {
      _id: "author-2",
      name: "Maria Rodriguez",
      avatar: "/images/authors/maria-rodriguez.jpg",
    },
    category: "art-crafts",
    slug: "recycled-paper-art-collage",
    publishedAt: "2024-01-14T09:15:00Z",
    engagement: {
      views: 890,
      likes: 67,
      comments: 15,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-3",
    title: "Build Your Own Weather Station",
    description:
      "Construct a simple weather monitoring device using Arduino and sensors.",
    content:
      "Complete tutorial for building a weather station with temperature, humidity, and pressure sensors...",
    image: "/images/weather-station.jpg",
    author: {
      _id: "author-3",
      name: "Alex Chen",
      avatar: "/images/authors/alex-chen.jpg",
    },
    category: "technology",
    slug: "build-your-own-weather-station",
    publishedAt: "2024-01-13T16:45:00Z",
    engagement: {
      views: 2100,
      likes: 156,
      comments: 42,
    },
    featured: true,
    status: "published",
  },
  {
    _id: "idea-4",
    title: "Solar-Powered LED Garden Lights",
    description:
      "Create eco-friendly garden lighting using solar panels and LED strips.",
    content:
      "Learn how to build sustainable garden lighting that charges during the day...",
    image: "/images/solar-garden-lights.jpg",
    author: {
      _id: "author-4",
      name: "Emma Thompson",
      avatar: "/images/authors/emma-thompson.jpg",
    },
    category: "environmental",
    slug: "solar-powered-led-garden-lights",
    publishedAt: "2024-01-12T11:20:00Z",
    engagement: {
      views: 1680,
      likes: 124,
      comments: 31,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-5",
    title: "Crystal Growing Laboratory",
    description:
      "Grow beautiful crystals at home and learn about crystallization processes.",
    content:
      "Detailed instructions for growing various types of crystals safely at home...",
    image: "/images/crystal-growing.jpg",
    author: {
      _id: "author-1",
      name: "Dr. Sarah Johnson",
      avatar: "/images/authors/sarah-johnson.jpg",
    },
    category: "science-experiments",
    slug: "crystal-growing-laboratory",
    publishedAt: "2024-01-11T14:30:00Z",
    engagement: {
      views: 950,
      likes: 78,
      comments: 19,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-6",
    title: "Handmade Paper from Recycled Materials",
    description:
      "Transform old newspapers and magazines into beautiful handmade paper.",
    content:
      "Complete guide to making paper from recycled materials with natural decorations...",
    image: "/images/handmade-paper.jpg",
    author: {
      _id: "author-2",
      name: "Maria Rodriguez",
      avatar: "/images/authors/maria-rodriguez.jpg",
    },
    category: "art-crafts",
    slug: "handmade-paper-from-recycled-materials",
    publishedAt: "2024-01-10T08:45:00Z",
    engagement: {
      views: 720,
      likes: 54,
      comments: 12,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-7",
    title: "Smart Home Automation with Raspberry Pi",
    description:
      "Build a basic home automation system using Raspberry Pi and Python.",
    content:
      "Step-by-step tutorial for creating a smart home system with lights and sensors...",
    image: "/images/smart-home-automation.jpg",
    author: {
      _id: "author-3",
      name: "Alex Chen",
      avatar: "/images/authors/alex-chen.jpg",
    },
    category: "technology",
    slug: "smart-home-automation-raspberry-pi",
    publishedAt: "2024-01-09T13:15:00Z",
    engagement: {
      views: 2850,
      likes: 201,
      comments: 58,
    },
    featured: true,
    status: "published",
  },
  {
    _id: "idea-8",
    title: "Composting System for Small Spaces",
    description:
      "Create an efficient composting system perfect for apartments and small gardens.",
    content: "Learn how to set up and maintain a compact composting system...",
    image: "/images/composting-system.jpg",
    author: {
      _id: "author-4",
      name: "Emma Thompson",
      avatar: "/images/authors/emma-thompson.jpg",
    },
    category: "environmental",
    slug: "composting-system-small-spaces",
    publishedAt: "2024-01-08T10:00:00Z",
    engagement: {
      views: 1420,
      likes: 98,
      comments: 27,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-9",
    title: "Rainbow Density Tower Experiment",
    description:
      "Create a colorful tower of liquids to demonstrate density and layering.",
    content:
      "Fun experiment showing how different liquids layer based on their density...",
    image: "/images/density-tower.jpg",
    author: {
      _id: "author-1",
      name: "Dr. Sarah Johnson",
      avatar: "/images/authors/sarah-johnson.jpg",
    },
    category: "science-experiments",
    slug: "rainbow-density-tower-experiment",
    publishedAt: "2024-01-07T15:30:00Z",
    engagement: {
      views: 1100,
      likes: 85,
      comments: 21,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-10",
    title: "Painted Rock Garden Markers",
    description:
      "Design and paint rocks to create beautiful and functional garden markers.",
    content:
      "Creative ideas for painting rocks to label plants and decorate gardens...",
    image: "/images/painted-rock-markers.jpg",
    author: {
      _id: "author-2",
      name: "Maria Rodriguez",
      avatar: "/images/authors/maria-rodriguez.jpg",
    },
    category: "art-crafts",
    slug: "painted-rock-garden-markers",
    publishedAt: "2024-01-06T12:20:00Z",
    engagement: {
      views: 680,
      likes: 49,
      comments: 14,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-11",
    title: "LED Matrix Display Project",
    description:
      "Program an LED matrix to display custom messages and animations.",
    content:
      "Learn to control LED matrices with microcontrollers for dynamic displays...",
    image: "/images/led-matrix-display.jpg",
    author: {
      _id: "author-3",
      name: "Alex Chen",
      avatar: "/images/authors/alex-chen.jpg",
    },
    category: "technology",
    slug: "led-matrix-display-project",
    publishedAt: "2024-01-05T09:45:00Z",
    engagement: {
      views: 1950,
      likes: 142,
      comments: 35,
    },
    featured: false,
    status: "published",
  },
  {
    _id: "idea-12",
    title: "Rainwater Collection System",
    description:
      "Build a simple system to collect and filter rainwater for garden use.",
    content:
      "Sustainable water collection system perfect for eco-conscious gardeners...",
    image: "/images/rainwater-collection.jpg",
    author: {
      _id: "author-4",
      name: "Emma Thompson",
      avatar: "/images/authors/emma-thompson.jpg",
    },
    category: "environmental",
    slug: "rainwater-collection-system",
    publishedAt: "2024-01-04T14:10:00Z",
    engagement: {
      views: 1320,
      likes: 96,
      comments: 24,
    },
    featured: false,
    status: "published",
  },
];

// Helper functions for mock data
export const getMockIdeasByCategory = (categorySlug: string): Idea[] => {
  if (categorySlug === "all") {
    return mockIdeas;
  }
  return mockIdeas.filter((idea) => idea.category === categorySlug);
};

export const getMockFeaturedIdeas = (): Idea[] => {
  return mockIdeas.filter((idea) => idea.featured === true);
};

export const getMockIdeasByAuthor = (authorId: string): Idea[] => {
  return mockIdeas.filter((idea) => idea.author._id === authorId);
};

export const getMockIdeaBySlug = (slug: string): Idea | undefined => {
  return mockIdeas.find((idea) => idea.slug === slug);
};

// Mock API response generators
export const generateMockIdeasResponse = (categorySlug?: string) => {
  const ideas = categorySlug ? getMockIdeasByCategory(categorySlug) : mockIdeas;

  return {
    status: 200,
    message: "Ideas retrieved successfully",
    data: {
      ideas,
      pagination: {
        total: ideas.length,
        currentPage: 1,
        totalPages: Math.ceil(ideas.length / 12),
      },
    },
  };
};

export const generateMockCategoriesResponse = () => {
  return {
    status: 200,
    message: "Categories retrieved successfully",
    data: {
      categories: mockCategories,
    },
  };
};
