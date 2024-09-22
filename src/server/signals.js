import process from 'node:process'
import { logger } from '#utils/logger.js'

const log = logger()

// TODO handle graceful shutdown (handle db, ...) using passed context

const handleSignals = (context) => {
	process.on('exit', (code) => {
		// NOTE: This event is not emitted for conditions causing explicit termination, such as process.exit() or uncaught exceptions
		// NOTE: This is where you can clean up resources before the process exits
		//       (e.g. close database connections, write logs, ...). Use context from index.js to pass resources to clean up.
		log.info(`Process exited with code: ${code}`)
	})

	// Catch Ctrl+C
	process.on('SIGINT', () => {
		log.info('Received SIGINT signal')
		// throw new Error('SOME ERROR') // uncomment to simulate uncaught exception by pressing Ctrl+C
		process.exit(0)
	})

	// Catch "kill pid"
	process.on('SIGTERM', () => {
		log.info('Received SIGTERM signal')
		process.exit(0)
	})

	// NOTE: This event is emitted when a JavaScript error isn't handled
	process.on('uncaughtException', (error) => {
		log.error('Uncaught exception:', error)
		process.exit(1)
	})
}

export { handleSignals }
