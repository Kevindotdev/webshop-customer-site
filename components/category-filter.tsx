"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { storeCategories } from "@/lib/store-categories";
import { Category } from "@/app/types";

interface CategoryFilterProps {
    categories: Category[];
}

export function CategoryFilter({
    categories,
}: CategoryFilterProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get("category");
    const selectedSubcategory = searchParams.get("subcategory");

    const toggleCategory = (name: string) => {
        setExpandedCategories((currentCategories) =>
            currentCategories.includes(name)
                ? currentCategories.filter(
                    (category) => category !== name,
                )
                : [...currentCategories, name],
        );
    };

    return (
        <aside>
            <h2 className="text-sm font-semibold">
                Kategorier
            </h2>

            <nav className="mt-3">
                <Link
                    href="/products"
                    className="block text-sm font-medium"
                >
                    Alla produkter
                </Link>

                <div className="mt-2 space-y-1">
                    {storeCategories.map(({ name, slugs }) => {
                        const isExpanded = expandedCategories.includes(name);

                        return (
                            <div key={name}>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => toggleCategory(name)}
                                        aria-label={
                                            isExpanded
                                                ? `Dölj ${name}`
                                                : `Visa ${name}`
                                        }
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {isExpanded ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </button>

                                    <Link
                                        href={`/products?category=${encodeURIComponent(name)}`}
                                        onClick={() => {
                                            const isSelectedCategory =
                                                selectedCategory === name && !selectedSubcategory;

                                            if (isSelectedCategory && isExpanded) {
                                                toggleCategory(name);
                                            } else if (!isExpanded) {
                                                toggleCategory(name);
                                            }
                                        }}
                                        className="flex-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {name}
                                    </Link>
                                </div>

                                {isExpanded ? (
                                    <div className="ml-12 space-y-1">
                                        {slugs.map((slug) => {
                                            const category = categories.find(
                                                (category) => category.slug === slug,
                                            );

                                            return (
                                                <Link
                                                    key={slug}
                                                    href={`/products?category=${encodeURIComponent(name)}&subcategory=${encodeURIComponent(slug)}`}
                                                    className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                >
                                                    {category?.name ?? slug}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}