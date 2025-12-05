const eventsDao = require('./EventsDao');

class EventsService {
  async getEventsPage() {
    return await eventsDao.getEventsPage();
  };
};

module.exports = new EventsService();