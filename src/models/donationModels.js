import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    amount: { type: Number, required: true },
    frequency: { type: String, enum: ["One-time", "Weekly", "Monthly", "Yearly"], required: true },
    dedication: { type: String },
    paymentOption: { type: String,  },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
