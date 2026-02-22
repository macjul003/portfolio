"use client";

import { useEffect, useCallback } from "react";
import type { Photo } from "@/lib/photos";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
}

export default function Lightbox({ photo, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

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
        <button className={styles.close} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <img
          className={styles.image}
          src={photo.src}
          alt={photo.caption}
          loading="eager"
        />
        <div className={styles.meta}>
          <p className={styles.caption}>{photo.caption}</p>
          {(formattedDate || photo.camera) && (
            <p className={styles.details}>
              {formattedDate}
              {formattedDate && photo.camera && " · "}
              {photo.camera}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
