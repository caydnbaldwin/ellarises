const personsDao = require("./PersonsDao");

class PersonsService {
  async postSignup(formData) {
    try {
      const {email, password} = formData;
      return await personsDao.postSignup(email, password);
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

  async postOnboarding(formData) {
    try {
      console.log('PersonsService -> formData:', formData)
      const {email, firstName, lastName, dateOfBirth, phone, city, state, zipCode, organization, fieldOfInterest} = formData;
      return await personsDao.postOnboarding(email, firstName, lastName, dateOfBirth, phone, city, state, zipCode, organization, fieldOfInterest);
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new PersonsService();