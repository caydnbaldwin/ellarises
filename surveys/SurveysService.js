const surveysDao = require('./SurveysDao');

class SurveysService {
  async getSurveys() {
    return await surveysDao.getSurveys();
  };

  async getSurveysEmail(email) {
    return await surveysDao.getSurveysEmail(email);
  }

  async getSurveysEventname(eventname) {
    return await surveysDao.getSurveysEventname(eventname);
  }

  async getSurveysEventtype(eventtype) {
    return await surveysDao.getSurveysEventtype(eventtype);
  }
};

module.exports = new SurveysService();