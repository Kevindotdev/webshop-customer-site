import type { Category } from "@/app/types";
import { storeCategories } from "@/lib/store-categories";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    category?: Category;
    storeCategory?: typeof storeCategories[number];
    productTitle?: string;
}

export function Breadcrumbs({
    category,
    storeCategory,
    productTitle,
}: BreadcrumbsProps) {
    const parentCategory = category
        ? storeCategories.find(({ slugs }) =>
            slugs.includes(category.slug),
        )
        : undefined;

    return (
        <nav
            aria-label="Brödsmulor"
            className="mb-6 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm text-muted-foreground"
        >
            <Link
                href="/"
                className="flex shrink-0 items-center hover:text-foreground"
            >
                <Home
                    className="h-4 w-4"
                    strokeWidth={1.5}
                />
            </Link>

            <ChevronRight
                className="h-4 w-4 shrink-0"
                strokeWidth={1.5}
            />

            <Link
                href="/products"
                className="shrink-0 hover:text-foreground"
            >
                Produkter
            </Link>

            {(storeCategory || parentCategory) ? (
                <>
                    <ChevronRight
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.5}
                    />

                    <Link
                        href={`/products?category=${encodeURIComponent(
                            (storeCategory ?? parentCategory)!.name,
                        )}`}
                        className="shrink-0 hover:text-foreground"
                    >
                        {(storeCategory ?? parentCategory)!.name}
                    </Link>
                </>
            ) : null}

            {category && parentCategory ? (
                <>
                    <ChevronRight
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.5}
                    />

                    <Link
                        href={`/products?category=${encodeURIComponent(parentCategory.name)}&subcategory=${encodeURIComponent(category.slug)}`}
                        className="shrink-0 hover:text-foreground"
                    >
                        {category.name}
                    </Link>
                </>
            ) : null}
        </nav>
    );
}