const eventsService = require('./EventsService');

class EventsController {
  async getEventsPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const eventinstances = await eventsService.getEventsPage();
        res.render('events', {errorMessage: null, person: req.session.person, eventinstances: eventinstances})
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.'});
      };
    } catch (error) {
      res.render('login', {errorMessage: error});
    };
  };
};

module.exports = new EventsController();