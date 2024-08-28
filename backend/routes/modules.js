const express = require('express');
const multer = require('multer');
const { createModule, getModules, uploadVideo } = require('../controllers/moduleController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.route('/').post(protect, createModule).get(protect, getModules);
router.post('/upload', protect, upload.single('video'), uploadVideo);

module.exports = router;
