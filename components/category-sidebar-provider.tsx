"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface CategorySidebarContextValue {
    isCategorySidebarOpen: boolean;
    setIsCategorySidebarOpen: (isOpen: boolean) => void;
}

const CategorySidebarContext = createContext<
    CategorySidebarContextValue | undefined
>(undefined);

function isProductsPath(pathname: string) {
    return (
        pathname === "/products" ||
        pathname.startsWith("/products/")
    );
}

export function CategorySidebarProvider({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();

    const [isCategorySidebarOpen, setIsCategorySidebarOpen] =
        useState(() => isProductsPath(pathname));

    const previousPathname = useRef(pathname);

    useEffect(() => {
        const wasOnProductsPath = isProductsPath(
            previousPathname.current,
        );

        const isOnProductsPath = isProductsPath(pathname);

        const enteredProductsPath =
            !wasOnProductsPath && isOnProductsPath;

        if (enteredProductsPath) {
            queueMicrotask(() => {
                setIsCategorySidebarOpen(true);
            });
        }

        previousPathname.current = pathname;
    }, [pathname]);

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