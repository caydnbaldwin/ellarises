const eventsDao = require('./EventsDao');

class EventsService {
  async getEventsPage() {
    return await eventsDao.getEventsPage();
  };

  async postEvent(formData) {
    const {eventname, eventstart, eventend, eventlocation, eventregistrationdeadline} = formData;
    const eventinstance = await eventsDao.postEvent(eventname, eventstart, eventend, eventlocation, eventregistrationdeadline);
    return eventinstance[0];
  };
};

module.exports = new EventsService();