const knex = require('../database/database');

class SurveysDao {
  async getSurveys() {
    return await knex('attendance as a')
      .join('persons as p', 'p.personid', 'a.personid')
      .join('eventinstances as ei', function() {
        this.on('a.eventid', '=', 'ei.eventid')
          .andOn('ei.eventstart', '=', 'a.eventstart');
      })
      .join('events as e', 'e.eventid', 'a.eventid')
      .where('a.registrationstatus', 'attended')
      .orderBy('eventend', 'desc')
      .select('*');
  };

  async getSurveysEmail(email) {
    return await knex('attendance as a')
      .join('persons as p', 'p.personid', 'a.personid')
      .join('eventinstances as ei', function() {
        this.on('a.eventid', '=', 'ei.eventid')
          .andOn('ei.eventstart', '=', 'a.eventstart');
      })
      .join('events as e', 'e.eventid', 'a.eventid')
      .where('a.registrationstatus', 'attended')
      .orderBy('eventend', 'desc')
      .select('*')
      .where('email', email);
  };

  async getSurveysEventname(eventname) {
    return await knex('attendance as a')
      .join('persons as p', 'p.personid', 'a.personid')
      .join('eventinstances as ei', function() {
        this.on('a.eventid', '=', 'ei.eventid')
          .andOn('ei.eventstart', '=', 'a.eventstart');
      })
      .join('events as e', 'e.eventid', 'a.eventid')
      .where('a.registrationstatus', 'attended')
      .orderBy('eventend', 'desc')
      .select('*')
      .where('eventname', eventname);
  };

  async getSurveysEventtype(eventtype) {
    return await knex('attendance as a')
      .join('persons as p', 'p.personid', 'a.personid')
      .join('eventinstances as ei', function() {
        this.on('a.eventid', '=', 'ei.eventid')
          .andOn('ei.eventstart', '=', 'a.eventstart');
      })
      .join('events as e', 'e.eventid', 'a.eventid')
      .where('a.registrationstatus', 'attended')
      .orderBy('eventend', 'desc')
      .select('*')
      .where('eventtype', eventtype);
  };

  async deleteSurvey(personid, eventstart, eventid) {
    return await knex('survey')
      .where('personid', personid)
      .andWhere('eventstart', eventstart)
      .andWhere('eventid', eventid)
      .del()
      .returning('*');
  };
};

module.exports = new SurveysDao();