const PersonsDao = require("./PersonsDao");

class PersonsService {
  async postSignup(formData) {
    try {
      const {email, password} = formData;
      return await PersonsDao.postSignup(email, password);
    } catch (error) {
      throw error;
    }
  };

  async postLogin(formData) {
    try {
      const {email, password} = formData;
      const person = await PersonsDao.postLogin(email);
      if (!person[0]) {
        throw new Error('Invalid email.');
      }
      if (password === person[0].password) {
        return person[0];
      } else {
        throw new Error('Invalid password.');
      }
    } catch (error) {
      throw error;
    }
  };
};

module.exports = new PersonsService();