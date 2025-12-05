const surveysService = require('./SurveysService');

class SurveysController {
  async getSurveys(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveys();
        res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.'})
      }
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };

  async getSurveyEmail(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveysEmail(req.params.email);
        res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };

  async getSurveyEventname(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveysEventname(req.params.eventname);
        res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    }
  };

  async getSurveyEventtype(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveysEventtype(req.params.eventtype);
        res.render('surveys', {errorMessage: null, surveys: surveys, person: req.session.person});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    }
  };

  async deleteSurvey(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const {personid, eventstart, eventid} = req.params;
        const surveys = await surveysService.deleteSurvey(personid, eventstart, eventid);
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };
};

module.exports = new SurveysController();