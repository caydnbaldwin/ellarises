const knex = require('../database/database');

class PersonsDao {
  async postLogin(username) {
    return await knex
      .select('*')
      .from('persons')
      .where('username', username);
  };
}

module.exports = new PersonsDao();