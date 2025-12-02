const PersonsDao = require("./PersonsDao");

class PersonsService {
  async postLogin(formData) {
    const {username, password} = formData;
    console.log('PersonsService -> PersonsDao');
    const person = await PersonsDao.postLogin(username);
    console.log('THE EAGLE HAS LANDED')
    if (password == person.password) {
      return person[0];
    }
  };
};

module.exports = new PersonsService();