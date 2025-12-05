const knex = require('../database/database');

class MilestonesDao {
  async getMilestonesPage() {
    return await knex
      .select('*')
      .from('milestones')
      .innerJoin('persons', 'persons.personid', 'milestones.personid');
  }
};

module.exports = new MilestonesDao();