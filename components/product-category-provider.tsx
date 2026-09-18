"use client";

import { useEffect } from "react";
import { useCategorySidebar } from "./category-sidebar-provider";

interface ProductCategoryProviderProps {
    activeCategorySlug?: string;
}

export function ProductCategoryProvider({
    activeCategorySlug,
}: ProductCategoryProviderProps) {
    const { setActiveCategorySlug } = useCategorySidebar();

    useEffect(() => {
        setActiveCategorySlug(activeCategorySlug);

        return () => {
            setActiveCategorySlug(undefined);
        };
    }, [
        activeCategorySlug,
        setActiveCategorySlug,
    ]);

    return null;
}