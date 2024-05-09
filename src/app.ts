import cron from 'node-cron'
import * as dotenv from 'dotenv'

import app from './server'
import { addRunsToDatabase, connectToDB } from './utils'

dotenv.config()

const PORT = process?.env?.PORT || '8080'
const MONGODB_URI = process.env.MONGODB_URI || ''

// schedule adding new run data to database each day at midnight
cron.schedule('0 0 * * *', async () => await addRunsToDatabase())

const runApp = async () => {
	try {
		await connectToDB(MONGODB_URI)
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
		// TODO: uncomment to manually insert run data
		// await addRunsToDatabase()
	} catch (error) {
		console.error(error)
	}
}

runApp()
