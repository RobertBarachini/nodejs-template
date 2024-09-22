import { Router } from 'express'
import { logger } from '#utils/logger.js'

// NOTE: Directory structure should roughly match the routes, however it is not always necessary

// Routes
import routesDevelop from './development/index.js'
import routesMaintenance from './maintenance/index.js'
import routesHealth from './maintenance/health.js'
import routesApi from './api/index.js'

const router = Router()
const log = logger()

// Aggregating all routes
router.use('/development', routesDevelop)
router.use('/health', routesHealth)
router.use('/maintenance', routesMaintenance)
router.use('/api', routesApi)

// Default route (no routes matched)
const defaultResponse = (req, res) => {
	res.status(404).send('Not Found')
}

router.use((req, res, next) => {
	defaultResponse(req, res)
})

// Catch server errors
router.use((err, req, res, next) => {
	log.error(err.stack)
	res.status(500).send('Internal Server Error')
})

export default router
