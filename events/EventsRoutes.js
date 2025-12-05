const express = require('express');
const router = express.Router();
const eventsController = require('./EventsController');

router.get('/events', eventsController.getEventsPage);
router.post('/event', eventsController.postEvent);

module.exports = router;