// Packages
import express from 'express'

// Project imports
import { handleSignals } from './signals.js'
import { logger } from '#utils/logger.js'
import { applyMiddleware } from './middleware.js'
import { default as router } from './routes/router.js'

// Handle signals
// NOTE: pass context to handleSignals if you need to handle graceful shutdown of resources
handleSignals()

const app = express()
const log = logger()
const port = process.env.PORT ?? 3000

// Middleware
applyMiddleware(app)

// Routes
app.use('/', router)

// Start server
app.listen(port, () => {
	log.info(`Server listening on port ${port}`)
})
