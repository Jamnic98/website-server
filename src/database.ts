import mongoose from 'mongoose'

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
