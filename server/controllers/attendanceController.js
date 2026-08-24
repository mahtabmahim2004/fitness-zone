const pool = require("../config/db");

// ==========================
// Check In
// ==========================
const checkIn = async (req, res) => {
  try {
    const { member_id } = req.body;

    if (!member_id) {
      return res.status(400).json({
        message: "Member ID is required.",
      });
    }

    // Check if member exists
    const member = await pool.query(
      "SELECT id, full_name FROM members WHERE id = $1",
      [member_id]
    );

    if (member.rows.length === 0) {
      return res.status(404).json({
        message: "Member not found.",
      });
    }

    // Check if already checked in
    const existing = await pool.query(
      `SELECT attendance_id
       FROM attendance
       WHERE member_id = $1
       AND check_out IS NULL`,
      [member_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        message: "Member is already checked in.",
      });
    }

    // Insert Attendance
    const result = await pool.query(
      `INSERT INTO attendance (member_id)
       VALUES ($1)
       RETURNING *`,
      [member_id]
    );

    return res.status(201).json({
      message: "Check in successful.",
      attendance: result.rows[0],
    });

  } catch (error) {
    console.error("Check In Error:", error);

    return res.status(500).json({
      message: "Failed to check in.",
      error: error.message,
    });
  }
};

// ==========================
// Check Out
// ==========================
const checkOut = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE attendance
       SET check_out = CURRENT_TIMESTAMP
       WHERE attendance_id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Attendance not found.",
      });
    }

    return res.status(200).json({
      message: "Check out successful.",
      attendance: result.rows[0],
    });

  } catch (error) {
    console.error("Check Out Error:", error);

    return res.status(500).json({
      message: "Failed to check out.",
      error: error.message,
    });
  }
};

// ==========================
// Get All Attendance
// ==========================
const getAttendance = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.attendance_id,
        a.member_id,
        m.full_name,
        a.check_in,
        a.check_out
      FROM attendance a
      INNER JOIN members m
        ON a.member_id = m.id
      ORDER BY a.check_in DESC
    `);

    return res.status(200).json(result.rows);

  } catch (error) {
    console.error("Get Attendance Error:", error);

    return res.status(500).json({
      message: "Failed to fetch attendance.",
      error: error.message,
    });
  }
};

// ==========================
// Recent Attendance
// ==========================
const getRecentAttendance = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.attendance_id,
        m.full_name AS member_name,
        a.check_in,
        a.check_out,
        CASE
          WHEN a.check_out IS NULL THEN 'Checked In'
          ELSE 'Checked Out'
        END AS status
      FROM attendance a
      INNER JOIN members m
        ON a.member_id = m.id
      ORDER BY a.check_in DESC
      LIMIT 5
    `);

    return res.status(200).json(result.rows);

  } catch (error) {
    console.error("Recent Attendance Error:", error);

    return res.status(500).json({
      message: "Failed to fetch recent attendance.",
      error: error.message,
    });
  }
};

// ==========================
// Delete Attendance
// ==========================
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM attendance
       WHERE attendance_id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Attendance not found.",
      });
    }

    return res.status(200).json({
      message: "Attendance deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Attendance Error:", error);

    return res.status(500).json({
      message: "Failed to delete attendance.",
      error: error.message,
    });
  }
};

// ==========================
// Export
// ==========================
module.exports = {
  checkIn,
  checkOut,
  getAttendance,
  getRecentAttendance,
  deleteAttendance,
};