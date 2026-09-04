import type { Category } from "@/app/types";

const API_URL = "http://localhost:4000";

export default class CategoryService {
    static async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        return response.json();
    }
}