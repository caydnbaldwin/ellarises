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
  }
};

module.exports = new SurveysDao();