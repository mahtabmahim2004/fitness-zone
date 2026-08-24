const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

// ==========================
// Test Route
// ==========================
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Attendance Route Working",
  });
});

// ==========================
// Recent Attendance
// ==========================
router.get("/recent", attendanceController.getRecentAttendance);

// ==========================
// Get All Attendance
// ==========================
router.get("/", attendanceController.getAttendance);

// ==========================
// Check In
// ==========================
router.post("/checkin", attendanceController.checkIn);

// ==========================
// Check Out
// ==========================
router.put("/checkout/:id", attendanceController.checkOut);

// ==========================
// Delete Attendance
// ==========================
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;