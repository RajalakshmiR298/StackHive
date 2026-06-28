const express = require('express');
const router = express.Router();
const {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getConnections,
  getConnectionRequests,
} = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/request', sendConnectionRequest);
router.put('/accept/:requestId', acceptConnectionRequest);
router.put('/reject/:requestId', rejectConnectionRequest);
router.get('/', getConnections);
router.get('/requests', getConnectionRequests);

module.exports = router;
