import { Star } from "lucide-react";

interface RatingStarsProps {
    rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`Betyg ${rating.toFixed(1)} av 5`}>
            {Array.from({ length: 5 }, (_, index) => {
                const fillPercentage = Math.min(
                    Math.max((rating - index) * 100, 0),
                    100,
                );

                return (
                    <span key={index} className="relative h-3.5 w-3.5">
                        <Star
                            className="absolute h-3.5 w-3.5 text-muted-foreground"
                            strokeWidth={1.5}
                        />
                        <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fillPercentage}%` }}
                        >
                            <Star
                                className="h-3.5 w-3.5 text-accent"
                                fill="currentColor"
                                strokeWidth={1.5}
                            />
                        </span>
                    </span>
                );
            })}
        </div>
    );
}