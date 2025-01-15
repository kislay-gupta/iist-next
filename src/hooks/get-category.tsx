"use client";
import axios from "axios";
import useLoader from "./use-loader";
import { useEffect, useState } from "react";
export interface Category {
  sno: string;
  CatName: string;
  slug: string;
  description: string;
  image: string;
  imageLink: string;
}
export const useCategory = () => {
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    try {
      startLoading();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category?req_data=getCat`
      );

      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    refetch: fetchCategories,
  };
};
