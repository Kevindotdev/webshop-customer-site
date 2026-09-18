"use client";

import type { Category } from "@/app/types";
import { CategoryFilter } from "@/components/category-filter";
import { useCategorySidebar } from "./category-sidebar-provider";

interface CategorySidebarProps {
    categories: Category[];
    activeCategorySlug?: string;
}

export function CategorySidebar({
    categories,
    activeCategorySlug,
}: CategorySidebarProps) {
    const { isCategorySidebarOpen } = useCategorySidebar();

    if (!isCategorySidebarOpen) {
        return null;
    }

    return (
        <aside className="mt-6 mb-6 hidden px-6 md:block min-[1775px]:absolute min-[1775px]:right-full min-[1775px]:top-6 min-[1775px]:mt-0 min-[1775px]:mb-0 min-[1775px]:mr-8 min-[1775px]:w-55 min-[1775px]:px-0">
            <CategoryFilter
                categories={categories}
                activeCategorySlug={activeCategorySlug}
            />
        </aside>
    );
}