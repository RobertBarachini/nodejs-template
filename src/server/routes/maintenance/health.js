import Router from 'express'

const router = Router()

router.get('/', (req, res) => {
	res.status(200).send('OK')
})

export default router
