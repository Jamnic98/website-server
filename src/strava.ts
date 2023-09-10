import strava from "strava-v3";

import { retrieveToken } from "./utils";

export const getActivities = async (after: Number = 0) => {
  try {
    const token = await retrieveToken();
    return await strava.athlete.listActivities({
      access_token: token?.access_token,
      after,
    });
  } catch (error) {
    console.error(error);
  }
};
