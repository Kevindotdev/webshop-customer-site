import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/products-grid";
import { storeCategories } from "@/lib/store-categories";
import ProductService from "@/services/product-service";

interface ProductsPageProps {
    searchParams: Promise<{
        category?: string;
    }>;
}

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const { category } = await searchParams;

    const { products, total } = await ProductService.getAllProducts();

    const selectedCategory = storeCategories.find(
        (storeCategory) => storeCategory.name === category,
    );

    const filteredProducts = selectedCategory
        ? products.filter((product) =>
            selectedCategory.slugs.includes(product.category?.slug ?? ""),
        )
        : products;

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
            <div>
                <h1 className="text-2xl font-bold">
                    {selectedCategory
                        ? selectedCategory.name
                        : "Alla produkter"}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {selectedCategory
                        ? `${filteredProducts.length} produkter`
                        : `${total} produkter`}
                </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
                <CategoryFilter />

                <section>
                    <ProductGrid products={filteredProducts} />
                </section>
            </div>
        </main>
    );
}