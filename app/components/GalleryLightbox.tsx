"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
}

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, showPrev, showNext]);

  return (
    <>
      <div className="photo-grid">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className="photo-grid-item"
            onClick={() => setActiveIndex(i)}
          >
            <Image src={image.src} alt={image.alt} width={500} height={500} />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setActiveIndex(null)}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            width={1400}
            height={1400}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
            priority
          />

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>

          <p className="lightbox-counter">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
