const personsService = require('./PersonsService');

class PersonsController {
  getSignupPage(req, res) {
    res.render('../views/signup', {errorMessage: null});
  }

  async postSignup(req, res) {
    try {
      await personsService.postSignup(req.body);
      res.redirect('/persons/login', {errorMessage: null});
    } catch (error) {
      res.status(500).render('signup', {errorMessage: error});
    }
  }

  getLoginPage(req, res) {
    res.render('../views/login', {errorMessage: null});
  };

  async postLogin(req, res) {
    try {
      const person = await personsService.postLogin(req.body);
      req.session.isLoggedIn = true;
      req.session.user = person;
      res.render('home', {errorMessage: null, person: person});
    } catch (error) {
      res.status(500).render('login', {errorMessage: error});
    }
  }

  postLogout(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  };
};

module.exports = new PersonsController();