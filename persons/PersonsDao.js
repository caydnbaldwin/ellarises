const knex = require('../database/database');

class PersonsDao {
  async postSignup(email, password, role='participant') {
    return await knex('persons')
      .insert({
        email,
        password,
        role
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
    // Build update object only with values that are present
    const updateData = {};
    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;
    // Only update date if provided (non-empty) to avoid invalid date
    if (dateofbirth) updateData.dateofbirth = dateofbirth;
    if (phone) updateData.phone = phone;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (zipcode) updateData.zipcode = zipcode;
    if (organization) updateData.organization = organization;
    if (fieldofinterest) updateData.fieldofinterest = fieldofinterest;

    return await knex('persons')
      .where('personid', personid)
      .update(updateData)
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

  async postPerson(email, password, firstname, lastname, dateofbirth, role, phone, city, state, zipcode, organization, fieldofinterest) {
    // Insert only non-empty values; always include email
    const insertData = { email };
    if (password) insertData.password = password;
    if (firstname) insertData.firstname = firstname;
    if (lastname) insertData.lastname = lastname;
    // Only insert date if provided and non-empty
    if (dateofbirth) insertData.dateofbirth = dateofbirth;
    if (role) insertData.role = role;
    if (phone) insertData.phone = phone;
    if (city) insertData.city = city;
    if (state) insertData.state = state;
    if (zipcode) insertData.zipcode = zipcode;
    if (organization) insertData.organization = organization;
    if (fieldofinterest) insertData.fieldofinterest = fieldofinterest;

    // Build update set only for provided fields (excluding email)
    const updateData = {};
    for (const [key, value] of Object.entries(insertData)) {
      if (key === 'email') continue; // do not update unique key
      if (value) updateData[key] = value;
    }

    const person = await knex('persons')
      .insert(insertData)
      .onConflict('email')
      .merge(updateData)
      .returning('*');
    const roles = await knex
      .raw('SELECT unnest(enum_range(NULL::role_enum)) AS role');
    const states = await knex
      .raw('SELECT unnest(enum_range(NULL::state_enum)) AS state');
    const fieldsofinterest = await knex
      .raw('SELECT unnest(enum_range(NULL::field_of_interest_enum)) AS fieldofinterest');
    return {person, roles, states, fieldsofinterest};
  }

  async getPerson(personid) {
    const person = await knex
      .select('*')
      .from('persons')
      .where('personid', personid);
    const roles = await knex
    .raw('SELECT unnest(enum_range(NULL::role_enum)) AS role');
    const states = await knex
      .raw('SELECT unnest(enum_range(NULL::state_enum)) AS state');
    const fieldsofinterest = await knex
      .raw('SELECT unnest(enum_range(NULL::field_of_interest_enum)) AS fieldofinterest');
    return {person, roles, states, fieldsofinterest};
  };

  async deletePerson(personid) {
    return await knex('persons')
      .where('personid', personid)
      .del()
      .returning('*');
  };

  async updateDonation(personid, totaldonations) {
    const newTotal = Number(totaldonations);
    return await knex('persons')
      .where('personid', personid)
      .update({ totaldonations: Number.isNaN(newTotal) ? 0 : newTotal })
      .returning('*');
  };
};

module.exports = new PersonsDao();