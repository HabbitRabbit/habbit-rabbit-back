const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner.middleware");

// POST new goal
router.post("/goals", isAuthenticated, (req, res) => {
    Goal.create(req.body)
    .then((newGoal) => res.status(201).json(newGoal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//UPDATE (PATCH) goal

router.patch("/goals/:goalId", isAuthenticated, isOwner, (req, res) => {
    const {goalId} = req.params
    Goal.findByIdAndUpdate(goalId, req.body, {new: true})
    .then((updatedGoal) => res.status(200).json(updatedGoal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//GET all goals (commented out for performance reasons)
router.get("/goals", isAuthenticated, (req, res) => {
    Goal.find({createdBy: req.payload._id})
    .populate('habits.habit')
    .then((goals) => res.status(200).json(goals))
    .catch(e => res.status(500).json({message: "Error"}))
})

router.get("/goals/:goalId", isAuthenticated, isOwner, (req, res) => {
    const {goalId} = req.params
    Goal.findById(goalId)
    .populate('habits.habit')
    .then((goal) => res.status(200).json(goal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//DELETE goal

router.delete("/goals/:goalId", isAuthenticated, isOwner, (req, res) => {
    const {goalId} = req.params
    Goal.findByIdAndDelete(goalId)
    .then(res.status(204).end())
    .catch(e => res.status(500).json({message: "Error"}))
})

// PATCH to mark goal completed
router.patch("/goals/:goalId/complete", isAuthenticated, isOwner, (req, res) => {
    const { goalId } = req.params;
  
    Goal.findByIdAndUpdate(goalId, { status: "completed" }, { new: true })
      .then((goal) => res.status(200).json(goal))
      .catch((e) => res.status(500).json({ message: "Error completing goal" }));
  });

module.exports = router;