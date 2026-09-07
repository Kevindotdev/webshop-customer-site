import {
    CreditCard,
    Headphones,
    RotateCcw,
    Truck,
} from "lucide-react";

const benefits = [
    {
        icon: Truck,
        title: "Fri frakt över 500 kr",
        description: "Snabb leverans 1–3 dagar",
    },
    {
        icon: RotateCcw,
        title: "30 dagars öppet köp",
        description: "Handla tryggt hos oss",
    },
    {
        icon: CreditCard,
        title: "Säker betalning",
        description: "Flera betalningsalternativ",
    },
    {
        icon: Headphones,
        title: "Kundtjänst",
        description: "Vi finns här för dig",
    },
];

export function ServiceBenefits() {
    return (
        <section className="mt-12 border-y border-border py-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="flex items-center gap-3"
                    >
                        <Icon
                            className="h-6 w-6 shrink-0 text-accent"
                            strokeWidth={1.5}
                        />

                        <div>
                            <h2 className="text-sm font-medium">
                                {title}
                            </h2>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}