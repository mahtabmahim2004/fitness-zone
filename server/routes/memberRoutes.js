const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
    addMember,
    getAllMembers,
    updateMember,
    deleteMember
} = require("../controllers/memberController");

// Get All Members (Protected)
router.get("/", verifyToken, getAllMembers);

// Add Member (Protected)
router.post("/", verifyToken, addMember);

// Update Member (Protected)
router.put("/:id", verifyToken, updateMember);

// Delete Member (Protected)
router.delete("/:id", verifyToken, deleteMember);

module.exports = router;