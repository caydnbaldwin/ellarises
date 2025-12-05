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
      res.render('signup', {errorMessage: error});
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
        res.render('index', {errorMessage: null, person: person});
      } else {
        res.redirect('/persons/onboarding');
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };

  async getOnboardingPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const {states, fieldsOfInterest} = await personsService.getOnboardingPage();
        res.render('onboarding', {errorMessage: null, states: states, fieldsOfInterest: fieldsOfInterest});
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };

  async postOnboarding(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const person = await personsService.postOnboarding(req.session.person.personid, req.body);
        req.session.person = person;
        res.render('index', {errorMessage: null, person: person});
      } else {
        res.render('login', {errorMessage: 'Please log in to perform this action.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };

  async getPersons(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const {persons, roles, states, fieldsofinterest} = await personsService.getPersons();
        res.render('persons', {errorMessage: null, persons: persons, roles: roles, states: states, fieldsofinterest: fieldsofinterest});
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.'});
      }
    } catch (error) {
      res.render('login', {errorMessage: error});
    }
  };
  
  async getPerson(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin' || req.session.person.personid === Number(req.params.personid)) {
          const {person, states, fieldsofinterest} = await personsService.getPerson(req.params.personid);
            res.render('person', {errorMessage: null, session: req.session, person: person, states: states, fieldsofinterest: fieldsofinterest});
        } else {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.render('login', {errorMessage: 'You cannot access this page.'});
        }
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error})
    };
  };
  
  async postPerson(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin' || req.session.person.email === req.body.email) {
          const {person, states, fieldsofinterest} = await personsService.postPerson(req.body);
          res.render('person', {errorMessage: null, person: person, states: states, fieldsofinterest: fieldsofinterest});
        } else {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.render('login', {errorMessage: 'You cannot perform this action.'})
        }
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };
  
  async deletePerson(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin' || req.session.person.personid === req.params.personid) {
          const person = await personsService.deletePerson(req.params.personid);
          res.status(204).json({person: person});
        } else {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.render('login', {errorMessage: 'You cannot perform this action.'})
        }
      } else {
        res.render('login', {errorMessage: 'Please log in to access this page.'});
      }
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };

  getLogout(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  };
};

module.exports = new PersonsController();