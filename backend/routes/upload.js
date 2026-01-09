import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { protect, authorize } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer to use memory storage for Cloudinary
const storage = multer.memoryStorage();

// File filter for images and documents
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: JPEG, PNG, GIF, WebP, PDF, DOC, DOCX'));
  }
};

// File filter for videos
const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|webm|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetypePattern = /video\//;
  const mimetype = mimetypePattern.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: MP4, MOV, AVI, WebM, MKV'));
  }
};

// Initialize multer for images/documents
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

// Initialize multer for videos with larger size limit
const videoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 150 * 1024 * 1024 // 150MB limit for videos
  },
  fileFilter: videoFilter
});

// @route   POST /api/upload/image
// @desc    Upload single image
// @access  Private/Admin
router.post('/image', protect, authorize('admin'), upload.single('image'), async (req, res, next) => {
  try {
    console.log('📤 Upload request received');
    console.log('User:', req.user?.email);
    console.log('File:', req.file);
    
    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'creative-approach',
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          return res.status(500).json({
            success: false,
            message: 'Failed to upload image'
          });
        }
        
        console.log('✅ Image uploaded to Cloudinary:', result.secure_url);
        
        res.json({
          success: true,
          data: {
            url: result.secure_url,
            filename: result.public_id,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
          }
        });
      }
    );
    
    // Pipe the buffer to Cloudinary
    const bufferStream = require('stream').Readable.from(req.file.buffer);
    bufferStream.pipe(uploadStream);
    
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/upload/images
// @desc    Upload multiple images
// @access  Private/Admin
router.post('/images', protect, authorize('admin'), upload.array('images', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }
    
    // Upload all files to Cloudinary
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'creative-approach',
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                url: result.secure_url,
                filename: result.public_id,
                originalName: file.originalname,
                size: file.size,
                mimetype: file.mimetype
              });
            }
          }
        );
        
        const bufferStream = require('stream').Readable.from(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    });
    
    const files = await Promise.all(uploadPromises);
    
    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/upload/document
// @desc    Upload document (PDF, DOC, etc.)
// @access  Private/Admin
router.post('/document', protect, authorize('admin'), upload.single('document'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'creative-approach/documents',
        resource_type: 'raw'
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          return res.status(500).json({
            success: false,
            message: 'Failed to upload document'
          });
        }
        
        res.json({
          success: true,
          data: {
            url: result.secure_url,
            filename: result.public_id,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
          }
        });
      }
    );
    
    const bufferStream = require('stream').Readable.from(req.file.buffer);
    bufferStream.pipe(uploadStream);
    
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/upload/video
// @desc    Upload video file
// @access  Private/Admin
router.post('/video', protect, authorize('admin'), videoUpload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No video file uploaded'
      });
    }
    
    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'creative-approach/videos',
        resource_type: 'video',
        chunk_size: 6000000 // 6MB chunks for large videos
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary video upload error:', error);
          return res.status(500).json({
            success: false,
            message: 'Failed to upload video'
          });
        }
        
        res.json({
          success: true,
          data: {
            url: result.secure_url,
            filename: result.public_id,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            duration: result.duration
          }
        });
      }
    );
    
    const bufferStream = require('stream').Readable.from(req.file.buffer);
    bufferStream.pipe(uploadStream);
    
  } catch (error) {
    next(error);
  }
});

// Error handling for multer
router.use((error, req, res, next) => {
  console.error('❌ Upload error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 150MB for videos, 10MB for images'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 10 files'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${error.message}`
    });
  }
  
  if (error.message && error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  return res.status(500).json({
    success: false,
    message: error.message || 'Upload failed'
  });
  next(error);
});

export default router;
