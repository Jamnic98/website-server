import request from 'supertest'

import app from '../server'

test('Health check', async () => {
	const response = await request(app).get('/health-check')
	expect(response.status).toEqual(200)
})

// test('other test', async () => {
// 	const response = await request(app).get('/runs')
// 	expect(response.status).toEqual(200)
// })
