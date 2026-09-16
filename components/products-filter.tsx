"use client";

import {
    ChevronDown,
    ChevronUp,
    SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import type { Product } from "@/app/types";

interface ProductsFilterProps {
    products: Product[];
}

export function ProductsFilter({
    products,
}: ProductsFilterProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const brands = Array.from(
        new Set(
            products
                .map((product) => product.brand)
                .filter(Boolean),
        ),
    ).sort();

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
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                        defaultValue="all"
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
                            placeholder="Max pris"
                            className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
                        />
                    </div>

                    <select
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                        defaultValue="all"
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
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                        defaultValue="all"
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
                </div>

                <select
                    className="ml-auto h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    defaultValue="default"
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
                    className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    defaultValue="all"
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
                        placeholder="Max pris"
                        className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
                    />
                </div>

                <select
                    className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    defaultValue="all"
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
                    className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                    defaultValue="all"
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
            </div>
        </div>
    );
}