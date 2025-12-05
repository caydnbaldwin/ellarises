const personsDao = require('../persons/PersonsDao');
const donationsDao = require('./DonationsDao');

class DonationsService {
  async postDonate(formData) {
    try{
      const {email, password, donationamount} = formData;
      const donationdate = new Date();
      let totaldonations = 0;

      let person = await personsDao.postLogin(email);
      if (person.length === 0) {
        person = await personsDao.postSignup(email, password);
      };

      const donation = await donationsDao.postDonate(person[0].personid, donationdate, donationamount);

      const donations = await donationsDao.getDonations(person[0].personid);
      totaldonations = donations.reduce((sum, d) => {
        const amt = parseFloat(d.donationamount);
        return sum + (Number.isNaN(amt) ? 0 : amt);
      }, 0);
      person = await personsDao.updateDonation(person[0].personid, totaldonations);
      return {person: person[0], donation: donation[0]};
    } catch (error) {
      throw error;
    };
  };

  async getDonationsPage() {
    return await donationsDao.getDonationsPage();
  }
};

module.exports = new DonationsService();