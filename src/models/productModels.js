import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: true  },
    images: { type: [String], required: true },
    description: { type: String  },
    stock: { type: Number, default: 0  },
    sizes: { type: [String]  },
    colors: { type: [String]  },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
