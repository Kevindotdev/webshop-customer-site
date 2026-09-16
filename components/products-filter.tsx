"use client";

import {
    ChevronDown,
    ChevronUp,
    SlidersHorizontal,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/app/types";

interface ProductsFilterProps {
    products: Product[];
}

export function ProductsFilter({
    products,
}: ProductsFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const stock = searchParams.get("stock") ?? "all";
    const minPrice = searchParams.get("minPrice") ?? "";
    const maxPrice = searchParams.get("maxPrice") ?? "";
    const rating = searchParams.get("rating") ?? "all";
    const brand = searchParams.get("brand") ?? "all";
    const sort = searchParams.get("sort") ?? "default";

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [minPriceInput, setMinPriceInput] = useState(minPrice);
    const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

    const brands = Array.from(
        new Set(
            products
                .map((product) => product.brand)
                .filter(Boolean),
        ),
    ).sort();

    const hasActiveFilters =
        stock !== "all" ||
        minPrice !== "" ||
        maxPrice !== "" ||
        rating !== "all" ||
        brand !== "all" ||
        sort !== "default";

    const updateFilter = (
        name: string,
        value: string,
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value || value === "all" || value === "default") {
            params.delete(name);
        } else {
            params.set(name, value);
        }

        router.push(`/products?${params.toString()}`, {
            scroll: false,
        });
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("stock");
        params.delete("minPrice");
        params.delete("maxPrice");
        params.delete("rating");
        params.delete("brand");
        params.delete("sort");

        setMinPriceInput("");
        setMaxPriceInput("");

        const query = params.toString();

        router.push(
            query
                ? `/products?${query}`
                : "/products",
            {
                scroll: false,
            },
        );
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(
                searchParams.toString(),
            );

            if (minPriceInput) {
                params.set("minPrice", minPriceInput);
            } else {
                params.delete("minPrice");
            }

            if (maxPriceInput) {
                params.set("maxPrice", maxPriceInput);
            } else {
                params.delete("maxPrice");
            }

            router.push(`/products?${params.toString()}`, {
                scroll: false,
            });
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [
        minPriceInput,
        maxPriceInput,
        router,
        searchParams,
    ]);

    return (
        <div className="mt-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setIsFilterOpen((current) => !current)}
                    className="flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted md:hidden"
                >
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />

                    <span>
                        Filter
                    </span>

                    {isFilterOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>

                <div className="hidden flex-1 flex-wrap items-center gap-3 md:flex">
                    <select
                        value={stock}
                        onChange={(event) =>
                            updateFilter("stock", event.target.value)
                        }
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    >
                        <option value="all">
                            Alla lagerstatus
                        </option>
                        <option value="in-stock">
                            I lager
                        </option>
                        <option value="out-of-stock">
                            Slut i lager
                        </option>
                    </select>

                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={0}
                            step={1}
                            value={minPriceInput}
                            onChange={(event) =>
                                setMinPriceInput(event.target.value)
                            }
                            placeholder="Min pris"
                            className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
                        />

                        <span className="text-sm text-muted-foreground">
                            -
                        </span>

                        <input
                            type="number"
                            min={0}
                            step={1}
                            value={maxPriceInput}
                            onChange={(event) =>
                                setMaxPriceInput(event.target.value)
                            }
                            placeholder="Max pris"
                            className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
                        />
                    </div>

                    <select
                        value={rating}
                        onChange={(event) =>
                            updateFilter("rating", event.target.value)
                        }
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    >
                        <option value="all">
                            Alla betyg
                        </option>
                        <option value="5">
                            5 stjärnor
                        </option>
                        <option value="4">
                            4+ stjärnor
                        </option>
                        <option value="3">
                            3+ stjärnor
                        </option>
                        <option value="2">
                            2+ stjärnor
                        </option>
                        <option value="1">
                            1+ stjärna
                        </option>
                    </select>

                    <select
                        value={brand}
                        onChange={(event) =>
                            updateFilter("brand", event.target.value)
                        }
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    >
                        <option value="all">
                            Alla varumärken
                        </option>

                        {brands.map((brand) => (
                            <option
                                key={brand}
                                value={brand}
                            >
                                {brand}
                            </option>
                        ))}
                    </select>

                    {hasActiveFilters ? (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="h-9 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            Rensa filter
                        </button>
                    ) : null}
                </div>

                <select
                    value={sort}
                    onChange={(event) =>
                        updateFilter("sort", event.target.value)
                    }
                    className="ml-auto h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                    <option value="default">
                        Sortera
                    </option>
                    <option value="price-asc">
                        Pris: lägst först
                    </option>
                    <option value="price-desc">
                        Pris: högst först
                    </option>
                    <option value="rating-desc">
                        Betyg: högst först
                    </option>
                    <option value="discount-desc">
                        Mest prissänkt
                    </option>
                    <option value="discount-asc">
                        Minst prissänkt
                    </option>
                    <option value="name-asc">
                        Namn: A–Ö
                    </option>
                    <option value="name-desc">
                        Namn: Ö–A
                    </option>
                </select>
            </div>

            <div
                className={`mt-3 flex flex-wrap items-center gap-3 ${isFilterOpen ? "" : "hidden"
                    } md:hidden`}
            >
                <select
                    value={stock}
                    onChange={(event) =>
                        updateFilter("stock", event.target.value)
                    }
                    className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                    <option value="all">
                        Alla lagerstatus
                    </option>
                    <option value="in-stock">
                        I lager
                    </option>
                    <option value="out-of-stock">
                        Slut i lager
                    </option>
                </select>

                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min={0}
                        step={1}
                        value={minPriceInput}
                        onChange={(event) =>
                            setMinPriceInput(event.target.value)
                        }
                        placeholder="Min pris"
                        className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
                    />

                    <span className="text-sm text-muted-foreground">
                        -
                    </span>

                    <input
                        type="number"
                        min={0}
                        step={1}
                        value={maxPriceInput}
                        onChange={(event) =>
                            setMaxPriceInput(event.target.value)
                        }
                        placeholder="Max pris"
                        className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
                    />
                </div>

                <select
                    value={rating}
                    onChange={(event) =>
                        updateFilter("rating", event.target.value)
                    }
                    className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                    <option value="all">
                        Alla betyg
                    </option>
                    <option value="5">
                        5 stjärnor
                    </option>
                    <option value="4">
                        4+ stjärnor
                    </option>
                    <option value="3">
                        3+ stjärnor
                    </option>
                    <option value="2">
                        2+ stjärnor
                    </option>
                    <option value="1">
                        1+ stjärna
                    </option>
                </select>

                <select
                    value={brand}
                    onChange={(event) =>
                        updateFilter("brand", event.target.value)
                    }
                    className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                    <option value="all">
                        Alla varumärken
                    </option>

                    {brands.map((brand) => (
                        <option
                            key={brand}
                            value={brand}
                        >
                            {brand}
                        </option>
                    ))}
                </select>

                {hasActiveFilters ? (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="h-9 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        Rensa filter
                    </button>
                ) : null}
            </div>
        </div>
    );
}