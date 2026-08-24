const pool = require("../config/db");

// ==========================
// Dashboard Statistics
// ==========================
const getDashboard = async (req, res) => {
  try {
    const totalMembers = await pool.query(`
      SELECT COUNT(*) AS total
      FROM members
    `);

    const totalTrainers = await pool.query(`
      SELECT COUNT(*) AS total
      FROM trainers
    `);

    const totalPackages = await pool.query(`
      SELECT COUNT(*) AS total
      FROM membership_packages
    `);

    const totalRevenue = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM payments
    `);

    const todayAttendance = await pool.query(`
      SELECT COUNT(*) AS total
      FROM attendance
      WHERE DATE(check_in) = CURRENT_DATE
    `);

    const activeMembers = await pool.query(`
      SELECT COUNT(*) AS total
      FROM attendance
      WHERE check_out IS NULL
    `);

    res.status(200).json({
      totalMembers: Number(totalMembers.rows[0].total),
      totalTrainers: Number(totalTrainers.rows[0].total),
      totalPackages: Number(totalPackages.rows[0].total),
      totalRevenue: Number(totalRevenue.rows[0].total),
      todayAttendance: Number(todayAttendance.rows[0].total),
      activeMembers: Number(activeMembers.rows[0].total),
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};