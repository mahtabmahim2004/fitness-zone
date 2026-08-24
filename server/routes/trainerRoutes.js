const express = require("express");
const router = express.Router();

const {
    addTrainer,
    getAllTrainers,
    updateTrainer,
    deleteTrainer
} = require("../controllers/trainerController");

// Get All Trainers
router.get("/", getAllTrainers);

// Add Trainer
router.post("/", addTrainer);

// Update Trainer
router.put("/:id", updateTrainer);

// Delete Trainer
router.delete("/:id", deleteTrainer);

module.exports = router;