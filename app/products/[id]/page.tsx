import { notFound } from "next/navigation";
import ProductService from "@/services/product-service";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductDescription } from "@/components/product-description";

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

    return (
        <>
            <main className="mx-auto w-full max-w-7xl px-6 py-8">
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
            </main>
        </>
    );
}