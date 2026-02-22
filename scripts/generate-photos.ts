import fs from "fs";
import path from "path";
import ExifReader from "exifreader";
import sharp from "sharp";

const ROOT = process.cwd();
const ORIGINALS_DIR = path.join(ROOT, "public/photos/originals");
const THUMBS_DIR = path.join(ROOT, "public/photos/thumbs");
const OUTPUT_JSON = path.join(ROOT, "public/photo-data.json");
const THUMB_WIDTH = 400;

interface PhotoData {
  id: string;
  src: string;
  thumb: string;
  lat: number;
  lng: number;
  caption: string;
  date: string;
  camera: string;
}

function parseGps(tags: ExifReader.Tags): { lat: number; lng: number } | null {
  const lat = tags["GPSLatitude"];
  const lng = tags["GPSLongitude"];
  if (!lat || !lng) return null;

  const latVal = lat.description;
  const lngVal = lng.description;
  if (latVal === undefined || lngVal === undefined) return null;

  return { lat: parseFloat(String(latVal)), lng: parseFloat(String(lngVal)) };
}

function parseDate(tags: ExifReader.Tags): string {
  const dateTag =
    tags["DateTimeOriginal"] || tags["DateTime"] || tags["CreateDate"];
  if (!dateTag?.description) return "";
  // EXIF dates are "YYYY:MM:DD HH:MM:SS" — convert to ISO-ish
  return dateTag.description.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
}

function parseCamera(tags: ExifReader.Tags): string {
  const make = tags["Make"]?.description?.trim() ?? "";
  const model = tags["Model"]?.description?.trim() ?? "";
  if (!make && !model) return "";
  // Avoid "Apple Apple iPhone 15" duplication
  if (model.startsWith(make)) return model;
  return `${make} ${model}`.trim();
}

async function main() {
  if (!fs.existsSync(ORIGINALS_DIR)) {
    console.log(`No originals directory at ${ORIGINALS_DIR} — skipping.`);
    fs.writeFileSync(OUTPUT_JSON, "[]");
    return;
  }

  fs.mkdirSync(THUMBS_DIR, { recursive: true });

  const files = fs
    .readdirSync(ORIGINALS_DIR)
    .filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));

  if (files.length === 0) {
    console.log("No image files found in originals/.");
    fs.writeFileSync(OUTPUT_JSON, "[]");
    return;
  }

  const photos: PhotoData[] = [];

  for (const file of files) {
    const filePath = path.join(ORIGINALS_DIR, file);
    console.log(`Processing ${file}...`);

    try {
      const buffer = fs.readFileSync(filePath);
      const tags = ExifReader.load(buffer, { expanded: false });
      const gps = parseGps(tags);

      if (!gps) {
        console.log(`  Skipping ${file} — no GPS data.`);
        continue;
      }

      const id = path.parse(file).name;
      const thumbName = `${id}.jpg`;
      const thumbPath = path.join(THUMBS_DIR, thumbName);

      await sharp(filePath)
        .resize({ width: THUMB_WIDTH })
        .jpeg({ quality: 80 })
        .toFile(thumbPath);

      photos.push({
        id,
        src: `/photos/originals/${file}`,
        thumb: `/photos/thumbs/${thumbName}`,
        lat: gps.lat,
        lng: gps.lng,
        caption: id.replace(/[-_]/g, " "),
        date: parseDate(tags),
        camera: parseCamera(tags),
      });

      console.log(`  OK — ${gps.lat.toFixed(4)}, ${gps.lng.toFixed(4)}`);
    } catch (err) {
      console.error(`  Error processing ${file}:`, err);
    }
  }

  photos.sort((a, b) => (a.date > b.date ? -1 : 1));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(photos, null, 2));
  console.log(`\nWrote ${photos.length} photos to photo-data.json`);
}

main();
