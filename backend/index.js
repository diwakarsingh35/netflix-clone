const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware

app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`)
);
