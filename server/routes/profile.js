import express from "express"
import { getProfiles } from "../controllers/profile.js"

const router = express.Router()

router.get("/", getProfiles)

export default router