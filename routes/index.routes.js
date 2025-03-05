const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Importing all routes here
const authRoutes = require('./auth.routes');
const habitRoutes = require('./habit.routes');
const goalRoutes = require('./goal.routes');

// Mounting routes with prefix /api
router.use('/api', authRoutes);
router.use('/api', habitRoutes);
router.use('/api', goalRoutes);


module.exports = router;
