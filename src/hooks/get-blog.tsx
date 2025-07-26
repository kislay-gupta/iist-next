import axios from "axios";

export async function getBlogs(slug: string) {
    try {
        const response = await axios.get(
            `https://api.iistbihar.com/api/v1/blogData?req_data=getBlogByCatSlug&CatSlug=${slug}`
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

