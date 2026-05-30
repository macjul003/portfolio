import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "public/photo-data.json");

export interface Photo {
  id: string;
  src: string;
  thumb: string;
  lat: number;
  lng: number;
  caption: string;
  date: string;
  camera: string;
  group: number;
}

export function getAllPhotos(): Photo[] {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}
