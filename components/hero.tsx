export function Hero() {
    return (
        <section className="rounded-xl bg-muted p-8 md:p-10">
            <div className="grid min-h-64 items-center gap-8 md:grid-cols-2">
                <div>
                    <h1 className="max-w-md text-4xl font-bold tracking-tight">
                        Upptäck produkter
                        <br />
                        du kommer älska
                    </h1>

                    <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                        Kvalitetsprodukter till rätt pris.
                        <br />
                        Snabb leverans och trygg e-handel.
                    </p>

                    <a
                        href="#products"
                        className="mt-6 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
                    >
                        Se alla produkter
                    </a>
                </div>

                <div className="flex h-48 items-center justify-center rounded-lg bg-muted md:h-52">
                    <svg
                        className="h-12 w-12 text-muted-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                    </svg>
                </div>
            </div>
        </section>
    );
}