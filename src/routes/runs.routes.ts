import express from "express";
import { getRuns } from "../controllers";

const router = express.Router();
router.get("", getRuns);

export const runsRoutes = router;
