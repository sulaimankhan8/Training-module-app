const Module = require('../models/Module');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createModule = async (req, res) => {
  const { title, pages } = req.body;
  const module = new Module({
    title,
    pages,
  });

  try {
    const createdModule = await module.save();
    res.status(201).json(createdModule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create module' });
  }
};

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch modules' });
  }
};

exports.uploadVideo = async (req, res) => {
  if (!req.files || !req.files.video) return res.status(400).json({ message: 'No video file uploaded' });

  try {
    const result = await cloudinary.uploader.upload(req.files.video.tempFilePath, { resource_type: 'video' });
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload video' });
  }
};
