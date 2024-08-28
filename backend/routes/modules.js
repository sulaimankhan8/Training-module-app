const express = require('express');
const { createModule, getModules, uploadVideo } = require('../controllers/moduleController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createModule).get(protect, getModules);
router.post('/upload', protect, uploadVideo);

module.exports = router;
