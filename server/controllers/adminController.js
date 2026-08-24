const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==========================
// Register Admin
// ==========================
const registerAdmin = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO admins
      (full_name, email, password)
      VALUES ($1, $2, $3)
      RETURNING admin_id, full_name, email`,
      [full_name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: "Failed to register admin",
      error: error.message,
    });
  }
};

// ==========================
// Login Admin
// ==========================
const loginAdmin = async (req, res) => {
  console.log("========== LOGIN START ==========");

  try {
    const { email, password } = req.body;

    console.log("1. Email:", email);

    const result = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    console.log("2. Database Query Success");
    console.log(result.rows);

    if (result.rows.length === 0) {
      console.log("3. Admin Not Found");

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const admin = result.rows[0];

    console.log("4. Password Checking...");

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("5. Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("6. Creating JWT Token");

    const token = jwt.sign(
      {
        admin_id: admin.admin_id,
        email: admin.email,
      },
      "mysecretkey",
      {
        expiresIn: "1d",
      }
    );

    console.log("7. Login Success");

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:");
    console.error(error);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// ==========================
// Export
// ==========================
module.exports = {
  registerAdmin,
  loginAdmin,
};