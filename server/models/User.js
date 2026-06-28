const mongoose = require('mongoose');

/*
User Schema definition will include:
- name: { type: String, required: true }
- email: { type: String, required: true, unique: true }
- password: { type: String, required: true }
- skills: [{ type: String }]
- interests: [{ type: String }]
- hobbies: [{ type: String }]
- location: { type: String }
- favoriteEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
- connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
*/

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: [{ type: String }],
    interests: [{ type: String }],
    hobbies: [{ type: String }],
    location: { type: String },
    favoriteEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
