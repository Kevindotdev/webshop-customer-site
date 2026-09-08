import type { Product } from "@/app/types";
import { RatingStars } from "./rating-stars";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({
    product,
}: ProductInfoProps) {
    const reviewCount = product.reviews?.length ?? 0;

    return (
        <section>
            <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <div className="flex gap-1">
                    <dt className="text-muted-foreground">
                        Artikelnr:
                    </dt>

                    <dd>
                        {product.id}
                    </dd>
                </div>

                {product.sku ? (
                    <>
                        <span
                            aria-hidden="true"
                            className="text-muted-foreground"
                        >
                            |
                        </span>

                        <dd>
                            {product.sku}
                        </dd>
                    </>
                ) : null}
            </dl>

            {product.brand || product.tags?.length ? (
                <p className="mt-4 text-sm text-muted-foreground">
                    {[product.brand, ...(product.tags ?? [])]
                        .filter(Boolean)
                        .join(" · ")}
                </p>
            ) : null}

            <h1 className="mt-2 text-3xl font-bold">
                {product.title}
            </h1>

            {product.rating ? (
                <div className="mt-3 flex items-center gap-2">
                    <RatingStars rating={product.rating} />

                    <span className="text-sm text-muted-foreground">
                        ({reviewCount})
                    </span>
                </div>
            ) : null}
        </section>
    );
}