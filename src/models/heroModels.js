import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  images: { type: [String], required: true },
});

const heroSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true },
  slides: [heroSlideSchema], 
}, { timestamps: true });

const Hero = mongoose.model("Hero", heroSchema);
export default Hero;
