import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

const exitHandler = (options: { cleanup?: boolean; exit?: boolean }) => {
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

// configure mongoose and connect to database
export default async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: false,
    })
    console.log('Database connection established')
  } catch (_error) {
    console.error('Failed to connect to database')
  }
}
