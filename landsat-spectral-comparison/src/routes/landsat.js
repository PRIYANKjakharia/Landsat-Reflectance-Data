const express = require('express');
const router = express.Router();
const landsatController = require('../controllers/landsatController');

router.get('/upcoming-passes', landsatController.getUpcomingPasses);
router.get('/latest-scenes', landsatController.getLatestScenes);
router.post('/update-notifications/:userId/:locationId', landsatController.updateNotifications);

module.exports = router;