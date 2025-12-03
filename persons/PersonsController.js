const personsService = require('./PersonsService');

class PersonsController {
  getSignupPage(req, res) {
    res.render('../views/signup', {errorMessage: null});
  };

  async postSignup(req, res) {
    try {
      await personsService.postSignup(req.body);
      res.redirect('/persons/login');
    } catch (error) {
      res.status(500).render('signup', {errorMessage: error});
    };
  };

  getLoginPage(req, res) {
    res.render('../views/login', {errorMessage: null});
  };

  async postLogin(req, res) {
    try {
      const person = await personsService.postLogin(req.body);
      req.session.isLoggedIn = true;
      req.session.user = person;
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
    const {states, fieldsOfInterest} = await personsService.getOnboardingPage();
    res.render('../views/onboarding', {errorMessage: null, states: states, fieldsOfInterest: fieldsOfInterest});
  };

  async postOnboarding(req, res) {
    const person = await personsService.postOnboarding(req.body);
    res.render('home', {errorMessage: null, person: person});
  };

  postLogout(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  };
};

module.exports = new PersonsController();