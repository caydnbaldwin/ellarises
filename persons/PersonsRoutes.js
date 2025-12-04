const express = require('express');
const router = express.Router();
const personsController = require('./PersonsController');

router.get('/signup', personsController.getSignupPage);
router.post('/signup', personsController.postSignup);
router.get('/login', personsController.getLoginPage);
router.post('/login', personsController.postLogin);
router.get('/onboarding', personsController.getOnboardingPage);
router.post('/onboarding', personsController.postOnboarding);
router.get('/home', personsController.getHomePage);
router.get('/logout', personsController.getLogout);

module.exports = router;