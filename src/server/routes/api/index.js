import { Router } from 'express'

import routerMath from './math/index.js'
import routerExpress from './express/index.js'

const router = Router()

router.use('/math', routerMath)
router.use('/express', routerExpress)

export default router
