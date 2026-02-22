import type { Metadata } from "next";
import { getAllPhotos } from "@/lib/photos";
import PhotoMap from "./PhotoMap";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Photos — Julian",
  description: "A map of geotagged photos from my travels.",
};

export default function PhotosPage() {
  const photos = getAllPhotos();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Photos</h1>
        <p className={styles.subtitle}>
          Places I&rsquo;ve been, through the lens.
        </p>
      </div>
      <div className={styles.mapWrap}>
        <PhotoMap photos={photos} />
      </div>
      <a href="/" className={styles.back}>
        &larr; Home
      </a>
    </div>
  );
}
