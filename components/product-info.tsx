import type { Product } from "@/app/types";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "./rating-stars";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({
    product,
}: ProductInfoProps) {
    const discountedPrice =
        product.discountPercentage &&
            product.discountPercentage > 0
            ? product.price *
            (1 - product.discountPercentage / 100)
            : product.price;

    const reviewCount = product.reviews?.length ?? 0;

    const isInStock =
        product.stock !== undefined &&
        product.stock > 0;

    return (
        <section>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {product.category?.name ? (
                    <span>{product.category.name}</span>
                ) : null}

                {product.category?.name && product.brand ? (
                    <span>•</span>
                ) : null}

                {product.brand ? (
                    <span>{product.brand}</span>
                ) : null}
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {product.title}
            </h1>

            {product.rating ? (
                <div className="mt-4 flex items-center gap-2">
                    <RatingStars rating={product.rating} />

                    <span className="text-sm text-muted-foreground">
                        ({reviewCount})
                    </span>
                </div>
            ) : null}

            <div className="mt-6 border-t border-border pt-6">
                {product.discountPercentage &&
                    product.discountPercentage > 0 ? (
                    <div className="flex items-end gap-3">
                        <p className="text-2xl font-bold">
                            {formatPrice(discountedPrice)}
                        </p>

                        <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                        </p>

                        <span className="rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    </div>
                ) : (
                    <p className="text-2xl font-bold">
                        {formatPrice(product.price)}
                    </p>
                )}

                {product.stock !== undefined ? (
                    <p
                        className={`mt-4 text-sm font-medium ${isInStock
                            ? "text-success"
                            : "text-destructive"
                            }`}
                    >
                        {isInStock
                            ? `I lager (${product.stock} st)`
                            : "Slut i lager"}
                    </p>
                ) : null}
            </div>
        </section>
    );
}