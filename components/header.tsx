import {
    ChevronDown,
    Menu,
    Search,
    ShoppingCart,
    User,
} from "lucide-react";

export function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                <a
                    href="/"
                    className="shrink-0 text-lg font-bold tracking-tight"
                >
                    WEBSHOP
                </a>

                {/* Desktop navigation */}
                <nav className="ml-8 hidden items-center gap-7 text-sm md:flex">
                    <a
                        href="#"
                        className="flex items-center gap-1 hover:text-gray-600"
                    >
                        Kategorier
                        <ChevronDown className="h-3 w-3" />
                    </a>

                    <a href="#" className="hover:text-gray-600">
                        Nyheter
                    </a>

                    <a href="#" className="hover:text-gray-600">
                        Erbjudanden
                    </a>
                </nav>

                {/* Desktop actions */}
                <div className="ml-auto hidden items-center gap-5 md:flex">
                    <div className="flex h-9 w-40 items-center rounded-md border border-gray-200 px-3">
                        <input
                            type="text"
                            placeholder="Sök produkter..."
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400"
                        />

                        <Search className="h-4 w-4 shrink-0 text-gray-600" />
                    </div>

                    <button
                        type="button"
                        aria-label="Konto"
                        className="text-gray-800 hover:text-gray-500"
                    >
                        <User className="h-5 w-5" strokeWidth={1.6} />
                    </button>

                    <button
                        type="button"
                        aria-label="Varukorg"
                        className="relative text-gray-800 hover:text-gray-500"
                    >
                        <ShoppingCart
                            className="h-5 w-5"
                            strokeWidth={1.6}
                        />

                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-medium text-white">
                            3
                        </span>
                    </button>
                </div>

                {/* Mobile actions */}
                <div className="ml-auto flex items-center gap-4 md:hidden">
                    <button
                        type="button"
                        aria-label="Sök"
                        className="text-gray-800 hover:text-gray-500"
                    >
                        <Search className="h-5 w-5" strokeWidth={1.6} />
                    </button>

                    <button
                        type="button"
                        aria-label="Varukorg"
                        className="relative text-gray-800 hover:text-gray-500"
                    >
                        <ShoppingCart
                            className="h-5 w-5"
                            strokeWidth={1.6}
                        />

                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-medium text-white">
                            3
                        </span>
                    </button>

                    <button
                        type="button"
                        aria-label="Meny"
                        className="text-gray-800 hover:text-gray-500"
                    >
                        <Menu className="h-5 w-5" strokeWidth={1.6} />
                    </button>
                </div>
            </div>
        </header>
    );
}