import type { Product } from "@/app/types";

interface ProductSpecificationsProps {
    product: Product;
}

export function ProductSpecifications({
    product,
}: ProductSpecificationsProps) {
    const hasMeasurements =
        product.dimensions || product.weight !== undefined;

    const hasAdditionalInformation =
        product.warrantyInformation || product.returnPolicy;

    if (!hasMeasurements && !hasAdditionalInformation) {
        return null;
    }

    return (
        <section>
            <h2 className="text-xl font-semibold">
                Specifikationer
            </h2>

            {hasMeasurements ? (
                <div className="mt-6">
                    <h3>
                        Mått och vikt
                    </h3>

                    <dl className="mt-3 divide-y divide-border">
                        {product.dimensions ? (
                            <>
                                <div className="grid grid-cols-2 gap-4 py-3">
                                    <dt className="text-muted-foreground">
                                        Bredd:
                                    </dt>

                                    <dd>
                                        {product.dimensions.width} cm
                                    </dd>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-3">
                                    <dt className="text-muted-foreground">
                                        Höjd:
                                    </dt>

                                    <dd>
                                        {product.dimensions.height} cm
                                    </dd>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-3">
                                    <dt className="text-muted-foreground">
                                        Djup:
                                    </dt>

                                    <dd>
                                        {product.dimensions.depth} cm
                                    </dd>
                                </div>
                            </>
                        ) : null}

                        {product.weight !== undefined ? (
                            <div className="grid grid-cols-2 gap-4 py-3">
                                <dt className="text-muted-foreground">
                                    Vikt:
                                </dt>

                                <dd>
                                    {product.weight} kg
                                </dd>
                            </div>
                        ) : null}
                    </dl>
                </div>
            ) : null}

            {hasMeasurements && hasAdditionalInformation ? (
                <div className="my-10" />
            ) : null}

            {hasAdditionalInformation ? (
                <div className="mt-10">
                    <h3>
                        Garanti och retur
                    </h3>

                    <dl className="divide-y divide-border">
                        {product.warrantyInformation ? (
                            <div className="grid grid-cols-2 gap-4 py-3">
                                <dt className="text-muted-foreground">
                                    Garanti:
                                </dt>

                                <dd>
                                    {product.warrantyInformation}
                                </dd>
                            </div>
                        ) : null}

                        {product.returnPolicy ? (
                            <div className="grid grid-cols-2 gap-4 py-3">
                                <dt className="text-muted-foreground">
                                    Returpolicy:
                                </dt>

                                <dd>
                                    {product.returnPolicy}
                                </dd>
                            </div>
                        ) : null}
                    </dl>
                </div>
            ) : null}
        </section>
    );
}