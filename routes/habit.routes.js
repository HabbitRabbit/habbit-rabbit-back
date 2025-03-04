const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner.middleware");

const Habit = require("../models/Habit.model")

// POST new habit /api/habit
router.post("/habit", isAuthenticated, (req, res) => {
    Habit.create(req.body)
    .then((newHabit) => {
        res.status(201).json(newHabit)
    })
    .catch(error => {
        res.status(500).json({message: "Error creating a new habit"})
    })
})

// GET all habits /api/habit
router.get("/habit", isAuthenticated, (req, res) => {
    Habit.find()
    //.populate("goal") --- don't know if it's necessary
    .then((habits) => {
        res.status(200).json(habits)
    })
    .catch(error => {
        res.status(500).json({message: "Error getting the habit"})
    })
})

// GET specific habit 
router.get("/habit/:habitId", isAuthenticated, (req, res) => {
    const {habitId} = req.params

    Habit.findById(habitId)
    //.populate("goal") --- don't know if it's necessary
    .then((habits) => {
        res.status(200).json(habits)
    })
    .catch(error => {
        res.status(500).json({message: "Error getting the habit"})
    })
})

// UPDATE (PUT) habit
router.put("/habit/:habitId", isAuthenticated, isOwner("habit"), (req, res) => {
    const {habitId} = req.params

    Habit.findByIdAndUpdate(habitId, req.body, {new: true})
    .then((updatedHabit) => {
        res.status(200).json(updatedHabit)
    })
    .catch(error => {
        res.status(500).json({message: "Error updating the habit"})
    })
})

// DELETE /api/habit/:habitId
router.delete("/habit/:habitId", isAuthenticated, isOwner("habit"), (req, res) => {
    const {habitId} = req.params

    Habit.findByIdAndDelete(habitId)
    .then(res.status(204).end())
    .catch(error => res.status(500).json({message: "Error deleting the habit"}))
})

module.exports = router;