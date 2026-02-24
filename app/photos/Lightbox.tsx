"use client";

import { useEffect, useCallback, useState } from "react";
import type { Photo } from "@/lib/photos";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  photos,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const photo = photos[index];
  const total = photos.length;
  const isAlbum = total > 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Preload adjacent images
  useEffect(() => {
    const toPreload: string[] = [];
    if (index > 0) toPreload.push(photos[index - 1].src);
    if (index < total - 1) toPreload.push(photos[index + 1].src);
    toPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [index, photos, total]);

  const formattedDate = photo.date
    ? new Date(photo.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageWrap}>
          {isAlbum && index > 0 && (
            <button
              className={styles.navPrev}
              onClick={goPrev}
              aria-label="Previous photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <img
            className={styles.image}
            src={photo.src}
            alt={photo.caption}
            loading="eager"
            style={{ imageOrientation: "from-image" }}
          />

          {isAlbum && index < total - 1 && (
            <button
              className={styles.navNext}
              onClick={goNext}
              aria-label="Next photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.meta}>
          <p className={styles.caption}>{photo.caption}</p>
          {(formattedDate || photo.camera) && (
            <p className={styles.details}>
              {formattedDate}
              {formattedDate && photo.camera && " · "}
              {photo.camera}
            </p>
          )}
          {isAlbum && (
            <p className={styles.counter}>
              {index + 1} of {total}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
