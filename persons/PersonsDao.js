const knex = require('../database/database');

class PersonsDao {
  async postLogin(username) {
    console.log('PersonsDao -> Knex')
    person = await knex
      .select('*')
      .from('persons')
      .where('username', username)
    console.log('Knex -> PersonsDao');
    return person;
  };
}

module.exports = new PersonsDao();