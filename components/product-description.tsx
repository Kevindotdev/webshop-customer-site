import type { Product } from "@/app/types";

interface ProductDescriptionProps {
    description: Product["description"];
}

export function ProductDescription({
    description,
}: ProductDescriptionProps) {
    return (
        <section>
            <h2 className="text-xl font-semibold">
                Produktbeskrivning
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
                {description}
            </p>
        </section>
    );
}