import { fetchStravaActivities } from './strava.utils'
import { RunModel } from '../models'
import { Run } from '../store'

// get date 1 month before today
const currentDate = new Date()
const dateInThePast = new Date(currentDate.setMonth(currentDate.getMonth() - 1))

export const addRunsToDatabase = async () => {
	try {
		// activities from database
		const previousRuns: Run[] = await RunModel.find({
			start_date_local: { $gte: dateInThePast },
		})

		const previousRunDates = previousRuns?.map((run) =>
			new Date(run.start_date_local).getTime()
		)

		// activities from Strava
		const stravaActivities = await fetchStravaActivities(
			dateInThePast.getTime() / 1000
		)

		// filter runs from Strava that are not in the database
		const filteredRuns =
			stravaActivities &&
			stravaActivities?.filter(
				(run: any) =>
					run.type === 'Run' &&
					previousRunDates.indexOf(new Date(run.start_date_local).getTime()) ===
						-1
			)

		// if new runs on Strava, insert them into DB
		if (filteredRuns && filteredRuns.length > 0) {
			const dataToUpload = filteredRuns.map((run: any): Run => {
				return {
					distance: run.distance,
					duration: run.moving_time,
					start_date_local: run.start_date_local,
				}
			})

			await RunModel.insertMany(dataToUpload)
			console.log('Runs inserted')
		}
	} catch (error) {
		console.error(error)
	}
}
