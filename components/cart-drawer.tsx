"use client";

import {
    Minus,
    Plus,
    Trash2,
    X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";

function formatPrice(price: number) {
    return new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
        minimumFractionDigits: 2,
    }).format(price);
}

function getDiscountedPrice(
    price: number,
    discountPercentage?: number,
) {
    const discount = discountPercentage ?? 0;

    return price * (1 - discount / 100);
}

export function CartDrawer() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        isCartOpen,
        setIsCartOpen,
    } = useCart();

    const [viewportHeight, setViewportHeight] =
        useState<number | null>(null);

    useEffect(() => {
        const updateViewportHeight = () => {
            setViewportHeight(
                window.visualViewport?.height ??
                window.innerHeight,
            );
        };

        updateViewportHeight();

        window.visualViewport?.addEventListener(
            "resize",
            updateViewportHeight,
        );

        return () => {
            window.visualViewport?.removeEventListener(
                "resize",
                updateViewportHeight,
            );
        };
    }, []);

    useEffect(() => {
        if (!isCartOpen) {
            return;
        }

        const scrollbarWidth =
            window.innerWidth -
            document.documentElement.clientWidth;

        const originalOverflow =
            document.body.style.overflow;

        const originalPaddingRight =
            document.body.style.paddingRight;

        document.body.style.overflow = "hidden";

        document.body.style.paddingRight =
            `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow =
                originalOverflow;

            document.body.style.paddingRight =
                originalPaddingRight;
        };
    }, [isCartOpen]);

    if (!isCartOpen) {
        return null;
    }

    const savings = cartItems.reduce(
        (total, item) => {
            const discountPercentage =
                item.product.discountPercentage ?? 0;

            const originalPrice =
                item.product.price;

            const discountedPrice =
                getDiscountedPrice(
                    item.product.price,
                    discountPercentage,
                );

            return (
                total +
                (originalPrice - discountedPrice) *
                item.quantity
            );
        },
        0,
    );

    const subtotalExcludingVat = subtotal / 1.25;

    return (
        <div className="fixed inset-0 z-60">
            <button
                type="button"
                aria-label="Stäng varukorg"
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black/40"
            />

            <aside
                style={
                    viewportHeight
                        ? {
                            maxHeight: `${viewportHeight - 96}px`,
                        }
                        : undefined
                }
                className="absolute inset-x-4 top-20 flex max-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-lg bg-surface shadow-xl md:inset-x-auto md:right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:top-16 md:w-full md:max-w-xl"
            >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
                    <h2 className="text-lg font-semibold">
                        Varukorg
                    </h2>

                    <button
                        type="button"
                        aria-label="Stäng varukorg"
                        onClick={() => setIsCartOpen(false)}
                        className="text-foreground hover:text-muted-foreground cursor-pointer"
                    >
                        <X
                            className="h-5 w-5"
                            strokeWidth={1.6}
                        />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Din varukorg är tom.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                const {
                                    product,
                                    quantity,
                                } = item;

                                const price =
                                    getDiscountedPrice(
                                        product.price,
                                        product.discountPercentage,
                                    );

                                const isAtMaxStock =
                                    quantity >=
                                    (product.stock ?? quantity);

                                const isInStock =
                                    product.stock !== undefined &&
                                    product.stock > 0;

                                return (
                                    <div
                                        key={product.id}
                                        className="flex gap-4 border-b border-border pb-4"
                                    >
                                        <a
                                            href={`/products/${product.id}`}
                                            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-border"
                                        >
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                width={64}
                                                height={64}
                                                className="max-h-16 max-w-16 object-contain"
                                            />
                                        </a>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex justify-between gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-sm font-medium">
                                                        <a
                                                            href={`/products/${product.id}`}
                                                            className="hover:underline"
                                                        >
                                                            {product.title}
                                                        </a>
                                                    </h3>

                                                    <div className="mt-1 flex items-center gap-2">
                                                        <p className="font-semibold">
                                                            {formatPrice(price)}
                                                        </p>

                                                        {product.discountPercentage &&
                                                            product.discountPercentage > 0 ? (
                                                            <>
                                                                <span className="text-xs text-muted-foreground line-through">
                                                                    {formatPrice(product.price)}
                                                                </span>

                                                                <span className="rounded bg-destructive px-1.5 py-0.5 text-xs font-medium text-destructive-foreground">
                                                                    -{product.discountPercentage}%
                                                                </span>
                                                            </>
                                                        ) : null}
                                                    </div>

                                                    <p
                                                        className={`mt-1 text-xs ${isInStock
                                                            ? "text-muted-foreground"
                                                            : "text-destructive"
                                                            }`}
                                                    >
                                                        {isInStock
                                                            ? `✓ I lager (${product.stock} st)`
                                                            : "✕ Ej i lager"}
                                                    </p>
                                                </div>

                                                <div className="flex shrink-0 flex-col items-end gap-3">
                                                    <button
                                                        type="button"
                                                        aria-label={`Ta bort ${product.title}`}
                                                        onClick={() =>
                                                            removeFromCart(
                                                                product.id,
                                                            )
                                                        }
                                                        className="h-fit text-muted-foreground hover:text-foreground cursor-pointer"
                                                    >
                                                        <Trash2
                                                            className="h-4 w-4"
                                                            strokeWidth={1.6}
                                                        />
                                                    </button>

                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            aria-label="Minska antal"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    product.id,
                                                                    quantity - 1,
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted cursor-pointer"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>

                                                        <span className="w-5 text-center text-sm">
                                                            {quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            aria-label="Öka antal"
                                                            disabled={isAtMaxStock}
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    product.id,
                                                                    quantity + 1,
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 ? (
                    <div className="shrink-0 border-t border-border p-6">
                        <div className="flex justify-end pt-1">
                            <div className="space-y-2 text-right">
                                <div className="flex items-center justify-end gap-4">
                                    <span className="text-sm text-muted-foreground">
                                        Summa:
                                    </span>

                                    <span className="min-w-28 text-lg font-semibold">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <span className="text-sm text-muted-foreground">
                                        Exkl. moms:
                                    </span>

                                    <span className="min-w-28 text-sm text-muted-foreground">
                                        {formatPrice(subtotalExcludingVat)}
                                    </span>
                                </div>

                                {savings > 0 ? (
                                    <div className="flex items-center justify-end gap-4">
                                        <span className="text-sm text-muted-foreground">
                                            Du sparar:
                                        </span>

                                        <span className="min-w-28 text-sm">
                                            {formatPrice(savings)}
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-5 flex gap-3">
                            <button
                                type="button"
                                onClick={clearCart}
                                className="rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-muted cursor-pointer"
                            >
                                Rensa varukorgen
                            </button>

                            <button
                                type="button"
                                className="flex-1 rounded-md bg-purchase px-4 py-3 text-sm font-medium text-purchase-foreground hover:bg-purchase/90 cursor-pointer"
                            >
                                Till kassan
                            </button>
                        </div>
                    </div>
                ) : null}
            </aside>
        </div>
    );
}