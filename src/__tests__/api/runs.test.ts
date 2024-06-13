import mongoose from 'mongoose'
import request from 'supertest'

import app from 'server'
import { testRunData } from 'data/seedData'
import { clearDatabase, connectToDB, seedDatabase } from 'utils'

const mongoDBTestConnectionString = process.env.MONGODB_TEST_URI || ''

// connect to the database
beforeAll(async () => {
	try {
		await connectToDB(mongoDBTestConnectionString)
	} catch (error) {
		console.error(error)
	}
})

// clear the database and insert fresh test data for every test
beforeEach(async () => {
	try {
		await clearDatabase()
		await seedDatabase()
	} catch (error) {
		console.error(error)
	}
})

// clear the database and close the connection
afterAll(async () => {
	try {
		await clearDatabase()
		await mongoose.disconnect()
		console.log('Disconnected from database')
	} catch (_error) {
		console.error('Failed to disconnect from database')
	}
})

test('correctly fetches runs from the database', async () => {
	const response = await request(app).get('/runs')
	expect(response.status).toEqual(200)
	// test response data is expected
	const { runs } = await response.body
	expect(runs.length).toEqual(testRunData.length)
	expect(runs[0].distance).toEqual(testRunData[0].distance)
	expect(runs[0].duration).toEqual(testRunData[0].duration)
})

test('correctly fetches runs from the database after a specified time', async () => {
	const testTimeStamp = new Date('2022-06-01').getTime()
	const response = await request(app).get(`/runs?after=${testTimeStamp}`)
	expect(response.status).toEqual(200)
	// test response data is expected
	const { runs } = await response.body
	expect(runs.length).toEqual(2)
	expect(runs[0].distance).toEqual(testRunData[2].distance)
	expect(runs[0].duration).toEqual(testRunData[2].duration)
	expect(new Date(runs[0].start_date_local)).toEqual(
		testRunData[2].start_date_local
	)
})
