const personsService = require('./PersonsService');

class PersonsController {
  getSignupPage(req, res) {
    res.render('signup', {errorMessage: null});
  };

  async postSignup(req, res) {
    try {
      const person = await personsService.postSignup(req.body);
      req.session.isLoggedIn = true;
      req.session.person = person;
      res.redirect('/persons/onboarding');
    } catch (error) {
      res.status(500).render('signup', {errorMessage: error});
    };
  };

  getLoginPage(req, res) {
    res.render('login', {errorMessage: null});
  };

  async postLogin(req, res) {
    try {
      const person = await personsService.postLogin(req.body);
      req.session.isLoggedIn = true;
      req.session.person = person;
      if (person.firstname) {
        res.render('home', {errorMessage: null, person: person});
      } else {
        res.redirect('/persons/onboarding');
      };
    } catch (error) {
      res.status(500).render('login', {errorMessage: error});
    };
  };

  async getOnboardingPage(req, res) {
    try {
      const {states, fieldsOfInterest} = await personsService.getOnboardingPage();
      res.render('onboarding', {errorMessage: null, states: states, fieldsOfInterest: fieldsOfInterest});
    } catch (error) {
      res.status(500).render('login', {errorMessage: error});
    }
  };

  async postOnboarding(req, res) {
    try {
      const person = await personsService.postOnboarding(req.session.person.personid, req.body);
      req.session.person = person;
      res.redirect('/persons/home');
    } catch (error) {
      res.status(500).render('login', {errorMessage: error});
    }
  };

  getHomePage(req, res) {
    res.render('home', {errorMessage: null, person: req.session.person});
  };

  postLogout(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  };
};

module.exports = new PersonsController();