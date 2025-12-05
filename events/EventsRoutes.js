const express = require('express');
const router = express.Router();
const eventsController = require('./EventsController');

router.get('/events', eventsController.getEventsPage);

module.exports = router;