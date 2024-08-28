const Module = require('../models/Module');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { promisify } = require('util');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a module
exports.createModule = async (req, res) => {
    const { title, pages } = req.body;
  
    try {
      const module = new Module({ title, pages });
      const createdModule = await module.save();
      res.status(201).json(createdModule);
    } catch (error) {
      res.status(400).json({ message: 'Error creating module' });
    }
  };
  

// Get all modules
exports.getModules = async (req, res) => {
  const modules = await Module.find({});
  res.json(modules);
};

// Upload video
exports.uploadVideo = async (req, res) => {
  upload.single('video')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'File upload error' });

    try {
      const file = req.file;
      const result = await promisify(cloudinary.uploader.upload)(file.buffer, {
        resource_type: 'video',
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Cloudinary upload failed' });
    }
  });
};
