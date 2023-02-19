import mongoose from 'mongoose'

const runSchema = new mongoose.Schema({
  distance: Number,
  duration: Number,
  start_date_local: Date
})

const Run = mongoose.model('Run', runSchema, 'runs')

export default Run
