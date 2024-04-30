import cron from 'node-cron'
import * as dotenv from 'dotenv'

import app from './server'
import { connectToDB } from './database'
import { addRunsToDatabase } from './utils'

dotenv.config()

const PORT = process?.env?.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || ''

// schedule task to run each day at midnight
cron.schedule('0 0 * * *', async () => await addRunsToDatabase())

connectToDB(MONGODB_URI)
app.listen(Number(PORT), '127.0.0.1', () =>
	console.log(`Server listening on port: ${PORT}`)
)
