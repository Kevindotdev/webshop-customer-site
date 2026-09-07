"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface CategorySidebarContextValue {
    isCategorySidebarOpen: boolean;
    setIsCategorySidebarOpen: (isOpen: boolean) => void;
}

const CategorySidebarContext = createContext<
    CategorySidebarContextValue | undefined
>(undefined);

export function CategorySidebarProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isCategorySidebarOpen, setIsCategorySidebarOpen] =
        useState(false);

    return (
        <CategorySidebarContext.Provider
            value={{
                isCategorySidebarOpen,
                setIsCategorySidebarOpen,
            }}
        >
            {children}
        </CategorySidebarContext.Provider>
    );
}

export function useCategorySidebar() {
    const context = useContext(CategorySidebarContext);

    if (!context) {
        throw new Error(
            "useCategorySidebar must be used within CategorySidebarProvider",
        );
    }

    return context;
}