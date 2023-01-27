import mongoose from "mongoose";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import AffiliateStat from "../models/affiliateStat.js";

export const getManagement = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password")
        res.status(200).json(admins)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPerformance = async (req, res) => {
    try {
        const { id } = req.params

        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    localField: "_id",
                    foreignField: "userId",
                    from: "affiliatestats",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats" }
        ])

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        )

        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        )

        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}