import strava from 'strava-v3'

import { getStravaToken } from './utils'
import { Run } from './store'

export const fetchStravaActivities = async (
	after: number = 0
): Promise<Run[] | null> => {
	try {
		const token = await getStravaToken()
		return await strava.athlete.listActivities({
			access_token: token?.access_token,
			after,
		})
	} catch (error) {
		console.error(error)
		return null
	}
}
