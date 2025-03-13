const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner.middleware");

// POST new goal
router.post("/goals", isAuthenticated, (req, res) => {
  Goal.create(req.body)
    .then((newGoal) => res.status(201).json(newGoal))
    .catch((e) => res.status(500).json({ message: "Error" }));
});

//UPDATE (PATCH) goal

router.patch("/goals/:goalId", isAuthenticated, isOwner, (req, res) => {
  const { goalId } = req.params;
  Goal.findByIdAndUpdate(goalId, req.body, { new: true })
    .populate("habits.habit")
    .then((updatedGoal) => res.status(200).json(updatedGoal))
    .catch((e) => res.status(500).json({ message: "Error" }));
});

//PATCH adds one to habit achieved count

router.patch("/goals/checkHabit/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;
    const { goal } = req.body;
  
    const updated = await Goal.findByIdAndUpdate(goalId, goal, {new:true});
    
    return res.status(200).json({ msg: "should be good" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//GET all goals
router.get("/goals", isAuthenticated, (req, res) => {
  Goal.find({ createdBy: req.payload._id })
    .populate("habits.habit")
    .then((goals) => {
      const goalsWithCalculatedFields = goals.map((goal) => {
        const { requiredAchievedCount, remainingAchievedCount } =
          goal.calculateRequiredAchievedCount();
        return {
          ...goal.toObject(), // Convert Mongoose document to plain object
          requiredAchievedCount,
          remainingAchievedCount,
        };
      });

      res.status(200).json(goalsWithCalculatedFields);
    })
    .catch((e) =>
      res
        .status(500)
        .json({ message: "Error fetching goals", error: e.message })
    );
});

router.get("/goals/:goalId", isAuthenticated, isOwner, (req, res) => {
  const { goalId } = req.params;
  Goal.findById(goalId)
    .populate("habits.habit")
    .then((goal) => res.status(200).json(goal))
    .catch((e) => res.status(500).json({ message: "Error" }));
});

//DELETE goal

router.delete("/goals/:goalId", isAuthenticated, isOwner, (req, res) => {
  const { goalId } = req.params;
  Goal.findByIdAndDelete(goalId)
    .then(res.status(204).end())
    .catch((e) => res.status(500).json({ message: "Error" }));
});

// PATCH to mark goal completed
router.patch(
  "/goals/:goalId/complete",
  isAuthenticated,
  isOwner,
  (req, res) => {
    const { goalId } = req.params;

    Goal.findByIdAndUpdate(goalId, { status: "completed" }, { new: true })
      .then((goal) => res.status(200).json(goal))
      .catch((e) => res.status(500).json({ message: "Error completing goal" }));
  }
);

module.exports = router;
