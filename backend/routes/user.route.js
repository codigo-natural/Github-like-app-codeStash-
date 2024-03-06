import express from "express";

import {
  getLikes,
  getUserProfileAndRepos,
  likeProfile,
} from "../controllers/user.controller.js";
import { ensureAutenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
router.get("/likes", ensureAutenticated, getLikes);
router.post("/like/:username", ensureAutenticated, likeProfile);

export default router;
