import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { runsRoutes } from './routes'

const app = express()
// server configuration
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
)
app.use(cors())

// base routes
app.use('/health-check', (_req, res) => res.status(200).send())
app.use('/runs', runsRoutes)

export default app
