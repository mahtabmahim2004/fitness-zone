const express = require("express");
const dotenv = require("dotenv");

// ==========================
// Load Environment Variables
// ==========================
dotenv.config();

const cors = require("cors");
const pool = require("./config/db");

console.log("===== APP.JS LOADED =====");

// Debug .env
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? "Loaded" : "Undefined",
});

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ==========================
// Import Routes
// ==========================
const memberRoutes = require("./routes/memberRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const packageRoutes = require("./routes/packageRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reportRoutes = require("./routes/reportRoutes");

// ==========================
// Test Route
// ==========================
app.get("/test123", (req, res) => {
  res.json({
    message: "THIS IS THE CURRENT SERVER",
  });
});

// ==========================
// API Routes
// ==========================
app.use("/members", memberRoutes);
app.use("/trainers", trainerRoutes);
app.use("/packages", packageRoutes);
app.use("/payments", paymentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", adminRoutes);
app.use("/reports", reportRoutes);

// ==========================
// Home Route
// ==========================
app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.send("✅ Gym Management System Backend Running");
  } catch (error) {
    console.error(error);

    res.status(500).send("❌ Database Connection Failed");
  }
});

// ==========================
// Global Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});