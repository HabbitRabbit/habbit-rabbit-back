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
            default: "blue-100"
        },
        frequency: {
            type: String,
            enum: ["daily", "every two days", "every three days"],
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
        }
       
    }
);

const Habit = model("Habit", habitSchema);

module.exports = Habit;
