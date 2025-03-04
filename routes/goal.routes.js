const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Goal = require("../models/Goal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");



module.exports = router;