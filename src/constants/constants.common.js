/**
 * Common constants across all the environments (dev, staging, prod)
 */
module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,

	uploads: {
		path: 'uploads',
		incoming: 'file',
	},

	files: {
		allowed: {
			js: 'js',
		},
	},

	database: {
		name: process.env.MONGO_DB_DATABASE_NAME,
		username: encodeURIComponent(process.env.MONGO_DB_USERNAME),
		password: encodeURIComponent(process.env.MONGO_DB_PASSWORD),
		host: process.env.MONGO_DB_HOST,
	},
};
