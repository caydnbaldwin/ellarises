const donationsService = require('./DonationsService');

class DonationsController {
  getDonatePage(req, res) {
    res.render('donate', {errorMessage: null});
  };
};

module.exports = new DonationsController();