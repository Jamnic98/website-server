import cron from 'node-cron'
import * as dotenv from 'dotenv'
dotenv.config()

import { addRunsToDatabase } from './utils'
import { connectToDB } from './database'
import app from './server'

const PORT = process?.env?.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || ''

connectToDB(MONGODB_URI).then(() =>
	// listen for incoming requests
	app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
)

// schedule task to run each day at midnight
cron.schedule('0 0 * * *', async () => await addRunsToDatabase())
