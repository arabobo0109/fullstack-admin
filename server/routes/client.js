import express from "express"
import { getUser, getCustomer, getGeography, getDashboardStats } from "../controllers/client.js"

const router = express.Router()

router.get("/user/:id", getUser)
router.get("/customer", getCustomer)
router.get("/geography", getGeography)
router.get("/dashboard", getDashboardStats)

export default router