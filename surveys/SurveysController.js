const surveysService = require('./SurveysService');

class SurveysController {
  async getSurveys(req, res) {
    const surveys = await surveysService.getSurveys();
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  }

  async getSurveyEmail(req, res) {
    const surveys = await surveysService.getSurveysEmail(req.params.email);
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  }

  async getSurveyEventname(req, res) {
    const surveys = await surveysService.getSurveysEventname(req.params.eventname);
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  }

  async getSurveyEventtype(req, res) {
    const surveys = await surveysService.getSurveysEventtype(req.params.eventtype);
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  }
};

module.exports = new SurveysController();