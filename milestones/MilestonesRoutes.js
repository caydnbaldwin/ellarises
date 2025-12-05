const express = require('express');
const router = express.Router();
const milestonesController = require('./MilestonesController');

router.get('/milestones', milestonesController.getMilestonesPage);

module.exports = router;