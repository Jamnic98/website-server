import Run from '../models/run.models.js';

const getRuns = async (req, res) => {
  try {
    const after = req.query.after;
    if (typeof after !== 'undefined') {
      const date = new Date(after);
      res.json(await Run.find({ start_date_local: { $gt: date } }));
    } else {
      res.json(await Run.find());
    }
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export default getRuns;
