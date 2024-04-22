import { Request, Response } from 'express'
import { Query } from 'mongoose'

import { RunModel } from '../models'

export const getRuns = async (req: Request, res: Response) => {
	try {
		const query = new Query()
		const after = req.query?.after
		if (after) {
			query.where({
				start_date_local: { $gt: new Date(Number(after)) },
			})
		} else {
			query.where({})
		}
		return res.json(await RunModel.find(query))
	} catch (error) {
		console.error(error)
		return res.status(400).send(error)
	}
}
