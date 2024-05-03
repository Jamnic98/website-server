import request from 'supertest'

import app from 'server'

test('health check endpoint', async () => {
	const response = await request(app).get('/health-check')
	expect(response.status).toEqual(200)
})
