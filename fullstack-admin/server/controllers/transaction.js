import Transaction from "../models/transaction.js"

export const getTransaction = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query

        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            }

            return sortFormatted
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {}

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: search, $options: "i" } },
                { userId: { $regex: search, $options: "i" } }
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize)

        const total = await Transaction.countDocuments({
            $or: [
                { cost: { $regex: search, $options: "i" } },
                { userId: { $regex: search, $options: "i" } }
            ],
        })

        res.status(200).json({
            transactions,
            total,
        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}