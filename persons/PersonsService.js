const PersonsDao = require("./PersonsDao");

class PersonsService {
  async postLogin(formData) {
    try {
      const {username, password} = formData;
      const person = await PersonsDao.postLogin(username);
      if (!person[0]) {
        throw new Error('Invalid username.');
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