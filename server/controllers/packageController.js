const pool = require("../config/db");

// ==========================
// Add Package
// ==========================
const addPackage = async (req, res) => {
    try {
        const {
            package_name,
            duration_months,
            price,
            description
        } = req.body;

        const result = await pool.query(
            `INSERT INTO membership_packages
            (package_name, duration_months, price, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                package_name,
                duration_months,
                price,
                description
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add package",
            error: error.message
        });
    }
};

// ==========================
// Get All Packages
// ==========================
const getAllPackages = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM membership_packages ORDER BY package_id ASC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch packages"
        });
    }
};

// ==========================
// Update Package
// ==========================
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            package_name,
            duration_months,
            price,
            description
        } = req.body;

        const result = await pool.query(
            `UPDATE membership_packages
             SET package_name = $1,
                 duration_months = $2,
                 price = $3,
                 description = $4
             WHERE package_id = $5
             RETURNING *`,
            [
                package_name,
                duration_months,
                price,
                description,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update package",
            error: error.message
        });
    }
};

// ==========================
// Delete Package
// ==========================
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM membership_packages WHERE package_id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json({
            message: "Package deleted successfully",
            package: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete package",
            error: error.message
        });
    }
};

// ==========================
// Export
// ==========================
module.exports = {
    addPackage,
    getAllPackages,
    updatePackage,
    deletePackage
};