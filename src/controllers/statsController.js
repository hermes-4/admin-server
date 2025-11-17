import Event from "../models/eventModel";
import Donation from "../models/donationModel";
import Message from "../models/messageModel";
import Product from "../models/productModels";

export const getStats = async (req, res) => {
  try {
    // Example statistics data
    const [events, donations, messages, products] = await Promise.all([
      Event.countDocuments(),
      Donation.countDocuments(),
      Message.countDocuments(),
      Product.countDocuments(),
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyStats = async (req, res) => {
  try {
    const monthlyStats = await Donation.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedStats = monthlyStats.map((item) => ({
      month: months[item._id - 1],
      totalAmount: item.totalAmount,
    }));
    res.status(200).json(formattedStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
