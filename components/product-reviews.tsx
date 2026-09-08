import type { Product } from "@/app/types";
import { RatingStars } from "./rating-stars";

interface ProductReviewsProps {
    reviews: Product["reviews"];
}

export function ProductReviews({
    reviews,
}: ProductReviewsProps) {
    const reviewCount = reviews?.length ?? 0;

    return (
        <section id="reviews">
            <h2 className="text-xl font-semibold">
                Recensioner ({reviewCount})
            </h2>

            {reviewCount === 0 ? (
                <p className="mt-6 text-muted-foreground">
                    Inga recensioner ännu.
                </p>
            ) : (
                <div className="mt-6 space-y-6">
                    {reviews?.map((review, index) => (
                        <article
                            key={`${review.reviewerEmail}-${index}`}
                            className="border-b border-border pb-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-medium">
                                        {review.reviewerName}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {new Date(
                                            review.date,
                                        ).toLocaleDateString(
                                            "sv-SE",
                                        )}
                                    </p>
                                </div>

                                <RatingStars
                                    rating={review.rating}
                                />
                            </div>

                            <p className="mt-4 text-muted-foreground">
                                {review.comment}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}