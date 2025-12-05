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
router.get('/persons', personsController.getPersons);
router.get('/mi/:personid', personsController.getPerson);
router.delete('/mi/:personid', personsController.deletePerson);
router.get('/logout', personsController.getLogout);

module.exports = router;