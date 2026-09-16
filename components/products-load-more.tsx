"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/app/types";
import { ProductGrid } from "./products-grid";

interface ProductsLoadMoreProps {
    products: Product[];
}

const INITIAL_PRODUCTS = 20;
const PRODUCTS_PER_LOAD = 10;

export function ProductsLoadMore({
    products,
}: ProductsLoadMoreProps) {
    return (
        <ProductsLoadMoreList products={products} />
    );
}

function ProductsLoadMoreList({
    products,
}: ProductsLoadMoreProps) {
    const [visibleCount, setVisibleCount] =
        useState(INITIAL_PRODUCTS);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = loadMoreRef.current;

        if (!element || visibleCount >= products.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0]?.isIntersecting) {
                    return;
                }

                setVisibleCount((currentCount) =>
                    Math.min(
                        currentCount + PRODUCTS_PER_LOAD,
                        products.length,
                    ),
                );
            },
            {
                rootMargin: "100px",
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [products.length, visibleCount]);

    const visibleProducts =
        products.slice(0, visibleCount);

    const hasMore = visibleCount < products.length;

    return (
        <>
            <ProductGrid products={visibleProducts} />

            {hasMore ? (
                <div
                    ref={loadMoreRef}
                    className="h-1"
                    aria-hidden="true"
                />
            ) : null}
        </>
    );
}