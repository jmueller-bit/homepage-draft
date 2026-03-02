const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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
  
  // Create ICO file
  const icoBuffer = Buffer.concat([
    // ICO Header
    Buffer.from([0x00, 0x00]), // Reserved
    Buffer.from([0x01, 0x00]), // ICO type
    Buffer.from([buffers.length, 0x00]), // Number of images
    
    // Directory entries
    ...buffers.map(({ size, buffer }, index) => {
      const offset = 6 + (buffers.length * 16);
      const prevSizes = buffers.slice(0, index).reduce((sum, b) => sum + b.buffer.length, 0);
      return Buffer.concat([
        Buffer.from([size]), // Width
        Buffer.from([size]), // Height
        Buffer.from([0x00]), // Color palette
        Buffer.from([0x00]), // Reserved
        Buffer.from([0x01, 0x00]), // Color planes
        Buffer.from([0x20, 0x00]), // Bits per pixel
        Buffer.from(buffer.length & 0xFF, (buffer.length >> 8) & 0xFF, (buffer.length >> 16) & 0xFF, (buffer.length >> 24) & 0xFF), // Size
        Buffer.from((offset + prevSizes) & 0xFF, ((offset + prevSizes) >> 8) & 0xFF, ((offset + prevSizes) >> 16) & 0xFF, ((offset + prevSizes) >> 24) & 0xFF), // Offset
      ]);
    }),
    
    // Image data
    ...buffers.map(({ buffer }) => buffer)
  ]);
  
  fs.writeFileSync(outputPath, icoBuffer);
  console.log('Favicon created successfully at:', outputPath);
}

createFavicon().catch(console.error);
