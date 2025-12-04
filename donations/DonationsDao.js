const knex = require('../database/database');

class DonationsDao {
  async postDonate(personid, donationdate, donationamount) {
    return await knex('donations')
      .insert({
        personid,
        donationdate,
        donationamount
      })
      .returning('*');
  };
};

module.exports = new DonationsDao();