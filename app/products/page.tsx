import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/products-grid";
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

    const { products, total } = await ProductService.getAllProducts();
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

            <div className="relative mt-8">
                <aside className="lg:absolute lg:right-full lg:mr-8 lg:w-[220px]">
                    <CategoryFilter categories={categories} />
                </aside>

                <section className="mx-auto">
                    <ProductGrid products={filteredProducts} />
                </section>
            </div>
        </main>
    );
}