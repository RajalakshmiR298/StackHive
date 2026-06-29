const mongoose = require("mongoose");

/*
Event Schema includes:
- title: String (required)
- description: String (required)
- category: String (required)
- tags: [String]
- venue: String (required)
- dateTime: Date (required)
- registrationLink: String
- location: String
- organizer: String
- image: String
*/

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },

    tags: [{ type: String }],

    venue: { type: String, required: true },
    location: { type: String },

    dateTime: { type: Date, required: true },

    registrationLink: { type: String },
    organizer: { type: String, trim: true },

    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;