"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Video } from "../data/content";

export default function VideoLightbox({ videos }: { videos: Video[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + videos.length) % videos.length));
  }, [videos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % videos.length));
  }, [videos.length]);

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
      <div className="video-grid">
        {videos.map((video, i) => (
          <button
            key={video.id}
            type="button"
            className="video-grid-item"
            onClick={() => setActiveIndex(i)}
          >
            <div className="video-thumb-wrap">
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                width={480}
                height={360}
                className="video-thumb"
              />
              <span className="video-play-badge" aria-hidden="true">
                ▶
              </span>
            </div>
            <p className="video-title">{video.title}</p>
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
            aria-label="Previous video"
          >
            ‹
          </button>

          <div className="lightbox-video-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${videos[activeIndex].id}?autoplay=1`}
              title={videos[activeIndex].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next video"
          >
            ›
          </button>

          <p className="lightbox-counter">
            {activeIndex + 1} / {videos.length}
          </p>
        </div>
      )}
    </>
  );
}
