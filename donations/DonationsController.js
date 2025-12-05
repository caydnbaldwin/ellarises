const donationsService = require('./DonationsService');

class DonationsController {
  getDonatePage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        res.render('donate', {errorMessage: null, session: req.session, donation: null});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };

  async postDonate(req, res) {
    try {
      const {person, donation} = await donationsService.postDonate(req.body);
      req.session.isLoggedIn = true;
      req.session.person = person;
      res.redirect('/donations/donations')
    } catch (error) {
      res.status(500).render('donate', {
        errorMessage: 'We could not process your donation right now. Please try again later.',
        person: null,
        donation: null
      });
    };
  };

  async getDonationsPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const donations = await donationsService.getDonationsPage();
        res.render('donations', {errorMessage: null, session: req.session, donations: donations});
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };
};

module.exports = new DonationsController();