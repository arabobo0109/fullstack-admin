import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from "./routes/client.js"
import profileRoutes from "./routes/profile.js"
import transactionRoutes from "./routes/transaction.js"
import tradeRoutes from "./routes/trade.js"
import automateBotRoutes from "./routes/automatebot.js"
import settingRoutes from "./routes/setting.js"
import salesRoutes from "./routes/sales.js"
import adminRoutes from "./routes/admin.js"
import performanceRoute from "./routes/perfomance.js"

/** Data imports */
// import User from "./models/user.js"
// import Product from './models/product.js'
// import ProductStat from './models/productstat.js'
// import Transaction from './models/transaction.js'
// import OverallStats from './models/overallstats.js'
// import AffiliateStat from './models/affiliateStat.js'
// import { dataAffiliateStat } from './data/index.js'



/** CONFIGURATIONS */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

/** ROUTES */
app.use("/", clientRoutes)
app.use("/profile", profileRoutes)
app.use("/transaction", transactionRoutes)
app.use("/trade", tradeRoutes)
app.use("/bot", automateBotRoutes)
app.use("/setting", settingRoutes)
app.use("/sales", salesRoutes)
app.use("/admin", adminRoutes)
app.use("/performance", performanceRoute)

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

    /** Don only One time */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStats.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
    

}).catch( (error) => console.log(`Server not connect ${error}`))