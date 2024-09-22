import { Router } from 'express'
import { logger } from '#utils/logger.js'

const router = Router()
const log = logger()

/**
 * Multiplies two numbers together
 *
 * @param {number} a - The first number
 * @param {number} b - The second number
 *
 * @returns {number} - The product of the two numbers
 *
 * @example
 * const product = multiplyTwo(1, 2)
 * console.log(product) // 2
 */
const multiplyTwo = (a, b) => {
	return a * b
}

router.get('/', (req, res) => {
	try {
		const a = parseInt(req.query.a)
		const b = parseInt(req.query.b)
		if (isNaN(a) || isNaN(b)) {
			throw new Error('Invalid input')
		}
		const product = multiplyTwo(a, b)
		res.status(200).send(product.toString())
	} catch (error) {
		log.error(error.stack)
		res.status(422).send('Unprocessable Entity - Invalid input')
	}
})

export default router
