const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner.middleware");

const Habit = require("../models/Habit.model");
const e = require("cors");

// POST new habit /api/habits
router.post("/habits", isAuthenticated, (req, res) => {
    Habit.create(req.body)
    .then((newHabit) => {
        res.status(201).json(newHabit)
    })
    .catch(error => {
        res.status(500).json({message: "Error creating a new habit"})
    })
})

// GET all habits /api/habit
router.get("/habits", isAuthenticated, (req, res) => {
    Habit.find({createdBy: req.payload._id})
    //.populate("goal") --- don't know if it's necessary
    .then((habits) => {
        res.status(200).json(habits)
    })
    .catch(error => {
        res.status(500).json({message: "Error getting the habit"})
    })
})

// GET specific habits 
router.get("/habits/:habitId", isAuthenticated, isOwner, (req, res) => {
    const {habitId} = req.params

    Habit.findById(habitId)
    //.populate("goal")
    .then((habits) => {
        res.status(200).json(habits)
    })
    .catch(e => {
        res.status(500).json({message: "Error getting the habit", e})
    })
})

// UPDATE (PATCH) habits
router.patch("/habits/:habitId", isAuthenticated, isOwner, (req, res) => {
    const {habitId} = req.params

    console.log("habit id:",habitId)

    Habit.findByIdAndUpdate(habitId, req.body, {new: true})
    .then((updatedHabit) => {
        res.status(200).json(updatedHabit)
    })
    .catch(error => {
        res.status(500).json({message: "Error updating the habbit"})
    })
})

// DELETE /api/habits/:habitId
router.delete("/habits/:habitId", isAuthenticated, isOwner, (req, res) => {
    const {habitId} = req.params

    Habit.findByIdAndDelete(habitId)
    .then(res.status(204).end())
    .catch(error => res.status(500).json({message: "Error deleting the habit"}))
})

/*PATCH to update habit: completed
router.patch("/habits/:habitId/complete", isAuthenticated, isOwner, (req, res) => {
    const { habitId } = req.params;
    const { date } = req.body; // Date when the habit was completed
  
    Habit.findById(habitId)
      .then((habit) => {
        if (!habit.completedDates) {
          habit.completedDates = [];
        }
        if (!habit.completedDates.includes(date)) {
          habit.completedDates.push(date);
          habit.achievedCount += 1;
        }
        return habit.save();
      })
      .then((updatedHabit) => res.status(200).json(updatedHabit))
      .catch((e) => res.status(500).json({ message: "Error updating habit" }));
  }); 
  */

  // PATCH update check status
  router.patch("/habits/:habitId/check", isAuthenticated, isOwner, (req, res) => {
    const { habitId } = req.params;
    const { check } = req.body; // Extract the boolean value from the request body
  
    Habit.findByIdAndUpdate(habitId, { check: check }, { new: true })
      .then((habit) => {
        res.status(200).json(habit);
      })
      .catch(e => res.status(500).json({ message: "Error updating the check" }));
  });

module.exports = router;