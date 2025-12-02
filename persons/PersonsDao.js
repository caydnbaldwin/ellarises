const knex = require('../database/database');

class PersonsDao {
  async postSignup(email, password) {
    return await knex('persons')
      .insert({
        email,
        password
      })
      .returning('*');
  }

  async postLogin(email) {
    return await knex
      .select('*')
      .from('persons')
      .where('email', email);
  };
}

module.exports = new PersonsDao();