import User from "../models/user.js";
import getCountryIso3 from "country-iso-2-to-3";
import Transaction from "../models/transaction.js";
import OverallStat from "../models/overallstats.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mapperUserLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);

      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }

      acc[countryISO3] += 1;

      return acc;
    }, {});

    const formattedLocations = Object.entries(mapperUserLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.stauts(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const currentMonth = "November"
    const currentYear = 2021
    const currentDay = "2021-11-15"

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
        return month === currentMonth
    })

    const todayStats = overallStats[0].dailyData.find(({ date }) => {
        return date === currentDay
    })

    res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions
  })

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
