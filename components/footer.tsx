import {
    CreditCard,
    Mail,
    ShieldCheck,
    Truck,
} from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-auto border-t border-border bg-footer">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-bold">
                            WEBSHOP
                        </h2>

                        <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                            Upptäck produkter till bra priser och handla
                            enkelt och tryggt online.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">
                            Kundservice
                        </h3>

                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Kontakta oss
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Frakt och leverans
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Returer
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Vanliga frågor
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">
                            Om Webshop
                        </h3>

                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Om oss
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Nyheter
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Erbjudanden
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Integritetspolicy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">
                            Handla tryggt
                        </h3>

                        <div className="mt-4 flex flex-col items-center space-y-3">
                            <div className="flex items-center gap-3">
                                <Truck className="h-4 w-4 text-muted-foreground" />

                                <span className="text-sm text-muted-foreground">
                                    Snabb leverans
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-4 w-4 text-muted-foreground" />

                                <span className="text-sm text-muted-foreground">
                                    Trygg handel
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CreditCard className="h-4 w-4 text-muted-foreground" />

                                <span className="text-sm text-muted-foreground">
                                    Säker betalning
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Webshop. Alla rättigheter
                        förbehållna.
                    </p>

                    <a
                        href="mailto:info@webshop.se"
                        className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Mail className="h-4 w-4" />

                        <span>info@webshopinteriktig.se</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}