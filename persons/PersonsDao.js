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

  async postOnboarding(email, firstname, lastname, dateofbirth, phone, city, state, zipcode, organization, fieldofinterest) {
    return await knex('persons')
      .where('email', email)
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
};

module.exports = new PersonsDao();