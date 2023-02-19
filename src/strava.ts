import strava from 'strava-v3'
import Token from './models/token.models'
import axios from 'axios'

const getActivities = async (after: any) => {
  try {
    let token: any = await Token.findById(0)
    // if token expired, request a new one
    if (Date.now() > token?.expires_at) {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token?.refresh_token
      })
      const { refresh_token, access_token, expires_at, expires_in } =
        response.data
      token = { refresh_token, access_token, expires_at, expires_in }
      // save token to database
      await Token.findByIdAndUpdate(0, token)
    }

    return await strava.athlete.listActivities({
      access_token: token.access_token,
      after: after
    })
  } catch (error) {
    console.error(error)
  }
}

export default getActivities
