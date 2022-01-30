import express from 'express';
import getRuns from '../controllers/runs.controllers.js';

const router = express.Router();

router.get('/', getRuns);

export default router;
