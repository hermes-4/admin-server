// models/Gallery.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { _id: true }
);

const GallerySchema = new mongoose.Schema({
  images: {
    type: [ImageSchema],
    default: [],
  },
});

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
