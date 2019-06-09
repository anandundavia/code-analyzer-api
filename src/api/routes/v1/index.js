const express = require('express');

// import all the routes here
const analyzeRoutes = require('./analyze.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/analyze', analyzeRoutes);

module.exports = router;
