"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


interface ProductGalleryProps {
    images: string[];
    title: string;
}

export function ProductGallery({
    images,
    title,
}: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(
        null,
    );
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const pointerStartX = useRef<number | null>(null);
    const pointerStartY = useRef<number | null>(null);
    const hasDragged = useRef(false);

    const selectedImage = images[selectedIndex];

    const displayedImage =
        hoveredIndex !== null
            ? images[hoveredIndex]
            : selectedImage;

    function showPreviousImage() {
        setSelectedIndex((currentIndex) =>
            currentIndex === 0
                ? images.length - 1
                : currentIndex - 1,
        );
    }

    function showNextImage() {
        setSelectedIndex((currentIndex) =>
            currentIndex === images.length - 1
                ? 0
                : currentIndex + 1,
        );
    }

    function handlePointerDown(
        event: React.PointerEvent<HTMLButtonElement>,
    ) {
        if (event.button !== 0) {
            return;
        }

        pointerStartX.current = event.clientX;
        pointerStartY.current = event.clientY;
        hasDragged.current = false;

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerUp(
        event: React.PointerEvent<HTMLButtonElement>,
    ) {
        if (
            pointerStartX.current === null ||
            pointerStartY.current === null
        ) {
            return;
        }

        const distanceX =
            event.clientX - pointerStartX.current;

        const distanceY =
            event.clientY - pointerStartY.current;

        pointerStartX.current = null;
        pointerStartY.current = null;

        if (
            Math.abs(distanceX) < 50 ||
            Math.abs(distanceX) < Math.abs(distanceY)
        ) {
            return;
        }

        hasDragged.current = true;

        if (distanceX > 0) {
            showPreviousImage();
        } else {
            showNextImage();
        }
    }

    return (
        <div>
            <div className="relative aspect-square rounded-lg">
                <button
                    type="button"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onClick={() => {
                        if (hasDragged.current) {
                            hasDragged.current = false;

                            return;
                        }

                        setIsLightboxOpen(true);
                    }}
                    onDragStart={(event) => event.preventDefault()}
                    className="absolute inset-0 cursor-zoom-in select-none"
                    aria-label={`Förstora bild av ${title}`}
                >
                    <Image
                        src={displayedImage}
                        alt={title}
                        fill
                        preload
                        draggable={false}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-8"
                    />
                </button>

                {images.length > 1 ? (
                    <>
                        <button
                            type="button"
                            onPointerDown={(event) => event.stopPropagation()}
                            onPointerUp={(event) => event.stopPropagation()}
                            onClick={showPreviousImage}
                            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground transition-colors hover:bg-surface cursor-pointer"
                            aria-label="Visa föregående bild"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onPointerDown={(event) => event.stopPropagation()}
                            onPointerUp={(event) => event.stopPropagation()}
                            onClick={showNextImage}
                            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground transition-colors hover:bg-surface cursor-pointer"
                            aria-label="Visa nästa bild"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                ) : null}
            </div>

            {images.length > 1 ? (
                <div className="mt-1 flex gap-3 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            onMouseEnter={() =>
                                setHoveredIndex(index)
                            }
                            onMouseLeave={() =>
                                setHoveredIndex(null)
                            }
                            className={`relative h-20 w-20 shrink-0 rounded-md border p-2 transition-colors ${selectedIndex === index
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

            <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                index={selectedIndex}
                slides={images.map((image) => ({
                    src: image,
                }))}
                plugins={[Thumbnails, Zoom]}
                zoom={{
                    maxZoomPixelRatio: 2,
                    scrollToZoom: true,
                    wheelZoomDistanceFactor: 1000,
                }}
                on={{
                    view: ({ index }) => setSelectedIndex(index),
                }}
            />
        </div>
    );
}