import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* Fix __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Middleware */
app.use(cors());
app.use(express.json());

/* API routes */
app.use("/api/products", productRoutes);

/* Serve frontend */
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  console.log("Serving frontend from:", frontendPath);

  app.use(express.static(frontendPath));

  // ✅ FIXED: catch-all handler (Express v5 safe)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

/* Start server */
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

