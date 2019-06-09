const Joi = require('joi');

const toArray = require('../utils/to-array');
const { files } = require('../../constants');

const anAllowedFileExtensions = toArray(files.allowed);

module.exports = {
	raw: {
		body: {
			lang: Joi.string().required(),
			payload: Joi.string().required(),
		},
	},

	file: {
		body: {
			lang: Joi.string().allow(anAllowedFileExtensions),
		},
	},
};
