const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");

// ==============================
// Dashboard Statistics
// GET /dashboard
// ==============================
router.get("/", getDashboard);

module.exports = router;