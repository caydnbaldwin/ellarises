const eventsService = require('./EventsService');

class EventsController {
  async getEventsPage(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const eventinstances = await eventsService.getEventsPage();
        res.render('events', {errorMessage: null, session: req.session, eventinstances: eventinstances})
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      };
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };
};

module.exports = new EventsController();