import express from "express";
import { begin, getStoryData } from "../controllers/storyController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/begin', authenticateToken, begin);
router.get('/:storyId', authenticateToken, getStoryData);

export default router;