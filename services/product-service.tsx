import type { Product, ProductsResponse } from "@/app/types";

const API_URL = "http://localhost:4000";

// Keep the homepage product count small while the full catalog uses pagination.
const defaultLimit = 10;

export default class ProductService {
    static async getProducts(
        currentPage = 1,
        limit = defaultLimit,
    ): Promise<ProductsResponse> {
        const response = await fetch(
            `${API_URL}/products?_page=${currentPage}&_limit=${limit}&_sort=id&_order=desc&_expand=category`,
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return response.json();
    }

    static async getAllProducts(): Promise<ProductsResponse> {
        const response = await fetch(
            `${API_URL}/products?_limit=1000&_sort=id&_order=desc&_expand=category`,
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return response.json();
    }

    static async getProductById(
        productId: number,
    ): Promise<Product | null> {
        const response = await fetch(
            `${API_URL}/products/${productId}?_expand=category`,
        );

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        return response.json();
    }
}