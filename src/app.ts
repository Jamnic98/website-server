import cron from 'node-cron'
import * as dotenv from 'dotenv'

import app from './server'
import { connectToDB } from './database'
import { addRunsToDatabase } from './utils'
import { exit } from 'process'

dotenv.config()

const PORT = process?.env?.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || ''

// schedule task to run each day at midnight
cron.schedule('0 0 * * *', async () => await addRunsToDatabase())

// const runApp = async () => {
// 	try {
// 		await connectToDB(MONGODB_URI)
// 		app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
// 	} catch (error) {
// 		console.error(error)
// 		exit(1)
// 	}
// }

// runApp()
