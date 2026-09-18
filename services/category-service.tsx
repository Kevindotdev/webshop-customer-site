import type { Category } from "@/app/types";
import { API_URL } from "@/services/api";

export default class CategoryService {
    static async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        return response.json();
    }
}