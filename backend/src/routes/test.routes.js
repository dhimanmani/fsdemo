const express = require('express');
const {
  testConnection,
  testMongoDB,
  testCloudinary,
} = require('../controllers/test.controller');

const router = express.Router();

router.get('/', testConnection);
router.get('/mongodb', testMongoDB);
router.get('/cloudinary', testCloudinary);

module.exports = router;
