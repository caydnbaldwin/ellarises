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

  async getOnboardingPage() {
    const states = await knex
      .raw('SELECT unnest(enum_range(NULL::state_enum)) AS state');
    const fieldsOfInterest = await knex
      .raw('SELECT unnest(enum_range(NULL::field_of_interest_enum)) AS "fieldOfInterest"');
    return {states, fieldsOfInterest};
  };

  async postOnboarding(personid, firstname, lastname, dateofbirth, phone, city, state, zipcode, organization, fieldofinterest) {
    return await knex('persons')
      .where('personid', personid)
      .update({
        firstname, 
        lastname, 
        dateofbirth, 
        phone, 
        city, 
        state, 
        zipcode, 
        organization, 
        fieldofinterest
      })
      .returning('*');
  };

  async getPersons() {
    const persons = await knex
      .select('*')
      .from('persons');
    const roles = await knex
      .raw('SELECT unnest(enum_range(NULL::role_enum)) AS role');
    const states = await knex
      .raw('SELECT unnest(enum_range(NULL::state_enum)) AS state');
    const fieldsofinterest = await knex
      .raw('SELECT unnest(enum_range(NULL::field_of_interest_enum)) AS fieldofinterest');
    return {persons, roles, states, fieldsofinterest};
  };

  async getPerson(personid) {
    return await knex
      .select('*')
      .from('persons')
      .where('personid', personid);
  };

  async deletePerson(personid) {
    return await knex('persons')
      .where('personid', personid)
      .del()
      .returning('*');
  };
};

module.exports = new PersonsDao();