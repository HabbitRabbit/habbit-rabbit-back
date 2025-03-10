const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    name: {type: String, required: true},
    habits: [{
        habit: {type: Schema.Types.ObjectId, ref: "Habit", required: true },
        achievedCount: {type: Number, default: 0}
    }],
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: { type: String, enum: ["active", "completed"], default: "active" }
  },
  {
    timestamps: true
  }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
