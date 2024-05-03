import cron from 'node-cron'
import * as dotenv from 'dotenv'

import app from './server'
import { addRunsToDatabase, connectToDB } from './utils'

dotenv.config()

const PORT = process?.env?.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || ''

// schedule task to run each day at midnight
cron.schedule('0 0 * * *', async () => await addRunsToDatabase())

const runApp = async () => {
	await connectToDB(MONGODB_URI)
	app.listen(Number(PORT), () =>
		console.log(`Server listening on port ${PORT}`)
	)
}

runApp()
