import Link from "next/link";
import { storeCategories } from "@/lib/store-categories";

export function CategoryFilter() {
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
                    {storeCategories.map(({ name }) => (
                        <Link
                            key={name}
                            href={`/products?category=${encodeURIComponent(name)}`}
                            className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
}