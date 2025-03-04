const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Goal = require("../models/Goal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner.middleware");

// POST new goal
router.post("/goal", isAuthenticated, (req, res) => {
    Goal.create(req.body)
    .then((newGoal) => res.status(201).json(newGoal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//UPDATE (PUT) goal

router.put("/goal/:id", isAuthenticated, isOwner("goal"), (req, res) => {
    const {id} = req.params
    Goal.findByIdAndUpdate(id, req.body, {new: true})
    .then((updatedGoal) => res.status(200).json(updatedGoal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//GET all goals and then get specific goal
router.get("/goal", isAuthenticated, isOwner("goal"), (req, res) => {
    Goal.find()
    .then((goals) => res.status(200).json(goals))
    .catch(e => res.status(500).json({message: "Error"}))
})

router.get("/goal/:id", isAuthenticated, isOwner("goal"), (req, res) => {
    const {id} = req.params
    Goal.findById(id)
    .then((goal) => res.status(200).json(goal))
    .catch(e => res.status(500).json({message: "Error"}))
})

//DELETE goal

router.delete("/goal/:id", isAuthenticated, isOwner("goal"), (req, res) => {
    const {id} = req.params
    Goal.findByIdAndDelete(id)
    .then(res.status(204).end())
    .catch(e => res.status(500).json({message: "Error"}))
})

module.exports = router;