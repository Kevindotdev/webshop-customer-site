import { CategorySidebar } from "@/components/category-sidebar";
import { ProductsFilter } from "@/components/products-filter";
import { ProductsLoadMore } from "@/components/products-load-more";
import { storeCategories } from "@/lib/store-categories";
import CategoryService from "@/services/category-service";
import ProductService from "@/services/product-service";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Metadata } from "next";

interface ProductsPageProps {
    searchParams: Promise<{
        category?: string;
        subcategory?: string;
        stock?: string;
        minPrice?: string;
        maxPrice?: string;
        rating?: string;
        brand?: string;
        sort?: string;
    }>;
}

export async function generateMetadata({
    searchParams,
}: ProductsPageProps): Promise<Metadata> {
    const {
        category,
        subcategory,
    } = await searchParams;

    const categories =
        await CategoryService.getAllCategories();

    const selectedCategory = storeCategories.find(
        (storeCategory) => storeCategory.name === category,
    );

    const selectedSubcategory = subcategory
        ? categories.find(
            (category) => category.slug === subcategory,
        )
        : undefined;

    const title =
        selectedSubcategory?.name ??
        selectedCategory?.name ??
        "Produkter";

    return {
        title,
        description: `Utforska ${title.toLowerCase()} hos Webshop.`,
    };
}

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const {
        category,
        subcategory,
        stock,
        minPrice,
        maxPrice,
        rating,
        brand,
        sort,
    } = await searchParams;

    const { products } = await ProductService.getAllProducts();
    const categories = await CategoryService.getAllCategories();

    const selectedCategory = storeCategories.find(
        (storeCategory) => storeCategory.name === category,
    );

    const selectedSubcategory = subcategory
        ? categories.find(
            (storeCategory) => storeCategory.slug === subcategory,
        )
        : undefined;

    const categoryFilteredProducts = subcategory
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

    const minPriceValue = minPrice
        ? Number(minPrice)
        : null;

    const maxPriceValue = maxPrice
        ? Number(maxPrice)
        : null;

    const ratingValue = rating
        ? Number(rating)
        : null;

    const filteredProducts = categoryFilteredProducts.filter(
        (product) => {
            const discountedPrice =
                product.price *
                (1 - (product.discountPercentage ?? 0) / 100);

            if (
                stock === "in-stock" &&
                (!product.stock || product.stock <= 0)
            ) {
                return false;
            }

            if (
                minPriceValue !== null &&
                discountedPrice < minPriceValue
            ) {
                return false;
            }

            if (
                maxPriceValue !== null &&
                discountedPrice > maxPriceValue
            ) {
                return false;
            }

            if (
                ratingValue !== null &&
                (product.rating ?? 0) < ratingValue
            ) {
                return false;
            }

            if (
                brand &&
                brand !== "all" &&
                product.brand !== brand
            ) {
                return false;
            }

            return true;
        },
    );

    if (sort === "price-asc") {
        filteredProducts.sort((a, b) => {
            const priceA =
                a.price *
                (1 - (a.discountPercentage ?? 0) / 100);

            const priceB =
                b.price *
                (1 - (b.discountPercentage ?? 0) / 100);

            return priceA - priceB;
        });
    }

    if (sort === "price-desc") {
        filteredProducts.sort((a, b) => {
            const priceA =
                a.price *
                (1 - (a.discountPercentage ?? 0) / 100);

            const priceB =
                b.price *
                (1 - (b.discountPercentage ?? 0) / 100);

            return priceB - priceA;
        });
    }

    if (sort === "rating-desc") {
        filteredProducts.sort(
            (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
        );
    }

    if (sort === "discount-desc") {
        filteredProducts.sort(
            (a, b) =>
                (b.discountPercentage ?? 0) -
                (a.discountPercentage ?? 0),
        );
    }

    if (sort === "name-asc") {
        filteredProducts.sort((a, b) =>
            a.title.localeCompare(b.title),
        );
    }

    if (sort === "name-desc") {
        filteredProducts.sort((a, b) =>
            b.title.localeCompare(a.title),
        );
    }

    return (
        <div className="relative mx-auto w-full max-w-7xl">
            <CategorySidebar categories={categories} />

            <main className="flex-1 px-6 py-8">
                <Breadcrumbs
                    storeCategory={selectedCategory}
                    category={selectedSubcategory}
                />

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

                <ProductsFilter
                    products={categoryFilteredProducts}
                />

                <div className="mt-8">
                    <section className="mx-auto">
                        <ProductsLoadMore
                            key={`${category ?? "all"}-${subcategory ?? "all"}-${stock ?? "all"}-${minPrice ?? ""}-${maxPrice ?? ""}-${rating ?? "all"}-${brand ?? "all"}-${sort ?? "default"}`}
                            products={filteredProducts}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}