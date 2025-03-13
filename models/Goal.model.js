const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    name: { type: String, required: true },
    habits: [
      {
        habit: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
        achievedCount: { type: Number, default: 0 },
      },
    ],
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      enum: ["#A1C6EA", "#F7A1C4", "#88E7B5", "#EAB0FF", "#FFB347"], // pastel blue, pink, green, purple, orange
      default: "#A1C6EA", // pastel blue
    },
    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  {
    timestamps: true,
  }
);

// Add the method here
goalSchema.methods.calculateRequiredAchievedCount = function () {
  const now = new Date();
  const totalDays = Math.ceil(
    (this.endDate - this.startDate) / (1000 * 60 * 60 * 24)
  );
  const remainingDays = Math.ceil((this.endDate - now) / (1000 * 60 * 60 * 24));

  let frequencyDays;
  switch (this.habits[0].habit.frequency) {
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

  const requiredAchievedCount = Math.floor(totalDays / frequencyDays);
  const remainingAchievedCount = Math.floor(remainingDays / frequencyDays);

  return { requiredAchievedCount, remainingAchievedCount };
};

const Goal = model("Goal", goalSchema);

module.exports = Goal;
