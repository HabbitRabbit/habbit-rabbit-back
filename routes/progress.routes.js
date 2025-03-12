const express = require("express");
const router = express.Router();
const Progress = require("../models/Goal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner.middleware");

// GET progress for all goals
router.get("/progress", isAuthenticated, async (req, res) => {
    try {
      const progressData = await Progress.find({ userId: req.payload._id }).populate('habitId').populate('goalId');
      res.status(200).json(progressData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress data", error: error.message });
    }
  });

// Route to create a progress record
router.post("/progress", isAuthenticated, (req, res) => {
    const { habitId, goalId, userId } = req.body;
  
    // Validate the incoming data
    if (!habitId || !goalId || !userId) {
      return res.status(400).json({ message: "Missing required fields." });
    }
  
    // Check if a progress record already exists
    Progress.findOne({ habitId, goalId, userId })
      .then(existingProgress => {
        if (existingProgress) {
          return res.status(400).json({ message: "Progress record already exists." });
        }
  
        // Create new progress record
        return Progress.create({
          habitId,
          goalId,
          userId,
          achievedCount: 0,
          completedDates: []
        });
      })
      .then(newProgress => {
        res.status(201).json(newProgress);
      })
      .catch(error => {
        console.error("Error creating progress:", error);
        res.status(500).json({ message: "Error creating progress", error: error.message });
      });
  });

  module.exports = router