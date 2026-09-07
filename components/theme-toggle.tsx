"use client";

import { Moon, Sun } from "lucide-react";
import { useHydrated, useTheme } from "@teispace/next-themes";

export function ThemeToggle() {
    const hydrated = useHydrated();
    const { resolvedTheme, setTheme } = useTheme();

    if (!hydrated) {
        return (
            <button
                type="button"
                aria-label="Byt tema"
                className="text-foreground hover:text-muted-foreground"
            >
                <Moon className="h-5 w-5" strokeWidth={1.6} />
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Byt till ljust tema" : "Byt till mörkt tema"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="text-foreground hover:text-muted-foreground cursor-pointer"
        >
            {isDark ? (
                <Sun className="h-5 w-5" strokeWidth={1.6} />
            ) : (
                <Moon className="h-5 w-5" strokeWidth={1.6} />
            )}
        </button>
    );
}