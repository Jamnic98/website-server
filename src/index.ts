import * as dotenv from 'dotenv'
dotenv.config()

import cron from 'node-cron'
import mongoose from 'mongoose'
import addRunsToDatabase from './helpers/addRunsToDataBase'
import app from './server'

const PORT = process?.env?.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || ''

// configure mongoose and connect to database
mongoose
  .connect(MONGODB_URI, {
    autoIndex: false
  })
  .then(() => console.log('Database connection established.'))
  .catch((error) => console.error(error))

const exitHandler = (options: any) => {
  if (options.cleanup) {
    mongoose.connection.close()
  }
  if (options.exit) {
    process.exit()
  }
}

process.stdin.resume() //so the program will not close instantly
//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }))

// listen for incoming requests
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))

// schedule a task to run
cron.schedule('0 */12 * * *', async () => await addRunsToDatabase())
