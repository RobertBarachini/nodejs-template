import winston from 'winston'

/**
 * Create a logger instance with winston
 *
 * @param {Object} [options={}] - Options object
 * @param {String} [options.service='default'] - Name of the service
 * @param {String} [options.level='info'] - Log level
 * @param {String} [options.path='logs'] - Path to the log file
 * @returns {Object} logger
 * @example
 * const logger = logger({ service: 'my-service', level: 'info', path: 'logs' })
 * logger.info('Hello world')
 * logger.error('Something went wrong')
 * logger.warn('Something is not right')
 * logger.verbose('Something is happening')
 * logger.debug('Something is happening')
 * logger.silly('Something is happening')
 */
const logger = (options) => {
	// Create the options object if not passed
	if (!options) {
		options = {}
	}
	let { service, level, path } = options
	// Set the default options
	if (!service) {
		service = 'default'
	}
	if (!level) {
		level = 'info'
	}
	if (!path) {
		path = 'logs'
	}
	const filename = `${service}.log`
	// Check if the level is valid
	if (
		!new Set(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).has(level)
	) {
		level = 'info'
	}
	// Create the logger
	const logger = winston.createLogger({
		level,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.json()
		),
		defaultMeta: { service, timestamp: new Date().toISOString() },
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: `${path}/${filename}` }),
			// TODO: Add a transport to send the logs to a remote server
		],
	})
	return logger
}

export { logger }
