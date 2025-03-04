const Habit = require("../models/Habit.model"); 
const Goal = require("../models/Goal.model")


const isOwner = (model) => async (req, res, next) => {
    const { id } = req.params; // Get the resource ID from the request params

    try {
        let resource;

        // Find the resource based on the model type (Habit or Goal)
        if (model === "habit") {
            resource = await Habit.findById(id);
        } else if (model === "goal") {
            resource = await Goal.findById(id);
        }

        // If no resource is found, return a 404 error
        if (!resource) {
            return res.status(404).json({ message: "not found" });
        }

        // Compare the creator's ID with the logged-in user's ID
        if (resource.createdBy.toString() !== req.payload.userId) {
            return res.status(403).json({ message: "You do not have permission to access this resource" });
        }

        // If they match, proceed with the request
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = isOwner;