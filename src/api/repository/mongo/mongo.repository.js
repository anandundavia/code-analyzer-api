const mongoose = require('mongoose');

const logger = require('../../utils/logger')(__filename);
const { database } = require('../../../../src/constants');

// eslint-disable prettier/prettier
// prettier-ignore
const URI = `mongodb+srv://${database.username}:${database.password}@${database.host}/${database.name}?retryWrites=true`;

logger.debug('attempting to connect to MongoDB');
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true });

const { connection } = mongoose;
connection.on('error', (e) => {
	logger.error('failed to open connection to MongoDB');
	logger.error(e);
});
connection.once('open', () => {
	logger.info('successfully opened a connection to MongoDB');
});

/* eslint-disable global-require */
module.exports = {
	Report: require('./models/report.model'),
};
