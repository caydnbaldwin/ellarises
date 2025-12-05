const knex = require('../database/database');

class DonationsDao {
  async getDonations(personid) {
    return await knex
      .select('*')
      .from('donations')
      .where('personid', personid);
  };

  async postDonate(personid, donationdate, donationamount) {
    const maxDonationNumber = await knex('donations')
      .where({ personid })
      .max({ maxDonationNumber: 'donationnumber' })
      .first();

    const nextDonationNumber = ((maxDonationNumber?.maxDonationNumber) ?? 0) + 1;

    return knex('donations')
      .insert({
        personid,
        donationnumber: nextDonationNumber,
        donationdate,
        donationamount
      })
      .returning('*');
  };

  async getDonationsPage() {
    return await knex
      .select('*')
      .from('donations');
  };
};

module.exports = new DonationsDao();