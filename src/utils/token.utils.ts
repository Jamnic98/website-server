import axios from 'axios'

import { TokenModel } from '../models'
import { Token } from '../store'

const isTokenValid = (token: Token): boolean => Date.now() < token.expires_at

export const requestNewToken = async (expiredToken: Token) => {
	try {
		const response = await axios.post('https://www.strava.com/oauth/token', {
			client_id: process.env.STRAVA_CLIENT_ID,
			client_secret: process.env.STRAVA_CLIENT_SECRET,
			grant_type: 'refresh_token',
			refresh_token: expiredToken.refresh_token,
		})

		const { access_token, expires_at, expires_in, refresh_token } =
			await response.data

		const newToken: Token = {
			access_token,
			expires_at,
			expires_in,
			refresh_token,
		}

		// save token to database
		return await TokenModel.findOneAndReplace(undefined, newToken, {
			returnDocument: 'after',
		}).exec()
	} catch (error) {
		console.error(error)
		throw new Error('Failed to refresh access token')
	}
}

export const getStravaToken = async (): Promise<Token | null> => {
	try {
		const token = await TokenModel.findOne().exec()
		if (!!token && !isTokenValid(token)) {
			// token expired, request new one
			return await requestNewToken(token)
		}
		return token
	} catch (error) {
		console.error('Failed to get access token')
		return null
	}
}
