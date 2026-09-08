import { Check, ShoppingCart, X } from "lucide-react";
import type { Product } from "@/app/types";
import { formatPrice } from "@/lib/utils";

interface ProductPurchaseProps {
    product: Product;
}

export function ProductPurchase({
    product,
}: ProductPurchaseProps) {
    const discountedPrice =
        product.discountPercentage && product.discountPercentage > 0
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price;

    const isInStock =
        product.stock !== undefined && product.stock > 0;

    return (
        <aside className="rounded-lg border border-border bg-surface p-5">
            <div>
                {product.discountPercentage &&
                    product.discountPercentage > 0 ? (
                    <p className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.price)}
                    </p>
                ) : null}

                <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold">
                        {formatPrice(discountedPrice)}
                    </p>

                    {product.discountPercentage &&
                        product.discountPercentage > 0 ? (
                        <span className="rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
                <div
                    className={`flex items-center gap-2 text-sm font-medium ${isInStock
                        ? "text-success"
                        : "text-destructive"
                        }`}
                >
                    {isInStock ? (
                        <Check
                            className="h-5 w-5"
                            strokeWidth={2}
                        />
                    ) : (
                        <X
                            className="h-5 w-5"
                            strokeWidth={2}
                        />
                    )}

                    <span>
                        {isInStock
                            ? `I lager (${product.stock} st)`
                            : "Slut i lager"}
                    </span>
                </div>

                {product.shippingInformation ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                        {product.shippingInformation}
                    </p>
                ) : null}
            </div>

            <button
                type="button"
                disabled={!isInStock}
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ShoppingCart
                    className="h-5 w-5"
                    strokeWidth={1.7}
                />

                Lägg i varukorg
            </button>
        </aside>
    );
}