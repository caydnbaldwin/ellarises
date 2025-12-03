const express = require('express');
const router = express.Router();
const milestonesController = require('./MilestonesController');

router.get('/dashboard', milestonesController.getDashboardPage);

module.exports = router;