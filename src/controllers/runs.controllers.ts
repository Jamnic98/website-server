import Run from '../models/run.models'

const getRuns = async (req: any, res: any) => {
  try {
    const after = req.query.after
    if (typeof after === 'undefined') {
      res.json(await Run.find())
    } else {
      const date = new Date(after)
      res.json(await Run.find({ start_date_local: { $gt: date } }))
    }
  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}

export default getRuns
