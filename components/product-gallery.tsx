"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export function ProductGallery({
    images,
    title,
}: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div>
            <div className="relative aspect-square rounded-lg">
                <Image
                    src={selectedImage}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-8"
                />
            </div>

            {images.length > 1 ? (
                <div className="mt-4 flex gap-3 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setSelectedImage(image)}
                            className={`relative h-20 w-20 shrink-0 rounded-md border p-2 transition-colors ${selectedImage === image
                                ? "border-foreground"
                                : "border-border hover:border-muted-foreground"
                                }`}
                            aria-label={`Visa bild ${index + 1} av ${title}`}
                        >
                            <Image
                                src={image}
                                alt=""
                                fill
                                sizes="80px"
                                className="object-contain"
                            />
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}