import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    phone1: String,
    phone2: String,
    email: String,
    time: String,
  },
  { timestamps: true }
);



export default mongoose.model("ContactInfo", contactInfoSchema);
