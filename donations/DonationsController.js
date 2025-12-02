const donationsService = require('./DonationsService');

class DonationsController {
  getDonatePage(req, res) {
    res.redirect('https://givebutter.com/EllaRises');
  };
};

module.exports = new DonationsController();