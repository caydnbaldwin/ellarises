const knex = require('../database/database');

class EventsDao {
  async getEventsPage() {
    return await knex
      .select('*')
      .from('eventinstances')
      .innerJoin('events', 'events.eventid', 'eventinstances.eventid');
  }
};

module.exports = new EventsDao();