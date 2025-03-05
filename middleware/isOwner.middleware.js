const Habit = require("../models/Habit.model"); 
const Goal = require("../models/Goal.model")


const isOwner = async (req, res, next) => {
    console.log("works! 2")
    
    
    const habitId = req.params.habitId; // Get the resource ID from the request params
    const goalId = req.params.goalId // Get the resource ID from the request params
    console.log("received id:",habitId || goalId)
  
    try {
        let resource;

        // Find the resource based on the req.params.id (Habit or Goal)
        if(habitId){
            const findedHabit = await Habit.findById(habitId)
            console.log("finded habit:",findedHabit)
            resource = findedHabit
        } 
        else if (goalId){
            const findedGoal = await Goal.findById(goalId)
            console.log("finded goal:",findedGoal)
            resource = findedGoal
        }


        // If no resource is found, return a 404 error
        if (!resource) {
         return res.status(404).json({ message: "no collection found" });
        }



     // Compare the creator's ID with the logged-in user's ID
     if (resource.createdBy.toString() !== req.payload._id) {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

       
        console.log("you can update the collection!")
        // If they match, proceed with the request
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = isOwner;