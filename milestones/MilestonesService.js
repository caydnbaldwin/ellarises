const milestonesDao = require('./MilestonesDao')

class MilestonesService {
  async getMilestonesPage() {
    return await milestonesDao.getMilestonesPage();
  }
};

module.exports = new MilestonesService();