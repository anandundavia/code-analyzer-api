const httpStatus = require('http-status');
const eslintService = require('../services/eslint.service');

exports.raw = async (req, res, next) => {
	try {
		const { payload } = req.body;
		const report = await eslintService.analyzeRaw(payload);
		res.status(httpStatus.OK).json(report);
	} catch (e) {
		next(e);
	}
};

exports.file = async (req, res, next) => {
	try {
		const { file } = req;
		const report = await eslintService.analyzeFile(file);
		res.status(httpStatus.OK).json(report);
	} catch (e) {
		next(e);
	}
};
