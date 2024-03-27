import mongoose from 'mongoose'

type ExitHandlerOptions = {
	cleanup?: boolean
	exit?: boolean
}

const exitHandler = (options: ExitHandlerOptions) => {
	if (options.cleanup) {
		mongoose.connection.close()
	}
	if (options.exit) {
		process.exit()
	}
}

// configure mongoose and connect to database
export const connectToDB = async (mongoDBConnectionURI: string) => {
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

	try {
		await mongoose.connect(mongoDBConnectionURI, {
			autoIndex: false,
			retryWrites: true,
			writeConcern: { w: 'majority' },
		})
		console.log('Database connection established')
	} catch (_error) {
		console.error('Failed to connect to database')
	}
}
