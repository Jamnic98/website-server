import { getActivities } from "../strava";
import { RunModel } from "../models";
import { Run } from "../store";

export const addRunsToDatabase = async () => {
  try {
    const today = new Date();
    const previousDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      // 1 week before today
      today.getDate() - 7
    );

    const previousRuns = await RunModel.find({
      start_date_local: { $gt: previousDate },
    });

    const previousRunDates = previousRuns.map((run: Run) =>
      new Date(run.start_date_local).getTime()
    );

    const activities = await getActivities(previousDate.getTime() / 1000);

    // get runs not in database
    const filteredRuns = activities.filter(
      (run: Run) =>
        previousRunDates.indexOf(new Date(run.start_date_local).getTime()) ===
        -1
    );

    if (filteredRuns.length > 0) {
      await RunModel.insertMany(
        filteredRuns.map((run: any) => {
          return {
            distance: run.distance,
            duration: run.moving_time,
            start_date_local: run.start_date_local,
          };
        })
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert data.");
  }
};
