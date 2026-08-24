const express = require("express");
const router = express.Router();

const {
    addPackage,
    getAllPackages,
    updatePackage,
    deletePackage
} = require("../controllers/packageController");

// Get All Packages
router.get("/", getAllPackages);

// Add Package
router.post("/", addPackage);

// Update Package
router.put("/:id", updatePackage);

// Delete Package
router.delete("/:id", deletePackage);

module.exports = router;