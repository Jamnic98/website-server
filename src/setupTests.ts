import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { clearDatabase, seedDatabase } from 'utils'

dotenv.config()

const mongoDBTestConnectionString = process.env.MONGODB_TEST_URI || ''

// initialize database connection
global.beforeAll(async () => {
	try {
		await mongoose.connect(mongoDBTestConnectionString)
		console.log('DB connection established')
	} catch (_error) {
		console.error('Failed to establish database connection')
	}
})

// clear the database and close the connection
global.afterAll(async () => {
	try {
		await clearDatabase()
		await mongoose.disconnect()
		console.log('Disconnected from database')
	} catch (_error) {
		console.error('Failed to disconnect from database')
	}
})

// clear the database and insert test data
global.beforeEach(async () => {
	try {
		await clearDatabase()
		await seedDatabase()
	} catch (error) {
		console.error(error)
	}
})
