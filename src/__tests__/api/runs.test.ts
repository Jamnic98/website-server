import request from 'supertest'

import app from 'server'
import { testRunData } from 'data/seedData'

test('correctly fetches runs from the database', async () => {
	const response = await request(app).get('/runs')
	expect(response.status).toEqual(200)
	// test response data is expected
	const responseData = await response.body
	expect(responseData.length).toEqual(testRunData.length)
	expect(responseData[0].distance).toEqual(testRunData[0].distance)
	expect(responseData[0].duration).toEqual(testRunData[0].duration)
})

test('correctly fetches runs from the database after a specified time', async () => {
	const testTimeStamp = new Date('2022-06-01').getTime()
	const response = await request(app).get(`/runs?after=${testTimeStamp}`)
	expect(response.status).toEqual(200)
	// test response data is expected
	const responseData = await response.body
	expect(responseData.length).toEqual(2)
	expect(responseData[0].distance).toEqual(testRunData[2].distance)
	expect(responseData[0].duration).toEqual(testRunData[2].duration)
	expect(new Date(responseData[0].start_date_local)).toEqual(
		testRunData[2].start_date_local
	)
})
