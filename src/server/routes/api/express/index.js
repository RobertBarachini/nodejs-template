import { Router } from 'express'

const router = Router()

const testQueryParams = (req, res) => {
	const { query } = req
	res.status(200).send(query)
}

const testHeaders = (req, res) => {
	const { headers } = req
	res.status(200).send(headers)
}

const testBody = (req, res) => {
	const { body } = req // requires JSON body (as defined in middleware parsing)
	res.status(200).send(body)
}

router.get('/query', testQueryParams)
router.get('/headers', testHeaders)
router.post('/body', testBody)

export default router
