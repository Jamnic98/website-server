import express from 'express'
import getRuns from '../controllers/runs.controllers'

const router = express.Router()

router.get('/', getRuns)

export default router
