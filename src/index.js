import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adminAuthRoutes from "./routes/admin.auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import donationRoutes from "./routes/donation.routes.js";
import contactInfoRoutes from "./routes/contactInfo.routes.js";
import contactFormRoutes from "./routes/contact.form.routes.js";
import heroRoutes from "./routes/hero.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/v1/admin/auth", adminAuthRoutes);
app.use("/v1/admin/categories", categoryRoutes);
app.use("/v1/admin/products", productRoutes);
app.use("/v1/admin/donation_responses", donationRoutes);
app.use("/v1/admin/contact_info", contactInfoRoutes);
app.use("/v1/admin/hero", heroRoutes);
app.use("/v1/admin/contact_forms", contactFormRoutes);

app.get("/", (req, res) => {
  res.send(`Admin auth API is running on ${process.env.PORT}`);
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
