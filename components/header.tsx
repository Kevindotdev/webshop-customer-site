export function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
                <a href="/" className="shrink-0 text-lg font-bold tracking-tight">
                    WEBSHOP
                </a>

                <nav className="flex items-center gap-7 text-sm">
                    <a
                        href="#"
                        className="flex items-center gap-1 hover:text-gray-600"
                    >
                        Kategorier
                        <svg
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>

                    <a href="#" className="hover:text-gray-600">
                        Nyheter
                    </a>

                    <a href="#" className="hover:text-gray-600">
                        Erbjudanden
                    </a>
                </nav>

                <div className="ml-auto flex items-center gap-5">
                    <div className="flex h-9 w-40 items-center rounded-md border border-gray-200 px-3">
                        <input
                            type="text"
                            placeholder="Sök produkter..."
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400"
                        />

                        <svg
                            className="h-4 w-4 shrink-0 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>
                    </div>

                    <button
                        type="button"
                        aria-label="Konto"
                        className="text-gray-800 hover:text-gray-500"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                        >
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M5 20c.8-3.3 3.4-5 7-5s6.2 1.7 7 5" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        aria-label="Varukorg"
                        className="relative text-gray-800 hover:text-gray-500"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                        >
                            <path d="M3 4h2l2.2 11h10.9l2-8H6" />
                            <circle cx="9" cy="19" r="1.2" />
                            <circle cx="17" cy="19" r="1.2" />
                        </svg>

                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-medium text-white">
                            3
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}