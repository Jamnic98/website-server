import request from 'supertest'

import app from 'server'
import { testRunData } from 'data/seedData'

test('get runs correctly', async () => {
	const response = await request(app).get('/runs')
	expect(response.status).toEqual(200)
	// test response data is expected
	const responseData = await response.body
	expect(responseData.length).toEqual(testRunData.length)
	expect(responseData[0].distance).toEqual(testRunData[0].distance)
	expect(responseData[0].duration).toEqual(testRunData[0].duration)
})
