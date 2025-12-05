const surveysDao = require('./SurveysDao');

class SurveysService {
  async getSurveys() {
    return await surveysDao.getSurveys();
  };

  async getSurveysEmail(email) {
    return await surveysDao.getSurveysEmail(email);
  };

  async getSurveysEventname(eventname) {
    return await surveysDao.getSurveysEventname(eventname);
  };

  async getSurveysEventtype(eventtype) {
    return await surveysDao.getSurveysEventtype(eventtype);
  };

  async deleteSurvey(personid, eventstart, eventid) {
    const survey = await surveysDao.deleteSurvey(personid, eventstart, eventid);
    console.log('survey:', survey);
    return survey;
  }
};

module.exports = new SurveysService();