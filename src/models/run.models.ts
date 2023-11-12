import mongoose from 'mongoose'
import { Run } from '../store'

const runSchema = new mongoose.Schema<Run>({
  distance: Number,
  duration: Number,
  start_date_local: Date,
})

export const RunModel = mongoose.model('Run', runSchema, 'runs')
