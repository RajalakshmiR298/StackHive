const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    hobbies: [
      {
        type: String,
        trim: true,
      },
    ],

    location: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    favoriteEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);