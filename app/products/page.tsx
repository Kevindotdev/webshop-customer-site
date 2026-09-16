import { CategorySidebar } from "@/components/category-sidebar";
import { ProductsLoadMore } from "@/components/products-load-more";
import { storeCategories } from "@/lib/store-categories";
import CategoryService from "@/services/category-service";
import ProductService from "@/services/product-service";

interface ProductsPageProps {
    searchParams: Promise<{
        category?: string;
        subcategory?: string;
    }>;
}

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const { category, subcategory } = await searchParams;

    const { products } = await ProductService.getAllProducts();
    const categories = await CategoryService.getAllCategories();

    const selectedCategory = storeCategories.find(
        (storeCategory) => storeCategory.name === category,
    );

    const filteredProducts = subcategory
        ? products.filter(
            (product) => product.category?.slug === subcategory,
        )
        : selectedCategory
            ? products.filter((product) =>
                selectedCategory.slugs.includes(
                    product.category?.slug ?? "",
                ),
            )
            : products;

    return (
        <div className="relative mx-auto w-full max-w-7xl">
            <CategorySidebar categories={categories} />

            <main className="flex-1 px-6 py-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        {selectedCategory
                            ? selectedCategory.name
                            : "Alla produkter"}
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {filteredProducts.length} produkter
                    </p>
                </div>

                <div className="mt-8">
                    <section className="mx-auto">
                        <ProductsLoadMore
                            key={category ?? subcategory ?? "all"}
                            products={filteredProducts}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}