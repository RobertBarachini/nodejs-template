// Packages
import express from 'express'

// Project imports
import { logger } from '#utils/logger.js'
import { applyMiddleware } from './middleware.js'
import { default as router } from './routes/router.js'

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
