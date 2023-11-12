import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

global.beforeAll(async () => {
	const mongoDBTestConnectionString = process.env.MONGODB_TEST_URI || ''
	try {
		await mongoose.connect(mongoDBTestConnectionString)
		console.log('DB connection established')
	} catch (_error) {
		console.error('Failed to establish connection to database')
	}
})

global.afterAll(async () => {
	try {
		await mongoose.disconnect()
		console.log('Disconnected from database')
	} catch (_error) {
		console.error('Failed to disconnect from database')
	}
})
