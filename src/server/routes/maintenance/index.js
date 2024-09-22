// Various maintenance routes

import Router from 'express'

const router = Router()

router.get('/time', (req, res) => {
	const date = new Date()
	res.status(200).send(date)
})

export default router
