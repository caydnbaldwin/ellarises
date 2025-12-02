const express = require('express');
const router = express.Router();
const personsController = require('./PersonsController');

router.get('/signup', personsController.getSignupPage);
router.post('/signup', personsController.postSignup);
router.get('/login', personsController.getLoginPage);
router.post('/login', personsController.postLogin);
router.post('/logout', personsController.postLogout);

module.exports = router;