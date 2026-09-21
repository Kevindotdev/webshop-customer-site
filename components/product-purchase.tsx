"use client";

import {
    Check,
    ShoppingCart,
    X,
} from "lucide-react";
import type { Product } from "@/app/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./cart-provider";
import { useState } from "react";

interface ProductPurchaseProps {
    product: Product;
}

export function ProductPurchase({
    product,
}: ProductPurchaseProps) {
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const discountPercentage =
        product.discountPercentage ?? 0;

    const hasDiscount = discountPercentage > 0;

    const discountedPrice = hasDiscount
        ? product.price *
        (1 - discountPercentage / 100)
        : product.price;

    const isInStock =
        product.stock !== undefined &&
        product.stock > 0;

    return (
        <aside className="rounded-lg border border-border bg-surface p-5">
            <div className="text-center">
                {hasDiscount ? (
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                        </p>

                        <span className="rounded bg-destructive px-1.5 py-0.5 text-xs font-medium text-destructive-foreground">
                            -{Math.round(discountPercentage)}%
                        </span>
                    </div>
                ) : null}

                <p className="mt-1 text-2xl font-bold tracking-tight">
                    {formatPrice(discountedPrice)}
                </p>
            </div>

            <div className="mt-5 border-t border-border pt-5 justify-items-center">
                {isInStock ? (
                    <div className="flex items-center gap-2 text-sm">
                        <Check
                            className="h-5 w-5 shrink-0 text-success"
                            strokeWidth={2}
                        />

                        <span className="font-medium text-success">
                            I lager
                        </span>

                        <span className="text-foreground">
                            ({product.stock} st)
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                        <X
                            className="h-5 w-5 shrink-0"
                            strokeWidth={2}
                        />

                        <span>
                            Slut i lager
                        </span>
                    </div>
                )}

                {product.shippingInformation ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {product.shippingInformation}
                    </p>
                ) : null}
            </div>

            {isInStock ? (
                <div className="mt-5 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            setQuantity((currentQuantity) =>
                                Math.max(currentQuantity - 1, 1),
                            )
                        }
                        disabled={quantity <= 1}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Minska antal"
                    >
                        -
                    </button>

                    <input
                        type="number"
                        min={1}
                        max={product.stock}
                        value={quantity}
                        onChange={(event) => {
                            const value = Number(event.target.value);

                            if (!Number.isNaN(value)) {
                                setQuantity(
                                    Math.min(
                                        Math.max(value, 1),
                                        product.stock ?? 1,
                                    ),
                                );
                            }
                        }}
                        className="h-10 w-20 rounded-md border border-border bg-surface text-center text-sm text-foreground outline-none focus:border-accent"
                        aria-label="Antal"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setQuantity((currentQuantity) =>
                                Math.min(
                                    currentQuantity + 1,
                                    product.stock ?? 1,
                                ),
                            )
                        }
                        disabled={quantity >= (product.stock ?? 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Öka antal"
                    >
                        +
                    </button>
                </div>
            ) : null}

            <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                disabled={!isInStock}
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-purchase text-sm font-medium text-purchase-foreground transition-colors hover:bg-purchase-hover disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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