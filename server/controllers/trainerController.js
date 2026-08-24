const pool = require("../config/db");

// ==========================
// Add Trainer
// ==========================
const addTrainer = async (req, res) => {
    try {
        const {
            trainer_name,
            phone,
            specialization,
            experience,
            salary
        } = req.body;

        const result = await pool.query(
            `INSERT INTO trainers
            (trainer_name, phone, specialization, experience, salary)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                trainer_name,
                phone,
                specialization,
                experience,
                salary
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add trainer",
            error: error.message
        });
    }
};

// ==========================
// Get All Trainers
// ==========================
const getAllTrainers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM trainers ORDER BY trainer_id ASC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch trainers"
        });
    }
};

// ==========================
// Update Trainer
// ==========================
const updateTrainer = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            trainer_name,
            phone,
            specialization,
            experience,
            salary
        } = req.body;

        const result = await pool.query(
            `UPDATE trainers
             SET trainer_name = $1,
                 phone = $2,
                 specialization = $3,
                 experience = $4,
                 salary = $5
             WHERE trainer_id = $6
             RETURNING *`,
            [
                trainer_name,
                phone,
                specialization,
                experience,
                salary,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Trainer not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update trainer",
            error: error.message
        });
    }
};

// ==========================
// Delete Trainer
// ==========================
const deleteTrainer = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM trainers WHERE trainer_id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Trainer not found"
            });
        }

        res.status(200).json({
            message: "Trainer deleted successfully",
            trainer: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete trainer",
            error: error.message
        });
    }
};

// ==========================
// Export
// ==========================
module.exports = {
    addTrainer,
    getAllTrainers,
    updateTrainer,
    deleteTrainer
};