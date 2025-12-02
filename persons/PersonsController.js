const personsService = require('./PersonsService');

class PersonsController {
  getLoginPage(req, res) {
    res.render('../views/login', {errorMessage: null});
  };

  async postLogin(req, res) {
    try {
      console.log('PersonsController -> PersonsService');
      const person = await personsService.postLogin(req.body);
      console.log('Person:', person);   
      req.session.isLoggedIn = true;
      req.session.user = person;
      res.reder('views', {errorMessage: person});
    } catch (err) {
      
    }
  }
};

module.exports = new PersonsController();