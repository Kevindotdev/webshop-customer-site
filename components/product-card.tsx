import { Heart, Star } from "lucide-react";
import type { Product } from "@/app/types";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Calculate the selling price after applying the product discount
    const discountedPrice =
        product.discountPercentage && product.discountPercentage > 0
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price;

    return (
        <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
            <div className="relative aspect-square bg-muted">
                <a
                    href={`/products/${product.id}`}
                    className="flex h-full w-full items-center justify-center p-5"
                >
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                </a>

                <button
                    type="button"
                    aria-label={`Spara ${product.title}`}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Heart className="h-4 w-4" strokeWidth={1.7} />
                </button>

                {product.discountPercentage && product.discountPercentage > 0 ? (
                    <span className="absolute left-3 top-3 rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                        -{Math.round(product.discountPercentage)}%
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
                {product.brand ? (
                    <p className="text-xs text-muted-foreground">
                        {product.brand}
                    </p>
                ) : null}

                <a
                    href={`/products/${product.id}`}
                    className="mt-1 line-clamp-2 text-sm font-medium leading-5 hover:underline"
                >
                    {product.title}
                </a>

                {product.rating ? (
                    <div className="mt-2 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-current" />

                        <span className="text-xs text-muted-foreground">
                            {product.rating.toFixed(1)}
                        </span>
                    </div>
                ) : null}

                <div className="mt-auto pt-4">
                    <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-base font-bold">
                            {discountedPrice.toFixed(2).replace(".", ",")} kr
                        </span>

                        {product.discountPercentage && product.discountPercentage > 0 ? (
                            <span className="text-xs text-muted-foreground line-through">
                                {product.price.toFixed(2).replace(".", ",")} kr
                            </span>
                        ) : null}
                    </div>

                    {product.stock !== undefined ? (
                        <p
                            className={`mt-1 text-xs ${product.stock > 0
                                ? "text-success"
                                : "text-destructive"
                                }`}
                        >
                            {product.stock > 0
                                ? `I lager (${product.stock})`
                                : "Slut i lager"}
                        </p>
                    ) : null}

                    <button
                        type="button"
                        className="mt-4 w-full rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
                    >
                        Lägg i varukorg
                    </button>
                </div>
            </div>
        </article>
    );
}