import mongoose from 'mongoose'

import { RunModel, TokenModel } from '../models'
import { testRunData } from '../data/seedData'

// configure mongoose and connect to database
export const connectToDB = async (mongoDBConnectionURI: string) => {
	try {
		await mongoose.connect(mongoDBConnectionURI, {
			autoIndex: false,
			retryWrites: true,
			writeConcern: { w: 'majority' },
		})
		console.log('Database connection established')
	} catch (_error) {
		throw new Error('Failed to connect to database')
	}
}

export const clearDatabase = async () => {
	try {
		await RunModel.deleteMany({}).exec()
		// await TokenModel.deleteMany({})
	} catch (error) {
		console.log(error)
	}
}

export const seedDatabase = async () => {
	try {
		await RunModel.insertMany(testRunData)
		// await TokenModel.insertMany(testTokenData)
	} catch (error) {
		console.error(error)
	}
}
