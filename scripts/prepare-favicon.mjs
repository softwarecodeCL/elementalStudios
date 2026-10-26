import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const symbol = 'legacy/angular/src/assets/brand/logofull.png';
async function icon(size) {
  const inset = Math.max(2, Math.round(size * 0.08));
  const logo = await sharp(symbol).resize(size - inset * 2, size - inset * 2).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#f5f7fa' } })
    .composite([{ input: logo, left: inset, top: inset }]).png().toBuffer();
}
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(icon));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index]; header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await Promise.all([
  writeFile('public/favicon-elemental.png', frames[1]),
  writeFile('public/favicon.ico', Buffer.concat([header, ...frames])),
  icon(180).then(image => writeFile('public/apple-touch-icon.png', image)),
]);
console.log('Elemental Studios: favicon PNG, ICO and Apple touch icon generated.');
