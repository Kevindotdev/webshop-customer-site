import { notFound } from "next/navigation";
import ProductService from "@/services/product-service";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { Breadcrumbs } from "@/components/breadcrumbs";

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

                <div className="grid gap-10 lg:grid-cols-2">
                    <section>
                        <ProductGallery
                            images={product.images}
                            title={product.title}
                        />
                    </section>

                    <ProductInfo product={product} />
                </div>
            </main>
        </>
    );
}