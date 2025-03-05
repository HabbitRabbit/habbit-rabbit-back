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

router.patch("/goals/:id", isAuthenticated, isOwner, (req, res) => {
    const {id} = req.params
    Goal.findByIdAndUpdate(id, req.body, {new: true})
    .then((updatedGoal) => res.status(200).json(updatedGoal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//GET all goals and then get specific goal
router.get("/goals", isAuthenticated, isOwner, (req, res) => {
    Goal.find()
    .then((goals) => res.status(200).json(goals))
    .catch(e => res.status(500).json({message: "Error"}))
})

router.get("/goals/:id", isAuthenticated, isOwner, (req, res) => {
    const {id} = req.params
    Goal.findById(id)
    .then((goal) => res.status(200).json(goal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//DELETE goal

router.delete("/goals/:id", isAuthenticated, isOwner, (req, res) => {
    const {id} = req.params
    Goal.findByIdAndDelete(id)
    .then(res.status(204).end())
    .catch(e => res.status(500).json({message: "Error"}))
})

module.exports = router;