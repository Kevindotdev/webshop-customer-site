"use client";

import Link from "next/link";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    Search,
    ShoppingCart,
    User,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useCategorySidebar } from "./category-sidebar-provider";

export function Header() {
    const {
        isCategorySidebarOpen,
        setIsCategorySidebarOpen,
    } = useCategorySidebar();

    return (
        <header className="border-b border-border bg-surface">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                <Link
                    href="/"
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
                        aria-label="Meny"
                        className="text-foreground hover:text-muted-foreground"
                    >
                        <Menu className="h-5 w-5" strokeWidth={1.6} />
                    </button>
                </div>
            </div>
        </header>
    );
}