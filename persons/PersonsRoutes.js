const express = require('express');
const router = express.Router();
const personsController = require('./PersonsController');

router.get('/login', personsController.getLoginPage);
router.post('/login', personsController.postLogin);

module.exports = router;