import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve() + '/.env' });
import app from './server.js';
import cron from 'node-cron';
import mongoose from 'mongoose';
import addRunsToDatabase from './helpers/addRunsToDataBase.js';

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.MONGODB_URI;

// configure mongoose and connect to database

mongoose.set('useFindAndModify', false);
await mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false
  })
  .then(console.log('Database connection established.'))
  .catch((error) => console.error(error));

function exitHandler(options, exitCode) {
  if (options.cleanup) {
    mongoose.connection.close();
  }
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();
}

process.stdin.resume(); //so the program will not close instantly
//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

// listen for incoming requests
app.listen(PORT, console.log(`Server listening on port ${PORT}.`));

// schedule a task to run
cron.schedule('0 */12 * * *', async function () {
  await addRunsToDatabase();
});
