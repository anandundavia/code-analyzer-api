const mongoose = require('mongoose');

const Report = new mongoose.Schema(
	{
		filePath: { type: String, required: true },
	},
	{ timestamps: true, toJSON: { getters: true, virtuals: false }, strict: false }
);

module.exports = mongoose.model('Report', Report);
