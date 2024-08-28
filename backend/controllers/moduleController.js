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

  const createdModule = await module.save();
  res.status(201).json(createdModule);
};

exports.getModules = async (req, res) => {
  const modules = await Module.find({});
  res.json(modules);
};

exports.uploadVideo = async (req, res) => {
  const file = req.files.video;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    resource_type: 'video',
  });

  res.json({ url: result.secure_url });
};
