const milestonesService = require('./MilestonesService');

class MilestonesController {
  async getMilestonesPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const milestones = await milestonesService.getMilestonesPage();
        res.render('milestones', {errorMessage: null, person: req.session.person, milestones: milestones});
      } else {
        res.render('login', { errorMessage: 'Please login to access this page.' });
      };
    } catch (error) {
      res.render('login', { errorMessage: error });
    };
  };

  getDashboardPage(req, res) {
    if (req.session.person.role === 'admin') {
      res.render('dashboard', { errorMessage: null });
    } else {
      res.render('login', { errorMessage: 'Please login to view this page' });
    };
  };
};

module.exports = new MilestonesController();