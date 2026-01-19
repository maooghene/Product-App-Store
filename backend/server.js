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

/* ================================
   FIX __dirname FOR ES MODULES
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================================
   MIDDLEWARE
================================ */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

/* ================================
   API ROUTES
================================ */
app.use("/api/products", productRoutes);

/* ================================
   SERVE FRONTEND IN PRODUCTION
================================ */
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  console.log("Serving frontend from:", frontendPath);

  // Serve static assets
  app.use(express.static(frontendPath));
}

/* ================================
   START SERVER
================================ */
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
