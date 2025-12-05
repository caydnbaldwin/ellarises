const milestonesService = require('./MilestonesService');

class MilestonesController {
  async getMilestonesPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const milestones = await milestonesService.getMilestonesPage();
        res.render('milestones', {errorMessage: null, session: req.session, person: req.session.person, milestones: milestones});
      } else {
        res.render('login', { errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', { errorMessage: error, session: null});
    };
  };
};

module.exports = new MilestonesController();