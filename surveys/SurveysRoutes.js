const express = require('express');
const router = express.Router();
const surveysController = require('./SurveysController');

router.get('/surveys', surveysController.getSurveys);
router.get('/email/:email', surveysController.getSurveyEmail);
router.get('/eventname/:eventname', surveysController.getSurveyEventname);
router.get('/eventtype/:eventtype', surveysController.getSurveyEventtype);
router.delete('/:personid/:eventstart/:eventid', surveysController.deleteSurvey);

module.exports = router;