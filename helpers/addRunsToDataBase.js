import getActivities from '../strava.js';
import Run from '../models/run.models.js';

const addRunsToDatabase = async () => {
  try {
    const today = new Date();
    const previousDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      // 1 week from today
      today.getDate() - 7
    );

    const activities = await getActivities(previousDate.getTime() / 1000);
    const previousRuns = await Run.find({
      start_date_local: { $gt: previousDate }
    });

    const previousRunDates = previousRuns.map((run) =>
      new Date(run.start_date_local).getTime()
    );

    // filter runs which aren't in the database
    const filteredRuns = activities.filter(
      (run) =>
        previousRunDates.indexOf(new Date(run.start_date_local).getTime()) ===
        -1
    );

    if (filteredRuns.length > 0) {
      await Run.insertMany(
        filteredRuns.map((run) => {
          return {
            distance: run.distance,
            duration: run.moving_time,
            start_date_local: run.start_date_local
          };
        })
      );
      console.log('documents inserted');
    }
  } catch (error) {
    console.error(error);
  }
};

export default addRunsToDatabase;
