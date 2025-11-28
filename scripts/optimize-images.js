/**
 * Image Optimization Script
 * Converts images to WebP format and creates optimized versions
 * 
 * Run: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directories to scan for images
const imageDirs = [
  'public',
  'assets/images',
];

// Image quality settings
const QUALITY = {
  webp: 85,
  jpeg: 90,
  png: 90,
};

// Supported image formats
const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png'];

/**
 * Get all image files recursively from a directory
 */
function getImageFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        getImageFiles(filePath, fileList);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_FORMATS.includes(ext) && !file.includes('-optimized')) {
          fileList.push(filePath);
        }
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return fileList;
}

/**
 * Convert image to WebP format
 */
async function convertToWebP(imagePath) {
  try {
    const parsed = path.parse(imagePath);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
    
    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping ${imagePath} (WebP already exists)`);
      return;
    }
    
    await sharp(imagePath)
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);
    
    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ Converted ${path.basename(imagePath)} → ${path.basename(webpPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`❌ Error converting ${imagePath}:`, error.message);
  }
}

/**
 * Create responsive image variants
 */
async function createResponsiveVariants(imagePath) {
  try {
    const parsed = path.parse(imagePath);
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    const sizes = [
      { suffix: '-small', width: 640 },
      { suffix: '-medium', width: 1024 },
      { suffix: '-large', width: 1920 },
    ];
    
    for (const size of sizes) {
      // Only create smaller versions
      if (metadata.width > size.width) {
        const outputPath = path.join(parsed.dir, `${parsed.name}${size.suffix}${parsed.ext}`);
        
        if (fs.existsSync(outputPath)) continue;
        
        await sharp(imagePath)
          .resize(size.width, null, { withoutEnlargement: true })
          .toFile(outputPath);
        
        console.log(`📐 Created ${path.basename(outputPath)}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error creating responsive variants for ${imagePath}:`, error.message);
  }
}

/**
 * Main optimization function
 */
async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');
  
  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Sharp is not installed. Run: npm install --save-dev sharp');
    process.exit(1);
  }
  
  const allImages = [];
  
  // Collect all images
  for (const dir of imageDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      console.log(`📂 Scanning ${dir}...`);
      const images = getImageFiles(dirPath);
      allImages.push(...images);
    }
  }
  
  console.log(`\n📸 Found ${allImages.length} images to optimize\n`);
  
  // Process all images
  for (const imagePath of allImages) {
    await convertToWebP(imagePath);
  }
  
  console.log('\n✨ Image optimization complete!\n');
}

// Run optimization
optimizeImages().catch(console.error);
