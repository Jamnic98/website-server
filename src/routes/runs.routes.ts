import express from 'express'

import { getRuns } from '../controllers'

const router = express.Router()

// get all runs
router.get('', getRuns)

export const runsRoutes = router
