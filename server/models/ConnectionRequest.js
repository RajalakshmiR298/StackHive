const mongoose = require('mongoose');

/*
ConnectionRequest Schema definition will include:
- sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
- receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
- status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
*/

const connectionRequestSchema = new mongoose.Schema(
  {
    // Schema properties will be defined here
  },
  {
    timestamps: true,
  }
);

const ConnectionRequest = mongoose.model(
  'ConnectionRequest',
  connectionRequestSchema
);

module.exports = ConnectionRequest;
