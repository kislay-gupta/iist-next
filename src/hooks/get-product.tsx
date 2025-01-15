import conf from "@/config/config";
import axios from "axios";

export async function getProducts(category: string) {
    try {
      const response = await axios.get(
        `${conf.baseUrl}projectData?req_data=getProjectByCatSlug&CatSlug=${category}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

 