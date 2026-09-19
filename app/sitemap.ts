import type { MetadataRoute } from "next";
import ProductService from "@/services/product-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { products } =
        await ProductService.getAllProducts();

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3001";

    return [
        {
            url: baseUrl,
        },
        {
            url: `${baseUrl}/products`,
        },
        ...products.map((product) => ({
            url: `${baseUrl}/products/${product.id}`,
        })),
    ];
}