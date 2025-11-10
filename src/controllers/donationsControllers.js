import express from "express";
import Donation from "../models/donationModels.js";

const router = express.Router();

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

export const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({message: "Donation created successfully", transactionId: donation._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

