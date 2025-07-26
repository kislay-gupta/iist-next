// Ideas Gallery Types and Interfaces

export interface Author {
  _id: string;
  name: string;
  avatar?: string;
}

export interface Engagement {
  views: number;
  likes: number;
  comments: number;
}

export interface Idea {
  _id: string;
  title: string;
  description: string;
  content?: string; // Full content for detail page
  image: string;
  author: Author;
  category: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  engagement: Engagement;
  featured?: boolean;
  status?: "draft" | "published" | "archived";
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string; // For category badges
  count: number;
  order?: number;
}

// Component Props Interfaces
export interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
}

export interface IdeaCardProps {
  idea: Idea;
  onLike?: (ideaId: string) => void;
  onBookmark?: (ideaId: string) => void;
}

export interface IdeasGridProps {
  ideas: Idea[];
  loading: boolean;
  onLoadMore?: () => void;
  onLike?: (ideaId: string) => void;
  onBookmark?: (ideaId: string) => void;
}

export interface IdeasGalleryPageProps {
  initialIdeas?: Idea[];
  initialCategories?: Category[];
}

// API Response Types
export interface IdeasResponse {
  status: number;
  message: string;
  data: {
    ideas: Idea[];
    pagination?: {
      total: number;
      currentPage: number;
      totalPages: number;
    };
  };
}

export interface CategoriesResponse {
  status: number;
  message: string;
  data: {
    categories: Category[];
  };
}

// Filter and Sort Types
export type SortOption = "newest" | "oldest" | "popular" | "trending";

export interface FilterOptions {
  category?: string;
  sort?: SortOption;
  featured?: boolean;
  author?: string;
}

// Loading and Error States
export interface LoadingState {
  ideas: boolean;
  categories: boolean;
  filtering: boolean;
}

export interface ErrorState {
  ideas: string | null;
  categories: string | null;
  general: string | null;
}
