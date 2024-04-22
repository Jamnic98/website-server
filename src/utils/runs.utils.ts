import { fetchStravaActivities } from './strava.utils'
import { RunModel } from '../models'
import { Run } from '../store'

// get date 1 month before today
const currentDate = new Date()
const dateInThePast = new Date(currentDate.setMonth(currentDate.getMonth() - 1))

export const addRunsToDatabase = async () => {
	try {
		// runs from database after a past date
		const previousRuns: Run[] = await RunModel.find({
			start_date_local: { $gte: dateInThePast },
		})

		// get a list of timestamps for runs that exist in the database
		const previousRunDates = previousRuns?.map((run) =>
			new Date(run.start_date_local).getTime()
		)

		// fetch activities from Strava
		const stravaActivities = await fetchStravaActivities(
			dateInThePast.getTime() / 1000
		)

		// filter runs from Strava that are not in the database
		const filteredRuns = stravaActivities?.filter(
			(stravaActivity: any) =>
				stravaActivity.type === 'Run' &&
				previousRunDates.indexOf(
					new Date(stravaActivity.start_date_local).getTime()
				) === -1
		)

		// if new runs on Strava, insert them into DB
		if (filteredRuns && filteredRuns.length > 0) {
			const dataToInsert = filteredRuns.map((run: any): Run => {
				return {
					distance: run.distance,
					duration: run.moving_time,
					start_date_local: run.start_date_local,
				}
			})

			await RunModel.insertMany(dataToInsert)
			console.log('Runs inserted:', dataToInsert)
		}
	} catch (error) {
		console.error(error)
	}
}
