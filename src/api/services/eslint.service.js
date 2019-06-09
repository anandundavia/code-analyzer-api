/* eslint-disable class-methods-use-this */
const shell = require('shelljs');
const fs = require('fs');
const util = require('util');

const { Report } = require('../repository');
const logger = require('../utils/logger')(__filename);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

class ESLintService {
	constructor() {
		this.__createDirectory('reports');
		this.__createDirectory('temp');
	}

	__createDirectory(path) {
		Promise.resolve()
			.then(() => mkdir(path))
			.then(() => logger.info(`${path} directory created`))
			.catch((e) => logger.info(`${e.message}`));
	}

	analyzeFile(file) {
		return new Promise((resolve) => {
			const { path, filename } = file;
			const reportPath = `./reports/${filename}.report.json`;
			const command = `"eslint" ${path} --format json -o ${reportPath}`;
			const cwd = process.cwd();
			shell.exec(command, { cwd }, async () => {
				const reportText = await readFile(reportPath, 'utf-8');
				const reports = JSON.parse(reportText);
				this.saveReports(reports);
				resolve(reports);
			});
		});
	}

	async analyzeRaw(content) {
		const filename = `temp-${Date.now()}.js`;
		const path = `./temp/${filename}`;
		await writeFile(path, content);
		return this.analyzeFile({ filename, path });
	}

	async saveReports(reports) {
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < reports.length; i++) {
			// eslint-disable-next-line no-await-in-loop
			await Report.create(reports[i]);
		}
	}
}

module.exports = new ESLintService();
