import express from "express";
import {begin} from "../controllers/storyController.js";

const router = express.Router();

router.get('/begin', begin)

export default router;