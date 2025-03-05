const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    name: {type: String, required: true},
    habits: [{
        habit: {type: Schema.Types.ObjectId, ref: "Habit"},
        achievedCount: {type: Number, default: 0}
    }],
    targetFrequency: {type: Number, default: 0},
    period: {type: String, required: true, enum: ["daily", "weekly", "monthly"]},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

  },
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
