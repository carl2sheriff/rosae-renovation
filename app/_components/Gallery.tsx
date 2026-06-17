"use client";

import { useState, useEffect, useCallback } from "react";

interface GalleryProps {
  images: string[];
  altBase: string;
}

export function Gallery({ images, altBase }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group block overflow-hidden"
            aria-label={`Agrandir la photo ${i + 1}`}
            style={{ background: "none", border: "none", padding: 0, cursor: "zoom-in" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${altBase} — vue ${i + 1}`}
              loading="lazy"
              className="img-scale w-full object-cover"
              style={{
                height: i % 3 === 1 ? "clamp(200px, 32vh, 380px)" : "clamp(180px, 26vh, 320px)",
              }}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(18, 17, 15, 0.95)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse photo"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightboxIndex]}
            alt={`${altBase} — vue ${lightboxIndex + 1}`}
            className="max-h-[88vh] max-w-[88vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute top-5 right-5 transition-opacity hover:opacity-100"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "28px",
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Photo précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "36px",
                  lineHeight: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 12px",
                }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Photo suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "36px",
                  lineHeight: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 12px",
                }}
              >
                ›
              </button>
            </>
          )}

          <p
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.45)", pointerEvents: "none" }}
          >
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
