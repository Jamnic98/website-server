import axios from 'axios'

import { getStravaToken } from './utils'
import { Run } from './store'

export const fetchStravaActivities = async (
	after: number = 0
): Promise<Run[] | null> => {
	try {
		const token = await getStravaToken()
		if (token) {
			const response = await axios.get(
				'https://www.strava.com/api/v3/athlete/activities',
				{
					headers: { Authorization: `Bearer ${token.access_token}` },
					params: { after },
				}
			)
			return response.data
		}
	} catch (error) {
		console.error(error)
	}
	return null
}
