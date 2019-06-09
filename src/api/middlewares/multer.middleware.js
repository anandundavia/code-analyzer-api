const multer = require('multer');
const fs = require('fs');
const util = require('util');

const toArray = require('../utils/to-array');
const { uploads, files } = require('../../constants');
const logger = require('../utils/logger')(__filename);

const anAllowedFileExtensions = toArray(files.allowed);
const mkdir = util.promisify(fs.mkdir);

Promise.resolve()
	.then(() => mkdir(uploads.path))
	.then(() => logger.info('upload directories created'))
	.catch((e) => logger.info(`${e.message}`));

const storage = multer.diskStorage({
	destination: uploads.path,
	filename: (req, file, cb) => {
		const split = file.originalname.split('.');
		const extension = split[split.length - 1];
		const originalName = split.slice(0, split.length - 1).join('.');
		const newName = `${originalName}-${Date.now()}.${extension}`;
		cb(null, newName);
	},
});

const fileFilter = (req, file, cb) => {
	const _finder = (anAllowedFileExtension) => file.originalname.endsWith(anAllowedFileExtension);
	const index = anAllowedFileExtensions.findIndex(_finder);
	if (index >= 0) {
		return cb(null, true);
	}
	return cb(new Error(`Only ${anAllowedFileExtensions.join(',')} extensions are allowed!`), false);
};

const upload = multer({
	storage,
	fileFilter,
});

module.exports = upload.single(uploads.incoming);
