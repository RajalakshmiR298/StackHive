const mongoose = require('mongoose');

/*
Event Schema definition will include:
- title: { type: String, required: true }
- description: { type: String, required: true }
- category: { type: String, required: true }
- tags: [{ type: String }]
- venue: { type: String, required: true }
- dateTime: { type: Date, required: true }
- registrationLink: { type: String }
- location: { type: String }
*/

const eventSchema = new mongoose.Schema(
  {
    // Schema properties will be defined here
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
