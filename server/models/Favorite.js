const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    title: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);