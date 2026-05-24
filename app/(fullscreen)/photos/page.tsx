import type { Metadata } from "next";
import Link from "next/link";
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
      <Link href="/" className={styles.back}>
        <i className="ph-bold ph-arrow-left" />
        Back
      </Link>
      <PhotoMap photos={photos} />
    </div>
  );
}
