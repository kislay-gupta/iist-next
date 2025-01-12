import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Category {
  sno: string;
  CatName: string;
  slug: string;
  description: string;
  image: string;
  imageLink: string;
}

interface CategoryResponse {
  data: Category[];
}

const fetchCategories = async (): Promise<CategoryResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category?req_data=getCat`
  );
// Adjust the API endpoint as needed
  return response.data;
};

export const useCategory = () => {
  const {
    data: categories,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
  });

  return {
    categories,
    isLoading,
    refetch
  };
};
