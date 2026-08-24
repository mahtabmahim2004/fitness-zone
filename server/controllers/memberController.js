const pool = require("../config/db");

// ==========================
// Add Member
// ==========================
const addMember = async (req, res) => {
    console.log("Request Body:", req.body);

    try {
        const {
            full_name,
            phone,
            age,
            gender,
            membership_type
        } = req.body;

        const result = await pool.query(
            `INSERT INTO members
            (full_name, phone, age, gender, membership_type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [full_name, phone, age, gender, membership_type]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add member",
            error: error.message
        });
    }
};

// ==========================
// Get All Members
// ==========================
const getAllMembers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM members ORDER BY id ASC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch members"
        });
    }
};

// ==========================
// Update Member
// ==========================
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            full_name,
            phone,
            age,
            gender,
            membership_type
        } = req.body;

        const result = await pool.query(
            `UPDATE members
             SET full_name = $1,
                 phone = $2,
                 age = $3,
                 gender = $4,
                 membership_type = $5
             WHERE id = $6
             RETURNING *`,
            [
                full_name,
                phone,
                age,
                gender,
                membership_type,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update member",
            error: error.message
        });
    }
};

// ==========================
// Delete Member
// ==========================
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM members WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json({
            message: "Member deleted successfully",
            member: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete member",
            error: error.message
        });
    }
};

// ==========================
// Export
// ==========================
module.exports = {
    addMember,
    getAllMembers,
    updateMember,
    deleteMember
};