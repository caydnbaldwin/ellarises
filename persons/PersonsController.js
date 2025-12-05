const personsService = require('./PersonsService');

class PersonsController {
  getSignupPage(req, res) {
    res.render('signup', {errorMessage: null, session: null});
  };

  async postSignup(req, res) {
    try {
      const person = await personsService.postSignup(req.body);
      req.session.isLoggedIn = true;
      req.session.person = person;
      res.redirect('/persons/onboarding');
    } catch (error) {
      res.render('signup', {errorMessage: error, session: null});
    };
  };

  getLoginPage(req, res) {
    res.render('login', {errorMessage: null, session: null});
  };

  async postLogin(req, res) {
    try {
      const person = await personsService.postLogin(req.body);
      req.session.isLoggedIn = true;
      req.session.person = person;
      if (person.firstname) {
        res.render('index', {errorMessage: null, session: req.session});
      } else {
        res.redirect('/persons/onboarding');
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  async getOnboardingPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const {states, fieldsOfInterest} = await personsService.getOnboardingPage();
        res.render('onboarding', {errorMessage: null, session: req.session, states: states, fieldsOfInterest: fieldsOfInterest});
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  async postOnboarding(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const person = await personsService.postOnboarding(req.session.person.personid, req.body);
        req.session.person = person;
        res.render('index', {errorMessage: null, session: req.session});
      } else {
        res.render('login', {errorMessage: 'Please log in to perform this action.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  async getPersons(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const {persons, roles, states, fieldsofinterest} = await personsService.getPersons();
        res.render('persons', {errorMessage: null, session: req.session, persons: persons, roles: roles, states: states, fieldsofinterest: fieldsofinterest});
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.', session: null});
      }
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    }
  };
  
  async getPerson(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin' || req.session.person.personid === Number(req.params.personid)) {
          const {person, roles, states, fieldsofinterest} = await personsService.getPerson(req.params.personid);
            res.render('person', {errorMessage: null, session: req.session, person: person, roles: roles, states: states, fieldsofinterest: fieldsofinterest});
        } else {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.render('login', {errorMessage: 'You cannot access this page.', session: null});
        }
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null})
    };
  };
  
  async postPerson(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin' || req.session.person.email === req.body.email) {
          const {person, roles, states, fieldsofinterest} = await personsService.postPerson(req.body);
          res.redirect('/persons/persons');
        } else {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.render('login', {errorMessage: 'You cannot perform this action.', session: null})
        }
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };
  
  async deletePerson(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin' || req.session.person.personid === req.params.personid) {
          const person = await personsService.deletePerson(req.params.personid);
          res.redirect('/persons/persons');
        } else {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.render('login', {errorMessage: 'You cannot perform this action.', session: null})
        }
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.', session: null});
      }
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  getLogout(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  };
};

module.exports = new PersonsController();