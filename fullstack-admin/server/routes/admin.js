import express from "express"
import { getManagement } from "../controllers/management.js"

const router = express.Router()

router.get("/", getManagement)

export default router