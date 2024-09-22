import { Router } from 'express'

import routerAddition from './addition.js'
import routerMultiplication from './multiplication.js'

const router = Router()

// Routes
// These would be functions in a real-world application
// they are used to demonstrate how to structure the routes
router.use('/addition', routerAddition)
router.use('/multiplication', routerMultiplication)

export default router
