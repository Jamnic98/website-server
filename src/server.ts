import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import runsRoutes from './routes/runs.routes'

// express configuration
const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/health-check', (_req, res) => res.status(200).send())

app.use('/runs', runsRoutes)

export default app
