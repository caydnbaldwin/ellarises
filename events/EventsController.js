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

  async postEvent(req, res) {
    try {
      if (req.session.isLoggedIn) {
        if (req.session.person.role === 'admin') {
          const eventinstance = await eventsService.postEvent(req.body);
          res.redirect('/events/events');
        } else {
          req.session.destroy();
          res.render('login', {errorMessage: 'You cannot perform this action.', session: null});
        };
      } else {
        res.render('login', {errorMessage: 'Please login to access this page.', session: null});
      }; 
    } catch (error) {
      res.render('login', {errorMessage: error, session: null});
    };
  };
};

module.exports = new EventsController();