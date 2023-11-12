import { Request, Response } from 'express'
import { Query } from 'mongoose'

import { RunModel } from '../models'

export const getRuns = async (req: Request, res: Response) => {
	const after = req.query?.after
	const query = new Query()
	if (after && typeof after === 'string') {
		query.where({ start_date_local: { $gt: new Date(after) } })
	} else {
		query.where({})
	}
	try {
		return res.json(await RunModel.find(query))
	} catch (error) {
		console.error(error)
		return res.status(400).send(error)
	}
}
