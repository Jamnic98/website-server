import strava from "strava-v3";
import { retrieveToken } from "./utils";

export const getActivities = async (
  after: Number,
  before: Number = new Date().getTime()
) => {
  try {
    return await strava.athlete.listActivities({
      access_token: await retrieveToken(),
      after,
      before,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get activites.");
  }
};
