const donationsService = require('./DonationsService');

class DonationsController {
  getDonatePage(req, res) {
    res.render('donate', {errorMessage: null, person: null, donation: null});
  };

  async postDonate(req, res) {
    const {person, donation} = await donationsService.postDonate(req.body);
    res.render('donate', {errorMessage: null, person: person, donation: donation});
  }
};

module.exports = new DonationsController();