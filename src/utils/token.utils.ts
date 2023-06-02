import axios from "axios";
import { TokenModel } from "../models";
import { Token } from "../store";

const isTokenValid = (token: Token): boolean =>
  !!token && Date.now() < token.expires_at;

export const requestNewToken = async (expiredToken: Token) => {
  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: expiredToken.refresh_token,
    });

    const { access_token, expires_at, expires_in, refresh_token } =
      await response.data;

    const newToken = {
      access_token,
      expires_at,
      expires_in,
      refresh_token,
    };

    // save token to database
    await TokenModel.findByIdAndUpdate(0, newToken);
    return newToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh access token.");
  }
};

export const retrieveToken = async (): Promise<Token | null> => {
  try {
    const accessToken = await TokenModel.findById(0);
    if (!!accessToken && !isTokenValid(accessToken)) {
      // request new token
      return await requestNewToken(accessToken);
    } else {
      return accessToken;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve token.");
  }
};
