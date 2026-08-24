const express = require("express");
const router = express.Router();

const {
  // PDF Reports
  downloadMembersReport,
  downloadPaymentsReport,
  downloadAttendanceReport,
  downloadDashboardReport,

  // Excel Reports
  downloadMembersExcelReport,
  downloadPaymentsExcelReport,
  downloadAttendanceExcelReport,
  downloadDashboardExcelReport,
} = require("../controllers/reportController");

// ==========================
// PDF Routes
// ==========================
router.get("/members", downloadMembersReport);
router.get("/payments", downloadPaymentsReport);
router.get("/attendance", downloadAttendanceReport);
router.get("/dashboard", downloadDashboardReport);

// ==========================
// Excel Routes
// ==========================
router.get("/members/excel", downloadMembersExcelReport);
router.get("/payments/excel", downloadPaymentsExcelReport);
router.get("/attendance/excel", downloadAttendanceExcelReport);
router.get("/dashboard/excel", downloadDashboardExcelReport);

module.exports = router;