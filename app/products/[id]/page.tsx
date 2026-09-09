import { notFound } from "next/navigation";
import ProductService from "@/services/product-service";
import CategoryService from "@/services/category-service";
import { CategorySidebar } from "@/components/category-sidebar";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductDescription } from "@/components/product-description";
import { ProductSpecifications } from "@/components/product-specifications";
import { ProductReviews } from "@/components/product-reviews";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({
    params,
}: ProductPageProps) {
    const { id } = await params;

    const productId = Number(id);

    if (Number.isNaN(productId)) {
        notFound();
    }

    const product =
        await ProductService.getProductById(productId);

    if (!product) {
        notFound();
    }

    const categories =
        await CategoryService.getAllCategories();

    return (
        <div className="relative mx-auto w-full max-w-7xl">
            <CategorySidebar
                categories={categories}
                activeCategorySlug={product.category?.slug}
            />

            <main className="flex-1 px-6 py-8">
                <Breadcrumbs
                    category={product.category}
                    productTitle={product.title}
                />

                <div className="grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
                    <div className="contents xl:block xl:min-w-0">
                        <div className="order-1">
                            <ProductInfo product={product} />
                        </div>

                        <div className="order-3 mt-8 xl:mt-8">
                            <ProductDescription
                                description={product.description}
                            />
                        </div>
                    </div>

                    <section className="order-2 min-w-0 xl:order-0">
                        <ProductGallery
                            images={product.images}
                            title={product.title}
                        />
                    </section>

                    <div className="order-4 min-w-0 xl:order-0">
                        <ProductPurchase product={product} />
                    </div>
                </div>

                <section className="mx-auto mt-22 max-w-2xl">
                    <ProductSpecifications product={product} />
                </section>

                <section className="mx-auto mt-22 max-w-2xl">
                    <ProductReviews
                        reviews={product.reviews}
                    />
                </section>
            </main>
        </div>
    );
}