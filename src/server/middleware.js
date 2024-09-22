import express from 'express'
import morgan from 'morgan'
import crypto from 'crypto'
import { logger } from '#utils/logger.js'

const applyMiddleware = (app) => {
	// Create a logger
	const log = logger()

	// JSON parsing middleware
	app.use(express.json())

	// Add a unique request ID to the request object
	app.use((req, res, next) => {
		if (!req.headers['x-request-id']) {
			req.id = crypto.randomUUID()
		} else {
			req.id = req.headers['x-request-id']
		}
		next()
	})

	// Custom Morgan token
	morgan.token('hostname', (req) => req.hostname)
	// morgan.token('protocol', (req) => req.protocol)
	morgan.token(
		'http-version',
		(req) => `HTTP/${req.httpVersionMajor}.${req.httpVersionMinor}`
	)
	morgan.token('client-ip', (req) => req.ip)
	morgan.token('request-id', (req) => req.headers['x-request-id'] || req.id)

	// Custom Morgan format
	const customMorganFormat =
		':method :url :status :response-time ms :res[content-length] :http-version :hostname - :client-ip :request-id'

	// Redirect Morgan logs to the logger
	const morganMiddleware = morgan(customMorganFormat, {
		stream: {
			write: (message) => {
				// parse status code
				const messageParts = message.split(' ')
				const statusCode = parseInt(messageParts[2])
				const requestId = messageParts.slice(-1)[0]
				if (statusCode === NaN) {
					log.error(
						`Invalid status code in request message with ID: '${requestId}'`
					)
					log.info(message.trim())
					return
				}
				// Only internal server errors should be logged as errors in this context
				if (statusCode >= 500) {
					log.error(message.trim())
					return
				}
				log.info(message.trim())
			},
		},
	})

	// Use Morgan as middleware
	app.use(morganMiddleware)
}

export { applyMiddleware }
