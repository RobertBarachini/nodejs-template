import { Router } from 'express'

const router = Router()

// Middleware - determine whether you can respond with the requested data
const isDevelopment = (req, res) => {
	if (process.env.NODE_ENV !== 'development') {
		return false
	}
	return true
}

const isLocal = (req, res) => {
	// TODO: IPv6
	if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
		return true
	}
	return false
}

const isSafe = (req, res, next) => {
	if (isDevelopment(req, res) == false) {
		return res.status(404).send('Not Found')
	}
	if (isLocal(req, res) == false) {
		return res.status(404).send('Not Found')
	}
	next()
}

// Routes
router.get('/env', isSafe, (req, res) => {
	res.status(200).send(process.env)
})

router.get('/error', isSafe, (req, res) => {
	throw new Error('Test error')
})

// Samples for proper API responses for easier program flow
// (simply check if error field exists in response object)
router.get('/sampleSuccess', isSafe, (req, res) => {
	const resultObject = { res: { name: 'sample object' } }
	res.status(200).send(resultObject)
})

router.get('/sampleError', isSafe, (req, res) => {
	const resultObject = { error: 'failure' } // Can also return a more complex object
	res.status(422).send(resultObject)
})

// Export select functions to prevent duplication
export { router as default, isLocal, isDevelopment }
