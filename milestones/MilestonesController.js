const milestonesServices = require('./MilestonesService');

class MilestonesController {
    getDashboardPage(req, res) {
        if (req.session.person.role === 'admin') {
            res.render('dashboard', {errorMessage: null});
        } else {
            res.render('login', {errorMessage: 'Please login to view this page'});
        };
    };
};

module.exports = new MilestonesController();