const express = require('express');
const healthRoutes = require('./health.routes');
const testRoutes = require('./test.routes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/test', testRoutes);
router.use('/auth', authRoutes);

module.exports = router;
