import cron from 'node-cron'
import * as dotenv from 'dotenv'
dotenv.config()

import { addRunsToDatabase } from './utils'
import connectToDatabase from './database'
import app from './server'

const PORT = process?.env?.PORT || 8080

connectToDatabase().then(() =>
	// listen for incoming requests
	app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
)

// schedule a task to run (each day at midnight)
cron.schedule('0 0 * * *', async () => await addRunsToDatabase())
