import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
const tasks = [
  ["imagenes/carousel/slide1.png", "hotel-hero", 1536, 1024],
  ["imagenes/carousel/slide2.png", "tourism-hero", 1376, 768],
  ["imagenes/carousel/slide3.jpg", "company-hero", 1600, 1067],
  ["imagenes/carousel/slide1.png", "hoteleria-card", 720, 520],
  ["imagenes/carousel/slide2.png", "turismo-card", 720, 520],
  ["imagenes/restaurante-generado.png", "restaurantes-card", 720, 520],
  ["legacy/angular/src/assets/images/teacher.jpg", "learning", 720, 820],
  ["imagenes/carousel/slide1.png", "social-cover", 1200, 630],
  ["legacy/angular/src/assets/news/1.webp", "article-english", 1000, 600],
  [
    "legacy/angular/src/assets/news/ingles-oportunidades.jpg",
    "article-learning",
    1000,
    600,
  ],
];
await Promise.all(
  tasks.map(async ([source, name, width, height]) => {
    await sharp(source)
      .rotate()
      .resize(width, height, {
        fit: "cover",
        position: "attention",
        withoutEnlargement: true,
      })
      .webp({ quality: 83, effort: 5 })
      .toFile(`public/images/${name}.webp`);
    console.log(`${name}.webp`);
  }),
);
