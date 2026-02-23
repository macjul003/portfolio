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
      <a href="/" className={styles.back}>
        &larr; Home
      </a>
      <PhotoMap photos={photos} />
    </div>
  );
}
