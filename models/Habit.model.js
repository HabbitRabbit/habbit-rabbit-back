const { Schema, model } = require("mongoose");

const habitSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "The name of the habit is required!"]
        },
        description: {
            type: String
        },
        color: {
            type: String,
            enum: ["#0000FF", "#FF0000", "#008000", "#FFC0CB", "#FFFF00"],
            default: "blue-100"
        },
        frequency: {
            type: String,
            enum: ["daily", "two-days", "three-days"],
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reminder: {
            type: Date,
            default: Date.now
        },
        check: { 
            type: Boolean, 
            default: false }
    }
);

// Add the method here
habitSchema.methods.shouldBeUnchecked = function (lastCheckedDate) {
    const now = new Date();
  
    let frequencyDays;
    switch (this.frequency) {
      case "daily":
        frequencyDays = 1;
        break;
      case "two-days":
        frequencyDays = 2;
        break;
      case "three-days":
        frequencyDays = 3;
        break;
      default:
        frequencyDays = 1;
    }
  
    const nextCheckDate = new Date(lastCheckedDate);
    nextCheckDate.setDate(nextCheckDate.getDate() + frequencyDays);
  
    return now >= nextCheckDate;
  };

const Habit = model("Habit", habitSchema);

module.exports = Habit;
