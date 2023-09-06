import { getActivities } from "../strava";
import { RunModel } from "../models";
import { Run } from "../store";

export const addRunsToDatabase = async () => {
  try {
    const today = new Date();
    // 1 day before today
    const previousDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
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
      (run: any) =>
        run.type === "Run" &&
        previousRunDates.indexOf(new Date(run.start_date_local).getTime()) ===
          -1
    );

    if (filteredRuns.length > 0) {
      const dataToUpload = filteredRuns.map((run: any) => {
        return {
          distance: run.distance,
          duration: run.moving_time,
          start_date_local: run.start_date_local,
        };
      });

      await RunModel.insertMany(dataToUpload);
      console.log("Runs inserted into database.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert data.");
  }
};
