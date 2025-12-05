const personsDao = require("./PersonsDao");

class PersonsService {
  // [TODO] Hash passwords
  async postSignup(formData) {
    try {
      const {email, password} = formData;
      const person = await personsDao.postSignup(email, password);
      return person[0];
    } catch (error) {
      throw error;
    };
  };

  async postLogin(formData) {
    try {
      const {email, password} = formData;
      const person = await personsDao.postLogin(email);
      if (!person[0]) {
        throw new Error('Invalid email.');
      };
      if (password === person[0].password) {
        return person[0];
      } else {
        throw new Error('Invalid password.');
      };
    } catch (error) {
      throw error;
    };
  };

  async getOnboardingPage() {
    try {
      const {states, fieldsOfInterest} = await personsDao.getOnboardingPage();
      return {states: states.rows, fieldsOfInterest: fieldsOfInterest.rows};
    } catch (error) {
      throw error;
    };
  };

  async postOnboarding(personid, formData) {
    try {
      const {firstName, lastName, dateOfBirth, phone, city, state, zipCode, organization, fieldOfInterest} = formData;
      const person = await personsDao.postOnboarding(personid, firstName, lastName, dateOfBirth, phone, city, state, zipCode, organization, fieldOfInterest);
      return person[0];
    } catch (error) {
      throw error;
    };
  };

  async getPersons() {
    try {
      const {persons, roles, states, fieldsofinterest} = await personsDao.getPersons();
      return {persons, roles: roles.rows, states: states.rows, fieldsofinterest: fieldsofinterest.rows};
    } catch (error) {
      throw error;
    };
  };

  async getPerson(personid) {
    try {
      const {person, states, fieldsofinterest} = await personsDao.getPerson(personid);
      return {person: person[0], states: states.rows, fieldsofinterest: fieldsofinterest.rows};
    } catch (error) {
      throw error;
    };
  };

  async postPerson(formData) {
    try {
      const {email, password, firstname, lastname, dateofbirth, role, phone, city, state, zipcode, organization, fieldofinterest} = formData;
      const {person, states, fieldsofinterest} = await personsDao.postPerson(email, password, firstname, lastname, dateofbirth, role, phone, city, state, zipcode, organization, fieldofinterest);
      return {person: person[0], states: states.rows, fieldsofinterest: fieldsofinterest.rows};
    } catch (error) {
      throw error;
    };
  };

  async deletePerson(personid) {
    try {
      const person = await personsDao.deletePerson(personid);
      return person[0];
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new PersonsService();