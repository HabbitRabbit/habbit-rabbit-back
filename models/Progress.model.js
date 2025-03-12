const {Schema, model} = require("mongoose")

const habitProgressSchema = new Schema(
    {
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
    achievedCount: { type: Number, default: 0 },
    completedDates: [{ type: Date }]
  }
);
  
  // Use this model to track how many times a habit has been completed within each goal context.

  const HabitProgress = model("HabitProgress", habitProgressSchema);
  
  module.exports = Goal;