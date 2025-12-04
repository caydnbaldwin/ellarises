const surveysService = require('./SurveysService');

class SurveysController {
  async getSurveys(req, res) {
    const surveys = await surveysService.getSurveys();
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  }
};

module.exports = new SurveysController();