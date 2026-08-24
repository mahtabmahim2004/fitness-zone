const express = require("express");
const router = express.Router();

const {
  addPayment,
  getAllPayments,
  getRecentPayments,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

// Recent Payments
router.get("/recent", getRecentPayments);

// All Payments
router.get("/", getAllPayments);

// Add Payment
router.post("/", addPayment);

// Update Payment
router.put("/:id", updatePayment);

// Delete Payment
router.delete("/:id", deletePayment);

module.exports = router;