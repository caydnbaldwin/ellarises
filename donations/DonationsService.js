const personsDao = require('../persons/PersonsDao');
const donationsDao = require('./DonationsDao');

class DonationsService {
  async postDonate(formData) {
    try{
      const {email, password, donationamount} = formData;
      const donationdate = new Date();
      const person = await personsDao.postSignup(email, password);
      const donation = await donationsDao.postDonate(person[0].personid, donationdate, donationamount);
      return {person: person[0], donation: donation[0]};
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new DonationsService();