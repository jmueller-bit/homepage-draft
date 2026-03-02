import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFavicon() {
  const inputPath = path.join(__dirname, '..', 'public', 'alz-logo.png');
  const outputPath = path.join(__dirname, '..', 'public', 'favicon.ico');
  
  const sizes = [16, 32, 48];
  const buffers = [];
  
  for (const size of sizes) {
    const buffer = await sharp(inputPath)
      .resize(size, size, { fit: 'inside' })
      .png()
      .toBuffer();
    buffers.push({ size, buffer });
  }
  
  // ICO Header
  const header = Buffer.concat([
    Buffer.from([0x00, 0x00]), // Reserved
    Buffer.from([0x01, 0x00]), // ICO type
    Buffer.from([buffers.length, 0x00]), // Number of images
  ]);
  
  // Calculate offsets
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + (buffers.length * entrySize);
  
  // Directory entries
  let currentOffset = dataOffset;
  const entries = [];
  
  for (const { size, buffer } of buffers) {
    const entry = Buffer.concat([
      Buffer.from([size]), // Width
      Buffer.from([size]), // Height
      Buffer.from([0x00]), // Color palette
      Buffer.from([0x00]), // Reserved
      Buffer.from([0x01, 0x00]), // Color planes
      Buffer.from([0x20, 0x00]), // Bits per pixel
      Buffer.from([
        buffer.length & 0xFF,
        (buffer.length >> 8) & 0xFF,
        (buffer.length >> 16) & 0xFF,
        (buffer.length >> 24) & 0xFF
      ]), // Size
      Buffer.from([
        currentOffset & 0xFF,
        (currentOffset >> 8) & 0xFF,
        (currentOffset >> 16) & 0xFF,
        (currentOffset >> 24) & 0xFF
      ]), // Offset
    ]);
    entries.push(entry);
    currentOffset += buffer.length;
  }
  
  // Combine all parts
  const icoBuffer = Buffer.concat([
    header,
    ...entries,
    ...buffers.map(b => b.buffer)
  ]);
  
  fs.writeFileSync(outputPath, icoBuffer);
  console.log('✅ Favicon created successfully at:', outputPath);
  console.log('📁 Sizes included:', sizes.join(', ') + 'px');
}

createFavicon().catch(console.error);
