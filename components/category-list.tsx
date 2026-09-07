import { storeCategories } from "@/lib/store-categories";
import Link from "next/link";

export function CategoryList() {
    return (
        <section className="mt-10">
            <h2 className="text-lg font-semibold">
                Populära kategorier
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {/* Show only the first five categories on the homepage. */}
                {storeCategories.slice(0, 5).map(({ name, icon: Icon }) => (
                    <Link
                        key={name}
                        href={`/products?category=${encodeURIComponent(name)}`}
                        className="group flex flex-col items-center justify-center rounded-lg border border-border bg-surface py-7 transition-colors hover:border-foreground"
                    >
                        <Icon
                            className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-foreground"
                            strokeWidth={1.5}
                        />

                        <span className="mt-3 max-w-28 text-center text-sm font-medium leading-5">
                            {name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}