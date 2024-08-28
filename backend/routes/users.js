const express = require('express');
const { updateProgress } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/progress', protect, updateProgress);

module.exports = router;
