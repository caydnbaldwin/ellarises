const express = require('express');
const router = express.Router();
const surveysController = require('./SurveysController');

router.get('/surveys', surveysController.getSurveys);

module.exports = router;