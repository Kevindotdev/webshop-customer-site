"use client";

import { X } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartDrawer() {
    const {
        isCartOpen,
        setIsCartOpen,
    } = useCart();

    if (!isCartOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-60">
            <button
                type="button"
                aria-label="Stäng varukorg"
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black/40"
            />

            <aside className="absolute inset-x-4 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg bg-surface shadow-xl md:inset-x-auto md:right-6 md:top-16 md:w-full md:max-w-xl">
                <div className="flex h-16 items-center justify-between border-b border-border px-6">
                    <h2 className="text-lg font-semibold">
                        Varukorg
                    </h2>

                    <button
                        type="button"
                        aria-label="Stäng varukorg"
                        onClick={() => setIsCartOpen(false)}
                        className="text-foreground hover:text-muted-foreground"
                    >
                        <X
                            className="h-5 w-5"
                            strokeWidth={1.6}
                        />
                    </button>
                </div>
            </aside>
        </div>
    );
}