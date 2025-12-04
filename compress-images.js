const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, 'public/compressed');

// Create compressed directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png'];
const files = fs.readdirSync(publicDir)
  .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));

console.log(`Found ${files.length} images to compress...\n`);

// Compress each image
Promise.all(files.map(async (file) => {
  const inputPath = path.join(publicDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  
  const stats = fs.statSync(inputPath);
  const originalSize = (stats.size / 1024).toFixed(2);
  
  try {
    await sharp(inputPath)
      .webp({ quality: 80 }) // Adjust quality (1-100, 80 is a good balance)
      .toFile(outputPath);
    
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = (compressedStats.size / 1024).toFixed(2);
    const savings = ((1 - compressedStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✓ ${file}`);
    console.log(`  ${originalSize} KB → ${compressedSize} KB (${savings}% smaller)\n`);
  } catch (error) {
    console.error(`✗ Error compressing ${file}:`, error.message);
  }
})).then(() => {
  console.log('Compression complete!');
  console.log(`Compressed images saved to: ${outputDir}`);
});
