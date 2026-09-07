import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/products-grid";
import ProductService from "@/services/product-service";

export default async function ProductsPage() {
    const { products, total } = await ProductService.getProducts();

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
            <div>
                <h1 className="text-2xl font-bold">
                    Alla produkter
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {total} produkter
                </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
                <CategoryFilter />

                <section>
                    <ProductGrid products={products} />
                </section>
            </div>
        </main>
    );
}