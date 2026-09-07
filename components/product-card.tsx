import { Check, Heart, ShoppingCart, X } from "lucide-react";
import type { Product } from "@/app/types";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "./rating-stars";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const discountedPrice =
        product.discountPercentage && product.discountPercentage > 0
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price;

    const reviewCount = product.reviews?.length ?? 0;
    const isInStock = product.stock !== undefined && product.stock > 0;

    return (
        <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
            {/* Product image and information link to the product page. */}
            <a
                href={`/products/${product.id}`}
                className="flex flex-1 flex-col"
            >
                <div className="relative aspect-[4/3] bg-muted">
                    <div className="flex h-full w-full items-center justify-center p-5">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                    </div>

                    {product.discountPercentage &&
                        product.discountPercentage > 0 ? (
                        <span className="absolute left-3 top-3 rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    ) : null}
                </div>

                <div className="flex flex-1 flex-col p-4">
                    <h3 className="truncate text-sm font-medium leading-5 hover:underline">
                        {product.title}
                    </h3>

                    {product.rating ? (
                        <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-1.5">
                                <RatingStars rating={product.rating} />

                                <span className="text-xs text-muted-foreground">
                                    ({reviewCount})
                                </span>
                            </div>

                            {product.stock !== undefined ? (
                                <div
                                    className={`flex shrink-0 items-center gap-1 text-xs ${isInStock
                                        ? "text-success"
                                        : "text-destructive"
                                        }`}
                                >
                                    {isInStock ? (
                                        <Check
                                            className="h-3.5 w-3.5"
                                            strokeWidth={2}
                                        />
                                    ) : (
                                        <X
                                            className="h-3.5 w-3.5"
                                            strokeWidth={2}
                                        />
                                    )}

                                    <span>{product.stock} st</span>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </a>

            {/* Wishlist stays outside the product link so it does not navigate. */}
            <button
                type="button"
                aria-label={`Spara ${product.title}`}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
            >
                <Heart className="h-4 w-4" strokeWidth={1.7} />
            </button>

            <div className="mt-auto p-4 pt-0">
                {product.discountPercentage &&
                    product.discountPercentage > 0 ? (
                    <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.price)}
                    </p>
                ) : null}

                <div className="flex items-end justify-between gap-3">
                    <p className="text-lg font-bold">
                        {formatPrice(discountedPrice)}
                    </p>

                    <button
                        type="button"
                        aria-label={`Lägg ${product.title} i varukorg`}
                        className="flex h-9 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground transition-colors hover:bg-accent-hover cursor-pointer"
                    >
                        <ShoppingCart
                            className="h-4 w-4"
                            strokeWidth={1.7}
                        />
                    </button>
                </div>
            </div>
        </article>
    );
}