const donationsService = require('./DonationsService');

class DonationsController {
  getDonatePage(req, res) {
    res.render('donate', {errorMessage: null, person: null, donation: null});
  };

  async postDonate(req, res) {
    try {
      const {person, donation} = await donationsService.postDonate(req.body);
      res.redirect('/');
    } catch (error) {
      res.status(500).render('donate', {
        errorMessage: 'We could not process your donation right now. Please try again later.',
        person: null,
        donation: null
      });
    };
  };

  async getDonationsPage(req, res) {
    const donations = await donationsService.getDonationsPage();
    res.render('donations', {errorMessage: null, donations: donations});
  };
};

module.exports = new DonationsController();