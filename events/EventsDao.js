const knex = require('../database/database');

class EventsDao {
  async getEventsPage() {
    return await knex
      .select('*')
      .from('eventinstances')
      .innerJoin('events', 'events.eventid', 'eventinstances.eventid');
  };

  async postEvent(eventname, eventstart, eventend, eventlocation, eventregistrationdeadline) {
    const event = await knex
      .select('*')
      .from('events')
      .where('eventname', eventname);
    
    if (event > 0) {
      return await knex('eventinstances')
        .insert({
          eventid: event[0].eventid,
          eventstart, 
          eventend, 
          eventlocation, 
          eventregistrationdeadline
        })
        .returning('*');
    }
  }
};

module.exports = new EventsDao();