const User = require("../models/User");
const ConnectionRequest = require("../models/ConnectionRequest");
const { matchProfiles } = require("../utils/matchingAlgorithm");
// Connection Controller Placeholders

// @desc    Send a connection request to another student
// @route   POST /api/connections/request
// @access  Private
const sendConnectionRequest = async (req, res, next) => {
  try {
    const receiverId = req.body.receiverId;

    // Cannot send request to yourself
    if (receiverId === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot send a request to yourself.",
      });
    }

    // Check receiver exists
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check if request already exists
    const existingRequest = await ConnectionRequest.findOne({
      sender: req.user._id,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already sent.",
      });
    }

    // Create request
    const request = await ConnectionRequest.create({
      sender: req.user._id,
      receiver: receiverId,
    });

    res.status(201).json({
      message: "Connection request sent successfully.",
      request,
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Accept a connection request
// @route   PUT /api/connections/accept/:requestId
// @access  Private
const acceptConnectionRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Connection request not found.",
      });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to accept this request.",
      });
    }

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(request.sender, {
      $addToSet: {
        connections: request.receiver,
      },
    });

    await User.findByIdAndUpdate(request.receiver, {
      $addToSet: {
        connections: request.sender,
      },
    });

    res.status(200).json({
      message: "Connection request accepted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Reject a connection request
// @route   PUT /api/connections/reject/:requestId
// @access  Private
const rejectConnectionRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Connection request not found.",
      });
    }

    // Only the receiver can reject
    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to reject this request.",
      });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      message: "Connection request rejected successfully.",
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get user's active connections
// @route   GET /api/connections
// @access  Private
const getConnections = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate(
        "connections",
        "name email location skills interests hobbies profileImage"
      );

    res.status(200).json(user.connections);

  } catch (error) {
    next(error);
  }
};

// @desc    Get user's incoming/outgoing connection requests
// @route   GET /api/connections/requests
// @access  Private
const getConnectionRequests = async (req, res, next) => {
  try {
    const requests = await ConnectionRequest.find({
      receiver: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "name email location skills interests hobbies profileImage"
    );

    res.status(200).json(requests);

  } catch (error) {
    next(error);
  }
};

const getMatches = async (req, res, next) => {
  try {
    // Logged in user
    const currentUser = await User.findById(req.user._id);

    // Get every user except the logged in user
    const users = await User.find({
      _id: { $ne: req.user._id },
    });

    // Calculate match percentage
    const matches = matchProfiles(currentUser, users);

    const filtered = matches.filter(
    user =>
        !currentUser.connections.includes(user._id)
);

res.json(filtered);

    res.status(200).json(matches);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getConnections,
  getMatches,
  getConnectionRequests,
};
