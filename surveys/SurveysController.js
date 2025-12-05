const surveysService = require('./SurveysService');

class SurveysController {
  async getSurveys(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveys();
        res.render('surveys', {errorMessage: null, session: req.session, surveys: surveys});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null})
      }
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  async getSurveyEmail(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveysEmail(req.params.email);
        res.render('surveys', {errorMessage: null, session: req.session, surveys: surveys});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  async getSurveyEventname(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveysEventname(req.params.eventname);
        res.render('surveys', {errorMessage: null, session: req.session, surveys: surveys});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    }
  };

  async getSurveyEventtype(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const surveys = await surveysService.getSurveysEventtype(req.params.eventtype);
        res.render('surveys', {errorMessage: null, session: req.session, surveys: surveys});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    }
  };

  async deleteSurvey(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const {personid, eventstart, eventid} = req.params;
        const surveys = await surveysService.deleteSurvey(personid, eventstart, eventid);
        res.status(204);
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };
};

module.exports = new SurveysController();