const surveysService = require('./SurveysService');

class SurveysController {
  async getSurveys(req, res) {
    const surveys = await surveysService.getSurveys();
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  };

  async getSurveyEmail(req, res) {
    const surveys = await surveysService.getSurveysEmail(req.params.email);
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  };

  async getSurveyEventname(req, res) {
    const surveys = await surveysService.getSurveysEventname(req.params.eventname);
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  };

  async getSurveyEventtype(req, res) {
    const surveys = await surveysService.getSurveysEventtype(req.params.eventtype);
    res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
  };

  async deleteSurvey(req, res) {
    const {personid, eventstart, eventid} = req.params;
    const surveys = await surveysService.deleteSurvey(personid, eventstart, eventid);
    console.log('SurveysController -> surveys:', surveys);
  }
};

module.exports = new SurveysController();