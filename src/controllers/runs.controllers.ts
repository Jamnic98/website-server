import { Request, Response } from "express";
import { Query } from "mongoose";
import { RunModel } from "../models";

export const getRuns = async (req: Request, res: Response) => {
  try {
    const query = new Query();
    const after = req.query?.after;
    if (typeof after === "undefined") {
      query.where({});
    } else {
      const afterDate = new Date(after as string);
      query.where({ start_date_local: { $gt: afterDate } });
    }
    return res.json(await RunModel.find(query));
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};
