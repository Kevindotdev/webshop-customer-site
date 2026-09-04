import { Heart, Star } from "lucide-react";
import type { Product } from "@/app/types";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const discountedPrice =
        product.discountPercentage && product.discountPercentage > 0
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price;

    return (
        <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="relative aspect-square bg-gray-50">
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
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:text-gray-900"
                >
                    <Heart className="h-4 w-4" strokeWidth={1.7} />
                </button>

                {product.discountPercentage && product.discountPercentage > 0 ? (
                    <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        -{Math.round(product.discountPercentage)}%
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
                {product.brand ? (
                    <p className="text-xs text-gray-500">
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

                        <span className="text-xs text-gray-600">
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
                            <span className="text-xs text-gray-400 line-through">
                                {product.price.toFixed(2).replace(".", ",")} kr
                            </span>
                        ) : null}
                    </div>

                    {product.stock !== undefined ? (
                        <p
                            className={`mt-1 text-xs ${product.stock > 0
                                ? "text-green-600"
                                : "text-red-500"
                                }`}
                        >
                            {product.stock > 0
                                ? `I lager (${product.stock})`
                                : "Slut i lager"}
                        </p>
                    ) : null}

                    <button
                        type="button"
                        className="mt-4 w-full rounded-md bg-violet-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-700"
                    >
                        Lägg i varukorg
                    </button>
                </div>
            </div>
        </article>
    );
}