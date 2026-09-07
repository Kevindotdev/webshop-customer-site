"use client";

import type { Category } from "@/app/types";
import { CategoryFilter } from "@/components/category-filter";
import { useCategorySidebar } from "./category-sidebar-provider";

interface CategorySidebarProps {
    categories: Category[];
}

export function CategorySidebar({
    categories,
}: CategorySidebarProps) {
    const { isCategorySidebarOpen } = useCategorySidebar();

    if (!isCategorySidebarOpen) {
        return null;
    }

    return (
        <aside className="absolute right-full top-6 mr-8 w-[220px]">
            <CategoryFilter categories={categories} />
        </aside>
    );
}