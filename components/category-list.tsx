import { storeCategories } from "@/lib/store-categories";

export function CategoryList() {
    return (
        <section className="mt-10">
            <h2 className="text-lg font-semibold">
                Populära kategorier
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {storeCategories.slice(0, 5).map(({ name, icon: Icon }) => (
                    <a
                        key={name}
                        href="#"
                        className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-7 transition-colors hover:border-gray-300"
                    >
                        <Icon
                            className="h-8 w-8 text-gray-500 transition-colors group-hover:text-gray-700"
                            strokeWidth={1.5}
                        />

                        <span className="mt-3 max-w-28 text-center text-sm font-medium leading-5">
                            {name}
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
}