"use client";

import Link from "next/link";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    Search,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useCategorySidebar } from "./category-sidebar-provider";
import { useState, useEffect } from "react";
import { storeCategories } from "@/lib/store-categories";
import { Category } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { useCart } from "./cart-provider";

interface HeaderProps {
    categories: Category[];
}

export function Header({
    categories,
}: HeaderProps) {
    const {
        isCategorySidebarOpen,
        setIsCategorySidebarOpen,
        activeCategorySlug,
    } = useCategorySidebar();

    const { itemCount, setIsCartOpen, } = useCart();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] =
        useState(false);
    const [expandedMobileCategory, setExpandedMobileCategory] =
        useState<string | null>(null);

    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get("category");

    const selectedSubcategory =
        searchParams.get("subcategory") ??
        activeCategorySlug;

    const activeStoreCategory = selectedSubcategory
        ? storeCategories.find((storeCategory) =>
            storeCategory.slugs.includes(selectedSubcategory),
        )
        : undefined;

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-surface md:static">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="shrink-0 text-lg font-bold tracking-tight"
                >
                    WEBSHOP
                </Link>

                {/* Desktop navigation */}
                <nav className="ml-8 hidden items-center gap-7 text-sm md:flex">
                    <button
                        type="button"
                        onClick={() =>
                            setIsCategorySidebarOpen(!isCategorySidebarOpen)
                        }
                        className="flex items-center gap-1 hover:text-muted-foreground"
                    >
                        Kategorier

                        {isCategorySidebarOpen ? (
                            <ChevronDown className="h-3 w-3" />
                        ) : (
                            <ChevronRight className="h-3 w-3" />
                        )}
                    </button>

                    <a
                        href="#"
                        className="hover:text-muted-foreground"
                    >
                        Nyheter
                    </a>

                    <a
                        href="#"
                        className="hover:text-muted-foreground"
                    >
                        Erbjudanden
                    </a>
                </nav>

                {/* Desktop actions */}
                <div className="ml-auto hidden items-center gap-5 md:flex">
                    <div className="flex h-9 w-40 items-center rounded-md border border-border px-3">
                        <input
                            type="text"
                            placeholder="Sök produkter..."
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                        />

                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>

                    <ThemeToggle />

                    <button
                        type="button"
                        aria-label="Konto"
                        className="text-foreground hover:text-muted-foreground"
                    >
                        <User className="h-5 w-5" strokeWidth={1.6} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Varukorg"
                        className="relative text-foreground hover:text-muted-foreground"
                    >
                        <ShoppingCart
                            className="h-5 w-5"
                            strokeWidth={1.6}
                        />

                        {itemCount > 0 ? (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                                {itemCount}
                            </span>
                        ) : null}
                    </button>
                </div>

                {/* Mobile actions */}
                <div className="ml-auto flex items-center gap-4 md:hidden">
                    <button
                        type="button"
                        aria-label="Sök"
                        className="text-foreground hover:text-muted-foreground"
                    >
                        <Search className="h-5 w-5" strokeWidth={1.6} />
                    </button>

                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Varukorg"
                        className="relative text-foreground hover:text-muted-foreground"
                    >
                        <ShoppingCart
                            className="h-5 w-5"
                            strokeWidth={1.6}
                        />

                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                            3
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            const isOpeningMenu = !isMobileMenuOpen;

                            setIsMobileMenuOpen(isOpeningMenu);

                            if (isOpeningMenu) {
                                if (selectedCategory) {
                                    setIsMobileCategoriesOpen(true);
                                    setExpandedMobileCategory(selectedCategory);
                                } else if (activeStoreCategory) {
                                    setIsMobileCategoriesOpen(true);
                                    setExpandedMobileCategory(
                                        activeStoreCategory.name,
                                    );
                                }
                            }
                        }}
                        aria-label="Meny"
                        className="text-foreground hover:text-muted-foreground"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" strokeWidth={1.6} />
                        ) : (
                            <Menu className="h-5 w-5" strokeWidth={1.6} />
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen ? (
                <div className="fixed inset-x-0 bottom-0 top-16 z-40 md:hidden">
                    <button
                        type="button"
                        aria-label="Stäng meny"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    <nav className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface px-6 py-6 shadow-lg overflow-y-auto">
                        <div className="flex flex-col text-sm">
                            <div className="border-b border-border">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
                                    }
                                    className="flex w-full items-center justify-between py-4"
                                >
                                    Kategorier

                                    {isMobileCategoriesOpen ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>

                                {isMobileCategoriesOpen ? (
                                    < div className="border-t border-border">
                                        {storeCategories.map(({ name, slugs, icon: Icon }, index) => {
                                            const isExpanded =
                                                expandedMobileCategory === name;

                                            const isLastCategory =
                                                index === storeCategories.length - 1;

                                            const isSelectedCategory =
                                                selectedCategory === name && !selectedSubcategory;

                                            return (
                                                <div
                                                    key={name}
                                                    className={
                                                        isLastCategory
                                                            ? ""
                                                            : "border-b border-border"
                                                    }
                                                >
                                                    <div className="flex items-center py-4">
                                                        <Link
                                                            href={`/products?category=${encodeURIComponent(name)}`}
                                                            onClick={() => {
                                                                setExpandedMobileCategory(name);
                                                                setIsMobileCategoriesOpen(true);
                                                                setIsMobileMenuOpen(false);
                                                            }}
                                                            className={`flex flex-1 items-center gap-3 rounded-md px-2 py-2 ${isSelectedCategory
                                                                ? "bg-muted font-medium text-foreground"
                                                                : "hover:text-muted-foreground"
                                                                }`}
                                                        >
                                                            <Icon
                                                                className="h-5 w-5 text-muted-foreground"
                                                                strokeWidth={1.5}
                                                            />

                                                            {name}
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setExpandedMobileCategory(
                                                                    isExpanded ? null : name,
                                                                )
                                                            }
                                                            aria-label={
                                                                isExpanded
                                                                    ? `Dölj ${name}`
                                                                    : `Visa ${name}`
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronDown className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronRight className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                    </div>

                                                    {isExpanded ? (
                                                        <div className="pb-3">
                                                            {slugs.map((slug) => {
                                                                const category = categories.find(
                                                                    (category) =>
                                                                        category.slug === slug,
                                                                );

                                                                const isSelectedSubcategory =
                                                                    selectedSubcategory === slug;

                                                                return (
                                                                    <Link
                                                                        key={slug}
                                                                        href={`/products?category=${encodeURIComponent(name)}&subcategory=${encodeURIComponent(slug)}`}
                                                                        onClick={() => {
                                                                            setExpandedMobileCategory(name);
                                                                            setIsMobileCategoriesOpen(true);
                                                                            setIsMobileMenuOpen(false);
                                                                        }}
                                                                        className={`block rounded-md py-2 pl-8 transition-colors ${isSelectedSubcategory
                                                                            ? "bg-muted font-medium text-foreground"
                                                                            : "text-muted-foreground hover:text-foreground"
                                                                            }`}
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
                                ) : null}
                            </div>

                            <a
                                href="#"
                                className="py-4 hover:text-muted-foreground"
                            >
                                Nyheter
                            </a>

                            <a
                                href="#"
                                className="py-4 hover:text-muted-foreground"
                            >
                                Erbjudanden
                            </a>
                        </div>
                    </nav>
                </div>
            ) : null}

        </header>
    );
}