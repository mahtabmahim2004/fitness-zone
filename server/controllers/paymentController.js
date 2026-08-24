const pool = require("../config/db");

// ==========================
// Add Payment
// ==========================
const addPayment = async (req, res) => {
  try {
    const { member_id, package_id, amount, payment_method } = req.body;

    const result = await pool.query(
      `INSERT INTO payments
      (member_id, package_id, amount, payment_method)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [member_id, package_id, amount, payment_method]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add payment",
      error: error.message,
    });
  }
};

// ==========================
// Get All Payments
// ==========================
const getAllPayments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
          p.payment_id,
          p.member_id,
          p.package_id,
          m.full_name AS member_name,
          mp.package_name,
          mp.price,
          p.amount,
          p.payment_method,
          p.payment_date
      FROM payments p
      JOIN members m
          ON p.member_id = m.id
      JOIN membership_packages mp
          ON p.package_id = mp.package_id
      ORDER BY p.payment_id ASC
    `);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

// ==========================
// Recent Payments
// ==========================
const getRecentPayments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
          p.payment_id,
          m.full_name AS member_name,
          mp.package_name,
          p.amount,
          p.payment_method,
          p.payment_date
      FROM payments p
      JOIN members m
          ON p.member_id = m.id
      JOIN membership_packages mp
          ON p.package_id = mp.package_id
      ORDER BY p.payment_date DESC, p.payment_id DESC
      LIMIT 5
    `);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch recent payments",
      error: error.message,
    });
  }
};

// ==========================
// Update Payment
// ==========================
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      member_id,
      package_id,
      amount,
      payment_method,
    } = req.body;

    const result = await pool.query(
      `UPDATE payments
       SET member_id = $1,
           package_id = $2,
           amount = $3,
           payment_method = $4
       WHERE payment_id = $5
       RETURNING *`,
      [
        member_id,
        package_id,
        amount,
        payment_method,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update payment",
      error: error.message,
    });
  }
};

// ==========================
// Delete Payment
// ==========================
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM payments WHERE payment_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment deleted successfully",
      payment: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete payment",
      error: error.message,
    });
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getRecentPayments,
  updatePayment,
  deletePayment,
};