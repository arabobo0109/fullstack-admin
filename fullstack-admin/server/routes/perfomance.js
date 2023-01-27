import express from "express"
import { getPerformance } from "../controllers/management.js"

const router = express.Router()

router.get("/:id", getPerformance)

export default router