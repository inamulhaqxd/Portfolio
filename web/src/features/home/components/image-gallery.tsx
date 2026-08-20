"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
      setIsTransitioning(false);
    }, 150);
  }, [images.length, isTransitioning]);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
      setIsTransitioning(false);
    }, 150);
  }, [images.length, isTransitioning]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      if (distance > 0) next();
      else prev();
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-window">
      <div
        className="flex transition-all duration-500 ease-in-out"
        style={{ 
          transform: `translateX(-${current * 100}%)`,
          opacity: isTransitioning ? 0.5 : 1
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full">
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="h-auto w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-ink/80 hover:scale-110 sm:left-4 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-ink/80 hover:scale-110 sm:right-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
                  i === current ? "bg-accent scale-125" : "bg-foreground/40 hover:bg-foreground/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
