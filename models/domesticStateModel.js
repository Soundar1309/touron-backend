const mongoose = require("mongoose");

const domesticStateSchema = mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
    },
    aboutState: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    bestPlaces: {
      type: String,
    },
    bestTimeToVisit: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("State", domesticStateSchema);
