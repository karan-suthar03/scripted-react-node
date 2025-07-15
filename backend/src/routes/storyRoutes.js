import express from "express";
import { begin, getStoryData, initialSnippet, customInitialSnippet } from "../controllers/storyController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/begin', authenticateToken, begin);
router.get('/:storyId', authenticateToken, getStoryData);
router.post('/initial-snippet', authenticateToken, initialSnippet);
router.post('/custom-initial-snippet', authenticateToken, customInitialSnippet);

export default router;